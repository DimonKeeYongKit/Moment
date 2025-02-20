// app/(tabs)/now.tsx
import React from "react";
import { useColorScheme } from "nativewind";
import { ScrollView, View, Text, useWindowDimensions } from "react-native";
import { GridStyles } from "../../styles/global";



const formatHrs = (date: Date) => {
  let hrs = Number.parseInt(date.getHours().toString());
  if (hrs > 12) hrs -= 12;

  return `${hrs}:${date.getMinutes().toString()}`;
};
const SECOND_PER_MINUTE = 60;
const COLUMNS = 10;

export default function NowScreen() {
	const { colorScheme } = useColorScheme();
	const { width: screenWidth } = useWindowDimensions();
	const [currentSecond, setCurrentSecond] = React.useState(
		new Date().getSeconds(),
	);
  const [currentTime, setCurrentTime] = React.useState(new Date());

	// 计算水平间距
	const gap = (screenWidth - 16 * 2 - GridStyles.gridItem.height * COLUMNS) / (COLUMNS-1); // 每行10个格子

	const getGridItemColor = (second: number) => {
		const isCurrent = second === currentSecond;
		const isPast = second < currentSecond;

		if (isCurrent) return "#FFD700";
		if (isPast) return colorScheme === "dark" ? "#FFFFFF" : "#000000";
		return "#808080";
	};

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentSecond(new Date().getSeconds());
    }, 1000);
    return () => clearInterval(interval);
  }, []);




	const renderSeconds = () => {
		return Array.from({ length: SECOND_PER_MINUTE }).map((_, index) => {
			const isLastInRow = (index + 1) % COLUMNS === 0;

			return (
				<View
					key={index}
					style={[
						GridStyles.gridItem,
						{
							marginRight: isLastInRow ? 0 : gap, // 单独控制水平间距
							backgroundColor: getGridItemColor(index),
						},
					]}
				/>
			);
		});
	};

	return (
		<ScrollView contentContainerStyle={[GridStyles.scrollViewContainer, {backgroundColor:colorScheme === 'dark' ? GridStyles.ThemeDark.backgroundColor : GridStyles.ThemeWhite.backgroundColor}]}>
			<Text>{formatHrs(currentTime)}</Text>
			<View style={GridStyles.gridContainer}>{renderSeconds()}</View>
			<Text>{currentSecond} / {SECOND_PER_MINUTE}</Text>
		</ScrollView>
	);
}
