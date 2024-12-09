import { useState, useEffect } from "react";

import { View, Text, StyleSheet } from "react-native";
import { expense, sales, total } from "@/constants/types";
import { getStatement } from "@/helper/statements";
import MetricCardSkeleton from "./skeleton/MetricCardSkeleton";
import { getSession } from "@/helper/Session";
import { Image } from "expo-image";
import MetricCard from "./MetricCard";
import MetricCard2 from "./MetricCard2";
import MetricCard3 from "./MetricCard3";

export default function SummaryCards() {
  const [sales, setSales] = useState<sales>();
  const [expense, setExpense] = useState<expense>();
  const [total, setTotal] = useState<total>();
  const [isLoading, setIsLoading] = useState(false);
  const pieData = [
    {
      name: "Seoul",
      population: 21500000,
      color: "#22c55e",
      legendFontColor: "#7F7F7F",
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#64748b",
      legendFontColor: "#7F7F7F",
    },
  ];

  useEffect(() => {
    const data = async () => {
      try {
        const session = await getSession();
        console.log(session);
        setIsLoading(true);
        const statement = await getStatement();
        setSales(statement.sales);
        setExpense(statement.expense);
        setTotal(statement.total);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, []);

  return (
    <View>
      {isLoading ? (
        <>
          <MetricCardSkeleton />
          <MetricCardSkeleton />
          <MetricCardSkeleton />
        </>
      ) : (
        <>
          <View>
            <MetricCard
              title="Monthly Sales"
              amount={`₱${sales?.currenMonthSales.toLocaleString()}`}
              change={Number(sales?.trends) || 0}
              pieData={pieData}
            />
          </View>

          <View>
            <MetricCard2
              title="Monthly Expenses"
              amount={`₱${expense?.currenMonthExpense.toLocaleString()}`}
              change={Number(expense?.trends) || 0}
            />
          </View>

          <View>
            <MetricCard3
              title="Monthly Income"
              amount={`₱${total?.total.toLocaleString()}`}
              change={Number(total?.trends) || 0}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  salesIMG: {
    height: 100,
    width: 100,
  },
});
