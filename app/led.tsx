import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import Slider from "@react-native-community/slider";

type MyFlashMode = "on" | "off";

export default function LedControl() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flashMode, setFlashMode] = useState<MyFlashMode>("off");
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkSpeed, setBlinkSpeed] = useState(10);
  const blinkInterval = useRef<NodeJS.Timeout | null>(null);

  const calculatedMs = 1000 - blinkSpeed * 10;

  useEffect(() => {
    if (isBlinking) {
      blinkInterval.current = setInterval(() => {
        setFlashMode((prev) => (prev === "on" ? "off" : "on"));
      }, calculatedMs);
    } else {
      setFlashMode("off");
      if (blinkInterval.current) clearInterval(blinkInterval.current);
    }

    return () => {
      if (blinkInterval.current) clearInterval(blinkInterval.current);
    };
  }, [isBlinking, blinkSpeed]);

  const toggleBlinking = () => {
    setIsBlinking((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {permission?.granted ? (
        <>
          <CameraView
            active={true}
            style={styles.hiddenCamera}
            flash={flashMode as any}
            enableTorch={flashMode === "on"}
            facing="back"
          />

          <TouchableOpacity
            onPress={toggleBlinking}
            style={[
              styles.button,
              { backgroundColor: isBlinking ? "#EF4444" : "#2563EB" },
            ]}
          >
            <Text style={styles.buttonText}>
              {isBlinking ? "Stop Flash" : "Start Flash"}
            </Text>
          </TouchableOpacity>

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Flash Speed: {blinkSpeed}</Text>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={100}
              step={10}
              value={blinkSpeed}
              onValueChange={(value: number) => setBlinkSpeed(value)}
              minimumTrackTintColor="#2563EB"
              maximumTrackTintColor="#CBD5E1"
              thumbTintColor="#2563EB"
            />
            <Text style={styles.msText}>Interval: {calculatedMs} ms</Text>
          </View>
        </>
      ) : (
        <View style={styles.centered}>
          <Text style={styles.permissionText}>
            We need your permission to use the camera
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#34D399" }]}
            onPress={requestPermission}
          >
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  hiddenCamera: {
    width: 1,
    height: 1,
    opacity: 0,
    position: "absolute",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  sliderContainer: {
    width: "100%",
    alignItems: "stretch",
    paddingHorizontal: 10,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    textAlign: "center",
    color: "#111827",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  msText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
    color: "#6B7280",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  permissionText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#111827",
  },
});
