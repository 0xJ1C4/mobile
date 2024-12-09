import React from "react";
import { View } from "react-native";
import Svg, { G, Path } from "react-native-svg";

interface PieChartProps {
  data: number[];
  colors: string[];
  size: number;
}

export const PieChart: React.FC<PieChartProps> = ({ data, colors, size }) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  let startAngle = 0;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G transform={`translate(${size / 2}, ${size / 2})`}>
          {data.map((value, index) => {
            const angle = (value / total) * 360;
            const largeArcFlag = angle > 180 ? 1 : 0;
            const endAngle = startAngle + angle;
            const x1 = Math.cos((startAngle * Math.PI) / 180) * (size / 2);
            const y1 = Math.sin((startAngle * Math.PI) / 180) * (size / 2);
            const x2 = Math.cos((endAngle * Math.PI) / 180) * (size / 2);
            const y2 = Math.sin((endAngle * Math.PI) / 180) * (size / 2);

            const d = `M 0 0 L ${x1} ${y1} A ${size / 2} ${
              size / 2
            } 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

            startAngle += angle;

            return <Path key={index} d={d} fill={colors[index]} />;
          })}
        </G>
      </Svg>
    </View>
  );
};
