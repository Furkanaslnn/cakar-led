import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FC } from "react";

// Yalnızca izin verilen route'ları belirtiyoruz:
type RouteType = "/cakar" | "/led" | "/rgbdisco";

type ItemType = {
  title: string;
  image: any;
  route: RouteType;
};

const items: ItemType[] = [
  {
    title: "Kırmızı-Mavi Polis Çakar",
    image: require("../assets/images/police.jpg"),
    route: "/cakar",
  },
  {
    title: "Fener Led Çakar",
    image: require("../assets/images/led.jpg"),
    route: "/led",
  },
  {
    title: "RGB Disco Işığı",
    image: require("../assets/images/disco.jpg"),
    route: "/rgbdisco",
  },
];

const Index: FC = () => {
  return (
    <ScrollView className="bg-neutral-900 px-4 pt-10 mt-10">
      <View className="flex flex-col space-y-6 pb-10">
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.route)}
            className="bg-neutral-800 rounded-2xl shadow-md shadow-black p-4 mt-2"
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
  );
};

export default Index;
