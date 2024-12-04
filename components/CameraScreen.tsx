import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CameraView, CameraType } from "expo-camera";
import { useEffect } from "react";
import { Camera } from "expo-camera";

export default function CameraScreen() {
  const [type, setType] = useState("");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [photo, setPhoto] = useState("");

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

  async function takePicture() {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync(options);
        setPhoto(photo?.base64 || "");
        console.log("Photo taken:", photo?.base64);
        // Here you can handle the captured photo, e.g., save it or send it to a server
      } catch (error) {
        console.error("Error taking picture:", error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.buttonText}>Flip Camera</Text>
          </TouchableOpacity>
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
