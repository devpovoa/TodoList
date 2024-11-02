import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { themas } from "../../global/themes";
import { AuthContextList } from "../../context/authContext_list";

export default ({ state, navigation }) => {
  const { onOpen } = useContext<any>(AuthContextList);
  const go = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={style.tabArea}>
      <TouchableOpacity style={style.tabItem} onPress={() => go("List")}>
        <AntDesign
          name="bars"
          style={{
            fontSize: 32,
            opacity: state.index === 0 ? 1 : 0.4,
            color: themas.colors.primary,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={style.tabItemButton} onPress={() => onOpen()}>
        <View style={{ width: "100%", left: 10, top: 4 }}>
          <Entypo name="plus" color={"#FFF"} size={40} />
        </View>
        <View
          style={{
            flexDirection: "row-reverse",
            width: "100%",
            right: 10,
            bottom: 10,
          }}
        >
          <MaterialIcons name="edit" color={"#FFF"} size={30} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={style.tabItem} onPress={() => go("User")}>
        <AntDesign
          name="user"
          style={{
            fontSize: 32,
            opacity: state.index === 1 ? 1 : 0.4,
            color: themas.colors.primary,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
