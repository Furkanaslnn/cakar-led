import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="bg-neutral-800 h-full flex justify-evenly items-center space-y-6 gap-10">
      <View>
        <TouchableOpacity onPress={() => router.push("/cakar")}>
          <Image
            source={require("../assets/images/police.jpg")}
            className="w-80 h-80 rounded-full"
            resizeMode="cover"
          />
          <Text className="text-center text-white text-2xl mt-2 ">
            Kırmız-Mavi Polis Çakar
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity onPress={() => router.push("/led")}>
          <Image
            source={require("../assets/images/led.jpg")}
            className="w-80 h-80 rounded-full"
            resizeMode="cover"
          />
          <Text className="text-center text-white text-2xl mt-2 ">
            Fener Led Çakar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
