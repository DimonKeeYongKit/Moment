import { useColorScheme } from "nativewind";
import React from "react";
import {
	StyleSheet,
	View,
	ScrollView,
	TouchableOpacity,
	Text,
	useWindowDimensions,
} from "react-native";
import { GridStyles } from "../../styles/global";

const HOUR_PER_DAY = 24;
const COLUMNS = 4;
export default function TodayScreen() {
	const { colorScheme } = useColorScheme();
	const { width: screenWidth } = useWindowDimensions();
	const [currentHour, setCurrentHour] = React.useState(new Date().getHours());

	const gap = (screenWidth - 16 * 2 - GridStyles.gridItem.height * COLUMNS) / (COLUMNS - 1);

	const getBlockColor = (hourIndex: number) => {
		const isCurrentHour = hourIndex === currentHour;
		const isPastHour = hourIndex < currentHour;

		// 当前小时显示金色
		if (isCurrentHour) return "#FFD700";

		// 已过时间根据模式显示
		if (isPastHour) {
			return colorScheme === "dark" ? "#FFFFFF" : "#000000";
		}

		// 未到时间统一显示灰色
		return "#808080";
	};

	const renderHours = () => {
		return Array.from({ length: HOUR_PER_DAY }).map((_, index) => {
			const isLastInRow = (index + 1) % COLUMNS === 0;

			return (
				<View
					key={index}
					style={[
						GridStyles.gridItem,
						{
							marginRight: isLastInRow ? 0 : gap,
							backgroundColor: getBlockColor(index),
						},
					]}
				/>
			);
		});
	};

	return (
		<ScrollView contentContainerStyle={[GridStyles.scrollViewContainer, {backgroundColor:colorScheme === 'dark' ? GridStyles.ThemeDark.backgroundColor : GridStyles.ThemeWhite.backgroundColor}]}>
			<View style={GridStyles.gridContainer}>{renderHours()}</View>
      <Text>{currentHour} / {HOUR_PER_DAY}</Text>
		</ScrollView>
	);
}
