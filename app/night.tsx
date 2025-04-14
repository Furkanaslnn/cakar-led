import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Accelerometer } from "expo-sensors";
import { useKeepAwake } from "expo-keep-awake";

export default function Night() {
  useKeepAwake();

  const lastSpeed = useRef(0);
  const isFlashing = useRef(false);
  const isBraking = useRef(false);
  const animationInterval = useRef<NodeJS.Timeout | null>(null);

  const originalColors = [
    "bg-red-300",
    "bg-red-500",
    "bg-red-300",
    "bg-red-500",
    "bg-red-300",
  ];

  const [colors, setColors] = useState([...originalColors]);

  // 🔁 Normal animasyon (sırayla "parlama" efekti)
  const startIdleAnimation = () => {
    let index = 0;
    animationInterval.current = setInterval(() => {
      if (isBraking.current) return; // fren aktifken animasyon çalışmasın

      const updated = [...originalColors];
      updated[index] = "bg-red-400"; // parlaklık efekti
      setColors(updated);

      index = (index + 1) % originalColors.length;
    }, 300);
  };

  const stopIdleAnimation = () => {
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
      animationInterval.current = null;
    }
    setColors([...originalColors]);
  };

  const startBrakeFlash = () => {
    if (isFlashing.current) return;
    isFlashing.current = true;
    isBraking.current = true;

    stopIdleAnimation();

    const flashSequence = [
      Array(5).fill("bg-red-900"),
      Array(5).fill("bg-red-600"),
      Array(5).fill("bg-red-900"),
      Array(5).fill("bg-red-600"),
    ];

    let step = 0;
    const flashInterval = setInterval(() => {
      if (step >= flashSequence.length) {
        setColors([...originalColors]);
        clearInterval(flashInterval);
        isFlashing.current = false;
        isBraking.current = false;
        startIdleAnimation(); // fren sonrası idle’a geç
        return;
      }
      setColors(flashSequence[step]);
      step++;
    }, 50);
  };

  useEffect(() => {
    Accelerometer.setUpdateInterval(200);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const currentSpeed = Math.sqrt(x * x + y * y + z * z);
      const delta = lastSpeed.current - currentSpeed;

      if (delta > 0.4) {
        startBrakeFlash();
      }

      lastSpeed.current = currentSpeed;
    });

    startIdleAnimation(); // ilk başta animasyon başlasın

    return () => {
      subscription.remove();
      stopIdleAnimation();
    };
  }, []);

  return (
    <View className="flex-1 flex-col">
      {colors.map((bg, index) => (
        <View key={index} className={`flex-1 ${bg}`} />
      ))}
    </View>
  );
}
