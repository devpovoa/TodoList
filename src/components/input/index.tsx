import React, { forwardRef, Fragment, LegacyRef } from "react";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from "react-native";
import { style } from "./style";
import { MaterialIcons, FontAwesome, Octicons } from "@expo/vector-icons";
import { themas } from "../../global/themes";

type IconComponent =
  | React.ComponentType<React.ComponentProps<typeof MaterialIcons>>
  | React.ComponentType<React.ComponentProps<typeof FontAwesome>>
  | React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
  IconLeft?: IconComponent;
  IconRigth?: IconComponent;
  iconLeftName?: string;
  iconRigthName?: string;
  title?: string;
  onIconLeftPress?: () => void;
  onIconRigthPress?: () => void;
  heigth?: number;
  labelStyle?: StyleProp<TextStyle>;
};

export const Input = forwardRef(
  (Props: Props, ref: LegacyRef<TextInput> | null) => {
    const {
      IconLeft,
      IconRigth,
      iconLeftName,
      iconRigthName,
      title,
      onIconLeftPress,
      onIconRigthPress,
      heigth,
      labelStyle,
      ...rest
    } = Props;

    const calculateSizeWidth = () => {
      if (IconLeft && IconRigth) {
        return "80%";
      } else if (IconLeft || IconRigth) {
        return "90%";
      } else {
        return "100%";
      }
    };

    const calculateSizePaddingLeft = () => {
      if (IconLeft && IconRigth) {
        return 0;
      } else if (IconLeft || IconRigth) {
        return 10;
      } else {
        return 20;
      }
    };

    return (
      <Fragment>
        {title && <Text style={[style.tituloInput, labelStyle]}>{title}</Text>}
        <View
          style={[
            style.boxInput,
            { paddingLeft: calculateSizePaddingLeft(), height: heigth || 40 },
          ]}
        >
          {IconLeft && iconLeftName && (
            <TouchableOpacity onPress={onIconLeftPress} style={style.Button}>
              <IconLeft
                name={iconLeftName as any}
                size={20}
                color={themas.colors.gray}
                style={style.Icon}
              />
            </TouchableOpacity>
          )}

          <TextInput
            style={[
              style.input,
              { width: calculateSizeWidth(), height: "100%" },
            ]}
            {...rest}
          />

          {IconRigth && iconRigthName && (
            <TouchableOpacity onPress={onIconRigthPress} style={style.Button}>
              <IconRigth
                name={iconRigthName as any}
                size={26}
                color={themas.colors.gray}
                style={style.Icon}
              />
            </TouchableOpacity>
          )}
        </View>
      </Fragment>
    );
  }
);
