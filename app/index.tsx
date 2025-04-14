import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// Yalnızca izin verilen route'ları belirtiyoruz:
type RouteType = "/cakar" | "/led" | "/rgbdisco";

type ItemType = {
  title: string;
  image: any;
  route: RouteType;
};

const items: ItemType[] = [
  {
    title: "Tepe Lambası",
    image: require("../assets/images/police.jpg"),
    route: "/cakar",
  },
  {
    title: "Çakarlı Fener",
    image: require("../assets/images/led.jpg"),
    route: "/led",
  },
  {
    title: "RGB Led",
    image: require("../assets/images/disco.jpg"),
    route: "/rgbdisco",
  },
  {
    title: "Fren Modu",
    image: require("../assets/images/breake.jpg"),
    route: "/night",
  },
];

const Index: FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        className="bg-neutral-900"
      >
        <View className="flex flex-col space-y-6 px-10">
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push(item.route)}
              className="mb-2 bg-neutral-800 rounded-2xl shadow-md shadow-black p-4 mt-2"
            >
              <View className="items-center">
                <Image
                  source={item.image}
                  className="w-40 h-40 rounded-full"
                  resizeMode="cover"
                />
                <Text className="text-white text-xl font-semibold mt-4 text-center">
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
