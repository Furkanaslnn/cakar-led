import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import Slider from "@react-native-community/slider";

type MyFlashMode = "on" | "off";

export default function LedControl() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flashMode, setFlashMode] = useState<MyFlashMode>("off");
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkOnDuration, setBlinkOnDuration] = useState(300); // kullanıcı girdisi

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
          blink(); // döngü
        }, blinkOnDuration * 2); // sönme süresi = yanma süresi * 2
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
            <Text style={styles.sliderLabel}>
              Yanma Süresi: {blinkOnDuration} ms {"\n"}
              Sönme Süresi: {blinkOnDuration * 2} ms
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={500}
              step={100}
              value={blinkOnDuration}
              onValueChange={(value: number) => setBlinkOnDuration(value)}
              minimumTrackTintColor="#2563EB"
              maximumTrackTintColor="#CBD5E1"
              thumbTintColor="#2563EB"
            />
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
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
    color: "#FFF",
    textAlign: "center",
  },
  slider: {
    width: "100%",
    height: 40,
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
