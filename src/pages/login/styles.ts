import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  img: {
    width: 110,
    height: 110,
    borderRadius: 110,
  },

  boxTop: {
    height: Dimensions.get("window").height / 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontWeight: "bold",
    marginTop: 35,
    fontSize: 18,
  },

  boxMid: {
    height: Dimensions.get("window").height / 4,
    width: "100%",
    paddingHorizontal: 37,
  },

  boxBottom: {
    height: Dimensions.get("window").height / 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonFooter: {
    fontSize: 16,
    color: themas.colors.gray,
  },
});
