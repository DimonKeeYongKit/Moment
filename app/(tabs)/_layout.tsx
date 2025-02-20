import { GridStyles } from "@/styles/global";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <Tabs
    
      screenOptions={{
        tabBarActiveTintColor: GridStyles.goldColor.backgroundColor ,
        tabBarInactiveTintColor: colorScheme === "dark" ? GridStyles.ThemeDark.color: GridStyles.ThemeWhite.color,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? GridStyles.ThemeDark.backgroundColor : GridStyles.ThemeWhite.backgroundColor,
        },
        headerShown: false,
        tabBarPosition: "top",
      }}
    >
      <Tabs.Screen name="now" options={{ title: "Now" }} />
      <Tabs.Screen name="today" options={{ title: "Today" }} />
      <Tabs.Screen name="month" options={{ title: "Month" }} />
      <Tabs.Screen name="year" options={{ title: "Year" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}