import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import RCOverlay from "./RCOverlay";
import { useRouter } from "expo-router";

export default function Camera() {
  const router = useRouter();
  const [facing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Button onPress={requestPermission} title="Grant camera permission" />
      </View>
    );
  }

  const handleCapture = () => {
    setScanned(true);
    router.push("/(input)/edit-receipt");
    alert("Receipt captured!");
  };

  const toggleTorch = () => {
    setTorch((current) => !current);
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} enableTorch={torch}>
        <RCOverlay isTorchOn={torch} />
        <Pressable style={styles.torchButton} onPress={toggleTorch}>
          <Ionicons
            name={torch ? "flash" : "flash-off"}
            size={30}
            color="white"
          />
        </Pressable>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleCapture}
          >
            <Ionicons name="scan-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </CameraView>
      {scanned && (
        <Button
          title={"Scan Another Receipt"}
          onPress={() => setScanned(false)}
        />
      )}
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
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    height: 75,
    width: 75,
    backgroundColor: "white",
    borderRadius: 75 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  torchButton: {
    position: "absolute",
    top: 100,
    alignSelf: "center",
    height: 50,
    width: 50,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
