import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { Input } from "../../components/Input";
import { MaterialIcons } from "@expo/vector-icons";
import { Ball } from "../../components/Ball";
import { Flag } from "../../components/Flag";
import { themas } from "../../global/themes";

type PropCard = {
  item: number;
  title: string;
  description: string;
  flag: "urgente" | "opcional";
};
const data: Array<PropCard> = [
  { item: 0, title: "sleep", description: "página 5", flag: "urgente" },
  { item: 1, title: "Food", description: "página 5", flag: "opcional" },
  { item: 2, title: "code", description: "página 5", flag: "opcional" },
];

export default function List() {
  const _renderCard = (item: PropCard) => {
    return (
      <TouchableOpacity style={style.card}>
        <View style={style.rowCard}>
          <View style={style.rowCardLeft}>
            <Ball color="red" />
            <View>
              <Text style={style.titleCard}>{item.title}</Text>
              <Text style={style.descriptionCard}>{item.description}</Text>
            </View>
          </View>
          <Flag caption="urgente" color={themas.colors.red} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text style={style.greeting}>Olá novamente!</Text>
        <View style={style.boxInput}>
          <Input IconLeft={MaterialIcons} iconLeftName="search" />
        </View>
      </View>

      <View style={style.boxList}>
        <FlatList
          data={data}
          style={{ marginTop: 40, paddingHorizontal: 30 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return _renderCard(item);
          }}
        />
      </View>
    </View>
  );
}
