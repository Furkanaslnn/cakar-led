import React, { useEffect, useRef, useCallback, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Cakar() {
  const redOpacity = useRef(new Animated.Value(0)).current;
  const blueOpacity = useRef(new Animated.Value(0)).current;
  const [isFlashing, setIsFlashing] = useState(false);

  const flashDuration = 80; // ms cinsinden, ayarlayabilirsin

  const flashAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(redOpacity, {
          toValue: 1,
          duration: flashDuration,
          useNativeDriver: true,
        }),
        Animated.timing(redOpacity, {
          toValue: 0,
          duration: flashDuration,
          useNativeDriver: true,
        }),
        Animated.timing(blueOpacity, {
          toValue: 1,
          duration: flashDuration,
          useNativeDriver: true,
        }),
        Animated.timing(blueOpacity, {
          toValue: 0,
          duration: flashDuration,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [redOpacity, blueOpacity]);

  useEffect(() => {
    if (isFlashing) {
      flashAnimation();
    } else {
      redOpacity.setValue(0);
      blueOpacity.setValue(0);
    }
  }, [isFlashing, flashAnimation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.flash, { backgroundColor: "red", opacity: redOpacity }]}
      />
      <Animated.View
        style={[
          styles.flash,
          { backgroundColor: "blue", opacity: blueOpacity },
        ]}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsFlashing((prev) => !prev)}
      >
        <Text style={styles.buttonText}>
          {isFlashing ? "Stop Flash" : "Start Flash"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  flash: {
    position: "absolute",
    width,
    height,
  },
  button: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
