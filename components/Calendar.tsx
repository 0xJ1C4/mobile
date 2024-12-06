// import React, { useState } from "react";
// import { View, Text, Button, Modal, TextInput, StyleSheet } from "react-native";
// import { Calendar } from "react-native-calendars";

// export default function Calendar() {
//   const [selectedDate, setSelectedDate] = useState<string>("");
//   const [schedules, setSchedules] = useState<{
//     [key: string]: { marked: boolean; dotColor: string; note: string };
//   }>({});
//   const [modalVisible, setModalVisible] = useState(false);
//   const [scheduleText, setScheduleText] = useState("");

//   const addSchedule = () => {
//     if (selectedDate && scheduleText) {
//       setSchedules({
//         ...schedules,
//         [selectedDate]: {
//           marked: true,
//           dotColor: "blue",
//           note: scheduleText,
//         },
//       });
//       setScheduleText("");
//       setModalVisible(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Calendar
//         onDayPress={(day: { dateString: React.SetStateAction<string> }) =>
//           setSelectedDate(day.dateString)
//         } // Corrected here
//         markedDates={Object.keys(schedules).reduce((acc, date) => {
//           acc[date] = schedules[date];
//           return acc;
//         }, {} as any)}
//       />

//       {selectedDate && schedules[selectedDate] && (
//         <Text style={styles.note}>
//           {`Schedule on ${selectedDate}: ${schedules[selectedDate].note}`}
//         </Text>
//       )}

//       <Button title="Add Schedule" onPress={() => setModalVisible(true)} />

//       <Modal visible={modalVisible} transparent animationType="slide">
//         <View style={styles.modal}>
//           <Text style={styles.modalTitle}>Add Schedule for {selectedDate}</Text>
//           <TextInput
//             placeholder="Enter schedule details"
//             style={styles.input}
//             value={scheduleText}
//             onChangeText={setScheduleText}
//           />
//           <Button title="Save" onPress={addSchedule} />
//           <Button title="Cancel" onPress={() => setModalVisible(false)} />
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#fff",
//   },
//   note: {
//     marginTop: 20,
//     fontSize: 16,
//     color: "#333",
//   },
//   modal: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalTitle: {
//     fontSize: 18,
//     marginBottom: 10,
//     color: "#fff",
//   },
//   input: {
//     backgroundColor: "#fff",
//     width: "80%",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
// });