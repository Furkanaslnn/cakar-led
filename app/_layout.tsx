import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"></Stack.Screen>
      <Stack.Screen name="led"></Stack.Screen>
      <Stack.Screen name="cakar"></Stack.Screen>
    </Stack>
  );
}
