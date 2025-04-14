import React, { useEffect, useRef, useCallback, useState } from "react";
import {
  Animated,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as NavigationBar from "expo-navigation-bar";

const { width, height } = Dimensions.get("window");

export default function Cakar() {
  const redOpacity = useRef(new Animated.Value(0)).current;
  const blueOpacity = useRef(new Animated.Value(0)).current;
  const [isFlashing, setIsFlashing] = useState(false);
  const insets = useSafeAreaInsets();

  const flashDuration = 125;
  const fullHeight = height + insets.top + insets.bottom;

  const setNavBarColor = async (color: string) => {
    if (Platform.OS === "android") {
      await NavigationBar.setBackgroundColorAsync(color);
    }
  };

  const flashAnimation = useCallback(() => {
    let isActive = true;

    const loop = async () => {
      while (isActive) {
        // Red
        redOpacity.setValue(1);
        await setNavBarColor("#FF0000");
        await new Promise((r) => setTimeout(r, flashDuration));
        redOpacity.setValue(0);

        // Blue
        blueOpacity.setValue(1);
        await setNavBarColor("#2563EB");
        await new Promise((r) => setTimeout(r, flashDuration));
        blueOpacity.setValue(0);
      }
    };

    loop();

    return () => {
      isActive = false;
    };
  }, [redOpacity, blueOpacity]);

  useEffect(() => {
    let stopFlashing: any;

    if (isFlashing) {
      stopFlashing = flashAnimation();
    } else {
      redOpacity.setValue(0);
      blueOpacity.setValue(0);
      setNavBarColor("#000000"); // Default back
    }

    return () => {
      if (typeof stopFlashing === "function") stopFlashing();
    };
  }, [isFlashing, flashAnimation]);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBehaviorAsync("overlay-swipe");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

  return (
    <View className="flex-1">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height: fullHeight,
          backgroundColor: "red",
          opacity: redOpacity,
          zIndex: -1,
        }}
      />
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height: fullHeight,
          backgroundColor: "blue",
          opacity: blueOpacity,
          zIndex: -1,
        }}
      />
      <View
        className="flex-1 justify-center items-center"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: insets.bottom + 24,
          }}
          className="bg-blue-600 px-6 py-3 rounded-lg shadow-lg"
          onPress={() => setIsFlashing((prev) => !prev)}
        >
          <Text className="text-white font-bold text-base">
            {isFlashing ? "Kapa" : "Aç"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
