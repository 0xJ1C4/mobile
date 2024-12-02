import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { TrendingUp, TrendingDown } from 'lucide-react-native';

interface MetricCardProps {
  title: string;
  amount: string;
  change: number;
}

export default function MetricCard({ 
  title, 
  amount, 
  change,
}: MetricCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={[
        styles.amount
      ]}>
        {amount}
      </Text>
      <Text style={[
        styles.change,
        change >= 0 ? styles.greenText : styles.redText
      ]}>
        {change >= 0 ? "↑ " : "↓ "}
        {change}% from last month
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: '#64748b',
  },
  amount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  change: {
    fontSize: 12,
  },
  negative: {
    color: '#ef4444',
  },
  redText: {
    color: '#ef4444',
  },
  greenText: {
    color: '#22c55e',
  },
});

