import { CameraView, BarcodeScanningResult, Camera } from "expo-camera";
import { Stack } from "expo-router";
import { useState, useEffect, useRef } from "react";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from "react-native";
import Overlay from "./Overlay";
import { saveSessionFromQr, getUser } from "@/helper/Session";
import { useRouter } from "expo-router";

export default function QRScan() {
  const router = useRouter();
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
        setScanned(false);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
    const { data } = result;
    if (data && !qrLock.current) {
      qrLock.current = true;
      setScanned(true);
      if (data) {
        await saveSessionFromQr(data);
        const user = await getUser();
        if (user) {
          router.replace("/home");
        }
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "QR Scanner",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={
          scanned ? undefined : (result) => handleBarCodeScanned(result)
        }
      />
      <Overlay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scanAgainContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  scanAgainText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
});
