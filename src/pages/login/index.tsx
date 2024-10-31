import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { style } from "./styles";
import Logo from "../../assets/logo.png";
import { themas } from "../../global/themes";
import { Input } from "../../components/input";
import { Button } from "../../components/Button";

export default function Login() {
  const [useId, setUseId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  async function getLogin() {
    try {
      setLoading(true);
      if (!useId || !password) {
        return Alert.alert(
          `Atenção ${"🚨"}`,
          `Informe os campos obrigatórios!`
        );
      }

      setTimeout(() => {
        if (useId == "admin@use" && password == "303026") {
          Alert.alert(`Logado com sucesso!${"🚀"}`);
        } else {
          Alert.alert(`Usuário não encontrado!${"📂"}`);
        }

        setLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Image source={Logo} style={style.img} resizeMode="contain" />
        <Text style={style.titulo}>DailyTasks!</Text>
      </View>

      <View style={style.boxMid}>
        <Input
          title="Login"
          iconRigthName="login"
          IconRigth={MaterialIcons}
          value={useId}
          onChangeText={setUseId}
        />
        <Input
          title="Senha"
          iconRigthName={showPassword ? "lock" : "unlock"}
          IconRigth={Octicons}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={showPassword}
          onIconRigthPress={() => setShowPassword(!showPassword)}
        />
      </View>

      <View style={style.boxBottom}>
        <Button text="Entrar" loading={loading} onPress={() => getLogin()} />
      </View>

      <Text style={style.buttonFooter}>
        Não tem conta?{" "}
        <Text style={{ color: themas.colors.primary }}>Crie agora!</Text>
      </Text>
    </View>
  );
}
