// app/(tabs)/now.tsx
import React from 'react';
import { useColorScheme } from 'nativewind';
import { ScrollView, View, Text, useWindowDimensions } from 'react-native';

// 复用之前的样式配置
const GRID_ITEM_SIZE = 24; // 更小的尺寸以适应更多格子
const COLUMNS = 10; // 每行10个格子

export default function NowScreen() {
  const { colorScheme } = useColorScheme();
  const { width: screenWidth } = useWindowDimensions();
  
  // 获取当前时间的秒数（0-59）
  const [currentSecond, setCurrentSecond] = React.useState(
    new Date().getSeconds()
  );

  const [currentTime, setCurrentTime] = React.useState(new Date());

  // 动态更新时间（每秒）
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 格式化时间显示
  const formatHrs = (date: Date) => {
    let hrs = parseInt(date.getHours().toString());
    if (hrs > 12) hrs -= 12;

    return hrs+":"+date.getMinutes().toString();
  };





  // 计算间距
  const gap = (screenWidth - 16 * 2 - GRID_ITEM_SIZE * COLUMNS) / (COLUMNS - 1);

  const getGridItemColor = (second: number) => {
    const isCurrent = second === currentSecond;
    const isPast = second < currentSecond;

    if (isCurrent) return '#FFD700'; // 当前秒显示金色
    if (isPast) return colorScheme === 'dark' ? '#FFFFFF' : '#000000'; // 已过秒
    return '#808080'; // 未到秒
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSecond(new Date().getSeconds());
    }, 1000); // 每秒更新
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        backgroundColor: colorScheme === 'dark' ? '#000000' : '#FFFFFF',
      }}
    >
       <View className="items-center mb-8">
        <Text className={`text-lg font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>
          {formatHrs(currentTime)}
        </Text>

      </View>
      

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Array.from({ length: 60 }).map((_, index) => {
          const isLastInRow = (index + 1) % COLUMNS === 0;

          return (
            <View
              key={index}
              style={{
                width: GRID_ITEM_SIZE,
                height: GRID_ITEM_SIZE,
                marginRight: isLastInRow ? 0 : gap,
                marginBottom: gap,
                borderRadius: 4,
                backgroundColor: getGridItemColor(index),
              }}
            />
          );
        })}
      </View>
      <Text className="text-black dark:text-white text-lg mb-4">
        {currentSecond} / 60
      </Text>
    </ScrollView>
  );
}