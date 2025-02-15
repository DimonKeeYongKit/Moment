import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { Text, TouchableOpacity } from "react-native";

export default function TabLayout() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colorScheme === "dark" ? "#FFD700" : "#007BFF",
          tabBarInactiveTintColor: colorScheme === "dark" ? "#A0A0A0" : "#808080",
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF",
          },
          headerShown: false,
          
        }}
      >
        {/* <Tabs.Screen name="index" options={{ title: "Today" }} /> */}
        {/* <Tabs.Screen name="week" options={{ title: "Week" }} />
        <Tabs.Screen name="month" options={{ title: "Month" }} />
        <Tabs.Screen name="year" options={{ title: "Year" }} /> */}
      </Tabs>

      {/* 深色模式切换按钮 */}
      <TouchableOpacity
        className="absolute bottom-8 right-4 bg-primary-light dark:bg-primary-dark p-3 rounded-full"
        onPress={toggleColorScheme}
      >
        <Text className="text-white">
          {colorScheme === "dark" ? "☀️" : "🌙"}
        </Text>
      </TouchableOpacity>
    </>
  );
}