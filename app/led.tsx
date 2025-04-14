import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import Slider from "@react-native-community/slider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MyFlashMode = "on" | "off";

export default function LedControl() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flashMode, setFlashMode] = useState<MyFlashMode>("off");
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkOnDuration, setBlinkOnDuration] = useState(300);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const blink = () => {
      if (!isMounted || !isBlinking) return;

      setFlashMode("on");

      timeoutId = setTimeout(() => {
        if (!isMounted || !isBlinking) return;

        setFlashMode("off");

        timeoutId = setTimeout(() => {
          blink();
        }, blinkOnDuration * 2);
      }, blinkOnDuration);
    };

    if (isBlinking) {
      blink();
    } else {
      setFlashMode("off");
    }

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isBlinking, blinkOnDuration]);

  const toggleBlinking = () => {
    setIsBlinking((prev) => !prev);
  };

  return (
    <View className="flex-1 items-center justify-center bg-neutral-800 px-5">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {permission?.granted ? (
        <>
          <CameraView
            active={true}
            style={{
              width: 1,
              height: 1,
              opacity: 0,
              position: "absolute",
            }}
            flash={flashMode as any}
            enableTorch={flashMode === "on"}
            facing="back"
          />

          <TouchableOpacity
            onPress={toggleBlinking}
            className={`px-6 py-4 rounded-xl shadow-lg mb-10 ${
              isBlinking ? "bg-red-500" : "bg-blue-600"
            }`}
            style={{
              marginBottom: insets.bottom + 40,
            }}
          >
            <Text className="text-white font-semibold text-lg">
              {isBlinking ? "Durdur" : "Başlat"}
            </Text>
          </TouchableOpacity>

          <View className="w-full px-3">
            <Text className="text-white text-base font-medium mb-2 text-center">
              Hız: {blinkOnDuration} ms {"\n"}
            </Text>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={0}
              maximumValue={500}
              step={100}
              value={blinkOnDuration}
              onValueChange={(val: number) => setBlinkOnDuration(val)}
              minimumTrackTintColor="#2563EB"
              maximumTrackTintColor="#CBD5E1"
              thumbTintColor="#2563EB"
            />
          </View>
        </>
      ) : (
        <View className="items-center justify-center px-4">
          <Text className="text-gray-200 text-base mb-5 text-center">
            Kamera izni gereklidir.
          </Text>
          <TouchableOpacity
            onPress={requestPermission}
            className="bg-emerald-400 px-6 py-3 rounded-xl shadow"
          >
            <Text className="text-white font-semibold text-base">İzin Ver</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
