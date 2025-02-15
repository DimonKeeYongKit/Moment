// app/(tabs)/year.tsx
import React from 'react';
import { useColorScheme } from 'nativewind';
import { ScrollView, View, Text, useWindowDimensions } from 'react-native';

const DAYS_IN_YEAR = () => {
  const year = new Date().getFullYear();
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 366 : 365;
};

// 优化后的布局参数
const COLUMNS = 14; // 减少每行列数
const GRID_ITEM_SIZE = 20; // 增大格子尺寸
const VERTICAL_SPACING = 8; // 增加垂直间距

export default function YearScreen() {
  const { colorScheme } = useColorScheme();
  const { width: screenWidth } = useWindowDimensions();
  const [currentDay, setCurrentDay] = React.useState(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  });

  // 新的间距计算方式
  const gap = (screenWidth - 24 * 2 - GRID_ITEM_SIZE * COLUMNS) / (COLUMNS - 1);

  // 颜色逻辑保持不变
  const getDayColor = (dayNumber: number) => {
    if (dayNumber === currentDay) return '#FFD700';
    if (dayNumber < currentDay) return colorScheme === 'dark' ? '#FFFFFF' : '#000000';
    return '#808080';
  };

  const getCurrentYear = ()=>{
    return new Date().getFullYear().toString();
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - start.getTime();
      setCurrentDay(Math.floor(diff / (1000 * 60 * 60 * 24)));
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 24, // 增加容器内边距
        backgroundColor: colorScheme === 'dark' ? '#000000' : '#FFFFFF',
      }}
    >
      <Text>{getCurrentYear()}</Text>


      <View style={{ 
        flexDirection: 'row', 
        flexWrap: 'wrap',
        marginBottom: -VERTICAL_SPACING // 补偿最后一行的间距
      }}>
        {Array.from({ length: DAYS_IN_YEAR() }).map((_, index) => {
          const dayNumber = index + 1;
          const isLastInRow = (index + 1) % COLUMNS === 0;

          return (
            <View
              key={dayNumber}
              style={{
                width: GRID_ITEM_SIZE,
                height: GRID_ITEM_SIZE,
                marginRight: isLastInRow ? 0 : gap,
                marginBottom: VERTICAL_SPACING,
                borderRadius: 4, // 增加圆角
                backgroundColor: getDayColor(dayNumber),
                shadowColor: colorScheme === 'dark' ? '#FFF' : '#000', // 添加微阴影
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 1,
                elevation: 1,
              }}
            />
          );
        })}

        <Text className="text-black dark:text-white text-lg mb-4">
          {currentDay} / {DAYS_IN_YEAR()}
        </Text>
      </View>


    </ScrollView>
  );
}