import React from "react";
import { ScrollView, StyleSheet, View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MetricCard from "@/components/MetricCard";
import ProfitLossCard from "@/components/ProfitLossCard";
import { getUser } from "@/helper/Session";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { removeSession, getSession } from "@/helper/Session";
import { ActivityIndicator } from "react-native";
import SummaryCards from "@/components/SummaryCards";
import { RefreshControl } from "react-native";

export default function home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    const request = async () => {
      try {
        setIsLoading(true);
        const user = await getUser();
        console.log(await getSession());
      } catch (error) {
        await removeSession();
        router.replace("/qrscan");
        console.log(error);
      }
    };
    request();
    setIsLoading(false);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.content}>
              <SummaryCards />

              <ProfitLossCard
                netIncome="-₱35,974,476"
                changePercentage="↓ 18.27%"
                income="₱20,618,268"
                expenses="₱56,592,744"
                date="November 2024"
              />
            </View>

            <Button
              title="Log Out"
              onPress={async () => {
                await removeSession();
                router.replace("/qrscan");
              }}
            />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});
