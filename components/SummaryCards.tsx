import { useState, useEffect } from "react";
import MetricCard from "./MetricCard";
import { View, Text } from "react-native";
import { expense, sales, total } from "@/constants/types";
import { getStatement } from "@/helper/statements";
import MetricCardSkeleton from "./skeleton/MetricCardSkeleton";

export default function SummaryCards() {
  const [sales, setSales] = useState<sales>();
  const [expense, setExpense] = useState<expense>();
  const [total, setTotal] = useState<total>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = async () => {
      try {
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
          <MetricCard
            title="Monthly Sales"
            amount={`₱${sales?.currenMonthSales.toLocaleString()}`}
            change={Number(sales?.trends) || 0}
          />
          <MetricCard
            title="Monthly Sales"
            amount={`₱${expense?.currenMonthExpense.toLocaleString()}`}
            change={Number(expense?.trends) || 0}
          />
          <MetricCard
            title="Monthly Sales"
            amount={`₱${total?.total.toLocaleString()}`}
            change={Number(total?.trends) || 0}
          />
        </>
      )}
    </View>
  );
}
