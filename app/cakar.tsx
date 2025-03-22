import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Cakar() {
  const redOpacity = useRef(new Animated.Value(0)).current;
  const blueOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const flash = () => {
      Animated.sequence([
        Animated.timing(redOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(redOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(blueOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(blueOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => flash());
    };

    flash();
  }, []);

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  flash: {
    position: "absolute",
    width: width,
    height: height,
  },
});
