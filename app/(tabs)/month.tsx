// app/(tabs)/year.tsx
import React from 'react';
import { useColorScheme } from 'nativewind';
import { ScrollView, View, Text, useWindowDimensions } from 'react-native';
import { GridStyles } from '../../styles/global';

const WEEKS_PER_YEAR = 53;
const COLUMNS = 10;


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
  const gap = (screenWidth - 16 * 2 - GridStyles.gridItem.height * COLUMNS) / (COLUMNS - 1);

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

  const renderWeeks = () => {
    return Array.from({ length: WEEKS_PER_YEAR }).map((_, index) => {
      const isLastInRow = (index + 1) % COLUMNS === 0;

      return (
        <View
          key={index}
          style={[
            GridStyles.gridItem,
            { 
              marginRight: isLastInRow ? 0 : gap, // 单独控制水平间距
              backgroundColor: getWeekColor(index + 1),
            },
          ]}
        />
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={[GridStyles.scrollViewContainer, {backgroundColor:colorScheme === 'dark' ? GridStyles.ThemeDark.backgroundColor : GridStyles.ThemeWhite.backgroundColor}]}>
      <View style={GridStyles.gridContainer}>{renderWeeks()}</View>
      <Text>{currentWeek} / {WEEKS_PER_YEAR}</Text>
    </ScrollView>
  );
}