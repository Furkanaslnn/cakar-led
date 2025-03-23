import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar translucent={true} backgroundColor="transparent" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"></Stack.Screen>
        <Stack.Screen name="led"></Stack.Screen>
        <Stack.Screen name="cakar"></Stack.Screen>
      </Stack>
    </>
  );
}
