import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { style } from "./style";

type Props = {
  color: string;
  caption: string;
  selected?: boolean;
};

export function Flag({ ...rest }: Props) {
  return (
    <TouchableOpacity
      style={[
        style.container,
        { backgroundColor: rest?.color },
        rest?.selected && { borderWidth: 2 },
      ]}
    >
      <Text style={{ color: "#FFF" }}>{rest.caption}</Text>
    </TouchableOpacity>
  );
}
