import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CameraView, CameraType } from "expo-camera";
import { useEffect } from "react";
import { Camera } from "expo-camera";
import { getReceiptContent } from "@/helper/receipt";
import LoadingIndicator from "./ui/loadingIndicator";
import { useRouter } from "expo-router";
import { useReceipt } from "@/provider/Provider";
import { ReceiptData } from "@/constants/types";

export default function CameraScreen() {
  const [type, setType] = useState("");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [photo, setPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setReceiptData } = useReceipt();
  const router = useRouter();

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getPermission();
  });

  if (!hasPermission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!hasPermission) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={() => console.log("hello")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraType() {
    setType((current: string) => (current === "back" ? "front" : "back"));
  }
  let options = {
    quality: 0.5,
    base64: true,
    exif: false,
  };
  async function takePicture() {
    if (cameraRef.current) {
      try {
        setIsLoading(true);
        const currentPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(currentPhoto?.base64 || "");

        const content = await getReceiptContent(currentPhoto?.base64 || "");
        setIsLoading(false);
        if (content) {
          const transformedData = {
            ...content?.message,
            items: content?.message.items.map((item: any) => ({
              ...item,
              unit_price: item.unit_price.toString(),
              amount: item.amount.toString(),
            })),
            total: content?.message?.total.toString(),
            image: currentPhoto?.base64,
          };
          setReceiptData(transformedData);
          router.push("/(input)/edit-receipt");
        }
      } catch (error) {
        console.error("Error taking picture:", error);
        setIsLoading(false);
      }
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "black",
  },
  text: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 20,
  },
});
