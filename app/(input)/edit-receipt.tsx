import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";
import { useRouter } from "expo-router";

export default function EditReceipt() {
  const router = useRouter();
  const [receiptData, setReceiptData] = useState({
    receipt_number: "0056",
    date: new Date("2024-03-25"),
    delivered_by: "",
    delivered_to: "CORNER CUISINE",
    address: "",
    receipt_type: "",
    items: [
      { description: "BAGOONG", unit_price: "124.15", amount: "1489.8" },
      { description: "PALAPA", unit_price: "131.95", amount: "1583.4" },
      { description: "PALAPA", unit_price: "73.5", amount: "1102.5" },
      { description: "CHILI GARLIC", unit_price: "144.03", amount: "1728.36" },
      { description: "CHILI GARLIC", unit_price: "79.66", amount: "1194" },
    ],
    total: "7098.06",
  });

  const [selected, setSelected] = React.useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const data = [
    { key: "1", value: "Sales" },
    { key: "2", value: "Expense" },
  ];

  const handleInputChange = (field: string, value: string | Date) => {
    setReceiptData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const renderInputField = (label: string, field: string, value: string) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => handleInputChange(field, text)}
      />
    </View>
  );

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange("date", selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Edit Receipt</Text>

          <View style={styles.formGrid}>
            {renderInputField(
              "Receipt Number",
              "receiptNumber",
              receiptData.receipt_number
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}
              >
                <Text>{receiptData.date.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={receiptData.date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>

            {renderInputField(
              "Delivered By",
              "deliveredBy",
              receiptData.delivered_by
            )}
            {renderInputField(
              "Delivered To",
              "deliveredTo",
              receiptData.delivered_to
            )}
            {renderInputField("Address", "address", receiptData.address)}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Receipt Type</Text>
              <View style={styles.pickerContainer}>
                <SelectList
                  setSelected={(val: React.SetStateAction<never[]>) =>
                    setSelected(val)
                  }
                  data={data}
                  save="value"
                />
              </View>
            </View>
          </View>

          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.descriptionCol]}>
              Description
            </Text>
            <Text style={[styles.headerText, styles.priceCol]}>Unit Price</Text>
            <Text style={[styles.headerText, styles.amountCol]}>Amount</Text>
          </View>

          {receiptData.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <TextInput
                style={[styles.tableInput, styles.descriptionCol]}
                value={item.description}
                onChangeText={(text) => {
                  const newItems = [...receiptData.items];
                  newItems[index].description = text;
                  setReceiptData((prevData) => ({
                    ...prevData,
                    items: newItems,
                  }));
                }}
              />
              <TextInput
                style={[styles.tableInput, styles.priceCol]}
                value={item.unit_price}
                keyboardType="numeric"
                onChangeText={(text) => {
                  const newItems = [...receiptData.items];
                  newItems[index].unit_price = text;
                  setReceiptData((prevData) => ({
                    ...prevData,
                    items: newItems,
                  }));
                }}
              />
              <TextInput
                style={[styles.tableInput, styles.amountCol]}
                value={item.amount}
                keyboardType="numeric"
                onChangeText={(text) => {
                  const newItems = [...receiptData.items];
                  newItems[index].amount = text;
                  setReceiptData((prevData) => ({
                    ...prevData,
                    items: newItems,
                  }));
                }}
              />
            </View>
          ))}

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <TextInput
              style={styles.totalInput}
              value={receiptData.total}
              editable={false}
            />
          </View>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              router.dismissAll();
            }}
          >
            <Text style={styles.cancelButtonText}>Cancel or Re-scan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  formGrid: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 40,
    width: "100%",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  tableInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
  },
  descriptionCol: {
    flex: 2,
    marginRight: 8,
  },
  priceCol: {
    flex: 1,
    marginRight: 8,
  },
  amountCol: {
    flex: 1,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 12,
  },
  totalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    width: 120,
    textAlign: "right",
  },
  saveButton: {
    backgroundColor: "#ef4444",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
  },
});
