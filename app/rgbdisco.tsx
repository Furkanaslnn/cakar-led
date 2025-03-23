import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";

const COLORS = [
  "#FF0000", // Kırmızı
  "#FF7F00", // Turuncu
  "#FFFF00", // Sarı
  "#00FF00", // Yeşil
  "#0000FF", // Mavi
  "#4B0082", // İndigo
  "#8B00FF", // Mor
];

export default function RGBDisco() {
  const [isPlaying, setIsPlaying] = useState(false);
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation: Animated.CompositeAnimation;

    if (isPlaying) {
      animation = Animated.loop(
        Animated.timing(colorAnim, {
          toValue: COLORS.length,
          duration: COLORS.length * 200,
          useNativeDriver: false,
        })
      );
      colorAnim.setValue(0);
      animation.start();
    } else {
      colorAnim.stopAnimation();
    }

    return () => {
      colorAnim.stopAnimation();
    };
  }, [isPlaying]);

  const bgColor = colorAnim.interpolate({
    inputRange: COLORS.map((_, i) => i),
    outputRange: COLORS,
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: bgColor }]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsPlaying((prev) => !prev)}
      >
        <Text style={styles.buttonText}>
          {isPlaying ? "Stop" : "Start"} Disco
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
