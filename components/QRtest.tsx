// import React, { useState, useRef } from "react";
// import {
//   StyleSheet,
//   View,
//   TouchableOpacity,
//   Button,
//   Pressable,
//   Image,
// } from "react-native";
// import { Camera as CameraView, CameraType, useCameraPermissions, Camera, CameraProps } from "expo-camera";
// import { Ionicons } from "@expo/vector-icons";
// import RCOverlay from "./RCOverlay";
// import { useRouter } from "expo-router";

// export default function CameraComponent() {
//   const router = useRouter();
//   const [facing] = useState<CameraType>('back');
//   const [permission, requestPermission] = useCameraPermissions();
//   const [scanned, setScanned] = useState(false);
//   const [torch, setTorch] = useState(false);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const cameraRef = useRef<React.RefObject<CameraProps> | null>(null);

//   if (!permission) {
//     return <View />;
//   }

//   if (!permission.granted) {
//     return (
//       <View style={styles.container}>
//         <Button onPress={requestPermission} title="Grant camera permission" />
//       </View>
//     );
//   }

//   const handleCapture = async () => {
//     if (cameraRef.current) {
//       try {
//         const photo = await cameraRef.current.takePictureAsync({
//           quality: 1,
//           base64: true,
//           exif: true,
//         });
        
//         setCapturedImage(photo.uri);
//         setScanned(true);
        
//         // Save the image data to pass to the next screen
//         router.push({
//           pathname: "/(input)/edit-receipt",
//           params: { 
//             imageUri: photo.uri,
//             base64Data: photo.base64
//           }
//         });
        
//       } catch (error) {
//         console.error("Failed to take picture:", error);
//         alert("Failed to capture receipt. Please try again.");
//       }
//     }
//   };

//   const toggleTorch = () => {
//     setTorch((current) => !current);
//   };

//   return (
//     <View style={styles.container}>
//       <CameraView 
//         ref={cameraRef}
//         style={styles.camera} 
//         type={facing}
//         flashMode={torch ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
//       >
//         <RCOverlay isTorchOn={torch} />
//         <Pressable style={styles.torchButton} onPress={toggleTorch}>
//           <Ionicons
//             name={torch ? "flash" : "flash-off"}
//             size={30}
//             color="white"
//           />
//         </Pressable>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.captureButton}
//             onPress={handleCapture}
//           >
//             <Ionicons name="scan-outline" size={30} color="black" />
//           </TouchableOpacity>
//         </View>
//       </CameraView>
//       {capturedImage && (
//         <View style={styles.preview}>
//           <Image 
//             source={{ uri: capturedImage }} 
//             style={styles.previewImage} 
//           />
//         </View>
//       )}
//       {scanned && (
//         <Button
//           title={"Scan Another Receipt"}
//           onPress={() => {
//             setScanned(false);
//             setCapturedImage(null);
//           }}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   camera: {
//     flex: 1,
//   },
//   buttonContainer: {
//     position: "absolute",
//     bottom: 30,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   captureButton: {
//     height: 75,
//     width: 75,
//     backgroundColor: "white",
//     borderRadius: 75 / 2,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 2,
//     borderColor: "black",
//   },
//   torchButton: {
//     position: "absolute",
//     top: 100,
//     alignSelf: "center",
//     height: 50,
//     width: 50,
//     backgroundColor: "rgba(0, 0, 0, 0.6)",
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   preview: {
//     position: 'absolute',
//     bottom: 120,
//     right: 20,
//     width: 100,
//     height: 150,
//     borderRadius: 8,
//     overflow: 'hidden',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   previewImage: {
//     width: '100%',
//     height: '100%',
//   },
// });

