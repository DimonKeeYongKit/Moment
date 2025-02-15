// app/(tabs)/year.tsx
import React from 'react';
import { useColorScheme } from 'nativewind';
import { ScrollView, View, Text, useWindowDimensions } from 'react-native';

const WEEKS_IN_YEAR = 53;
const COLUMNS = 10; // 每行10个周格子
const GRID_ITEM_SIZE = 30; // 格子大小

export default function YearScreen() {
  const { colorScheme } = useColorScheme();
  const { width: screenWidth } = useWindowDimensions();
  const [currentWeek, setCurrentWeek] = React.useState(getCurrentWeekNumber());

  // 计算当前是第几周（简单实现）
  function getCurrentWeekNumber() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000));
  }

  // 计算间距
  const gap = (screenWidth - 16 * 2 - GRID_ITEM_SIZE * COLUMNS) / (COLUMNS - 1);

  const getWeekColor = (weekNumber: number) => {
    if (weekNumber === currentWeek) return '#FFD700'; // 当前周
    if (weekNumber < currentWeek) return colorScheme === 'dark' ? '#FFFFFF' : '#000000'; // 已过周
    return '#808080'; // 未来周
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWeek(getCurrentWeekNumber());
    }, 60 * 1000); // 每分钟检查一次周数变化
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
      

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {Array.from({ length: WEEKS_IN_YEAR }).map((_, index) => {
          const weekNumber = index + 1;
          const isLastInRow = (index + 1) % COLUMNS === 0;

          return (
            <View
              key={weekNumber}
              style={{
                width: GRID_ITEM_SIZE,
                height: GRID_ITEM_SIZE,
                marginRight: isLastInRow ? 0 : gap,
                marginBottom: gap,
                borderRadius: 6,
                backgroundColor: getWeekColor(weekNumber),
              }}
            >
              
            </View>
          );
        })}
      </View>

      <Text className="text-black dark:text-white text-lg mb-4">
        {currentWeek} / 54
      </Text>
    </ScrollView>
  );
}