// app/(tabs)/year.tsx
import React from 'react';
import { useColorScheme } from 'nativewind';
import { ScrollView, View, Text, useWindowDimensions } from 'react-native';
import { GridStyles } from '../../styles/global';

const DAYS_PER_YEAR = () => {
  const year = new Date().getFullYear();
  return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 366 : 365;
};

// 优化后的布局参数
const COLUMNS = 14; // 减少每行列数


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
  const gap = (screenWidth - 24 * 2 - GridStyles.gridItem.height * COLUMNS) / (COLUMNS-1);

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

  const renderDays = () => {
    return Array.from({ length: DAYS_PER_YEAR() }).map((_, index) => {
      const isLastInRow = (index + 1) % 14 === 0;

      return (
        <View
          key={index}
          style={[
            GridStyles.gridItem,
            { 
              marginRight: isLastInRow ? 0 : gap, // 单独控制水平间距
              backgroundColor: getDayColor(index + 1),
            },
          ]}
        />
      );
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[GridStyles.scrollViewContainer, {backgroundColor:colorScheme === 'dark' ? GridStyles.ThemeDark.backgroundColor : GridStyles.ThemeWhite.backgroundColor}]}>
      <Text>{getCurrentYear()}</Text>
      <View style={GridStyles.gridContainer}>{renderDays()}</View>
      <Text>{currentDay} / {DAYS_PER_YEAR()}</Text>
    </ScrollView>
  );
}