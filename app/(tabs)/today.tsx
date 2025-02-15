import { useColorScheme } from 'nativewind';
import React from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Text, 
  useWindowDimensions 
} from 'react-native';

export default function TodayScreen() {
  // 获取当前小时数（0-23）
  const [currentHour, setCurrentHour] = React.useState(new Date().getHours());
  const { colorScheme } = useColorScheme();
  const { width: screenWidth } = useWindowDimensions();

  // 计算间距（每行4个格子）
  const gap = (screenWidth - 16 * 2 - 30 * 4) / 3;

  const getBlockColor = (hourIndex: number) => {
    const isCurrentHour = hourIndex === currentHour;
    const isPastHour = hourIndex < currentHour;

    // 当前小时显示金色
    if (isCurrentHour) return '#FFD700';

    // 已过时间根据模式显示
    if (isPastHour) {
      return colorScheme==="dark" ? '#FFFFFF' : '#000000';
    }

    // 未到时间统一显示灰色
    return '#808080';
  };

  const renderHours = () => {
    return Array.from({ length: 24 }).map((_, index) => {
      const isLastInRow = (index + 1) % 4 === 0;

      return (
        <View
          key={index}
          style={[
            styles.hourBlock,
            { 
              marginRight: isLastInRow ? 0 : gap,
              backgroundColor: getBlockColor(index),
            },
          ]}
        />
      );
    });
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colorScheme== "dark" ? '#000000' : '#FFFFFF' }
      ]}
    >
      

      <View style={styles.grid}>{renderHours()}</View>
      <Text>{currentHour} / 24</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hourBlock: {
    width: 30,
    height: 30,
    marginBottom: 8,
    borderRadius: 8,
  },
  toggleButton: {
    padding: 12,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});