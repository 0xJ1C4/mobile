import { Text, View, StyleSheet } from "react-native";
import Camera from "@/components/Camera";
import CameraScreen from "@/components/CameraScreen";

export default function rscanner() {
  return (
    <View style={styles.container}>
      <CameraScreen />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
});
