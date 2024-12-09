import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "./Text";
import { PieChart } from "react-native-chart-kit";
import { Image } from "react-native";

interface MetricCardProps {
  title: string;
  amount: string;
  change: number;
}

export default function MetricCard({ title, amount, change }: MetricCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.contentRow}>
        <View style={styles.textContainer}>
          <Text style={styles.amount}>{amount}</Text>
          <Text
            style={[
              styles.change,
              change >= 0 ? styles.greenText : styles.redText,
            ]}
          >
            {change >= 0 ? "⬈ " : "⬊ "}
            {change}% from last month
          </Text>
        </View>
        <View style={styles.imgContainer}>
          <Image
            source={require("../assets/images/sales.png")}
            accessibilityLabel="Sales Image"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderTopWidth: 10,
    borderTopColor: "green",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  contentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  imgContainer: {
    width: 50,
    height: 50,
    marginRight: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    color: "#64748b",
  },
  amount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },
  change: {
    fontSize: 12,
  },
  redText: {
    color: "#ef4444",
    fontSize: 16,
  },
  greenText: {
    color: "#22c55e",
    fontSize: 16,
  },
});
