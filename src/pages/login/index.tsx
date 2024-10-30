import React, { useState } from "react";
import {View, Text, Image, TextInput, TouchableOpacity, Systrace, Alert, ActivityIndicator} from 'react-native';
import { style } from "./style";
import Logo from '../../assets/logo.png';
import {MaterialIcons} from '@expo/vector-icons';
import { themas } from "../../global/themes";

export default function Login (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function getLogin(){
        try {

            setLoading(true);
            if (!email || !password) {
                return Alert.alert(`Atenção ${'🚨'}`, `Informe os campos obrigatórios!`);
            }

            setTimeout(()=>{
                if (email == 'pixote@pixote' && password == '303026') {
                    Alert.alert(`Logado com sucesso!${'🚀'}`); 
                } else{
                    Alert.alert(`Usuário não encontrado!${'📂'}`); 
                }
               
                setLoading(false);
            },3000);
           
        } catch (error) {
            console.log(error);
        } 
    }

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image source={Logo} style={style.img} resizeMode="contain"/>
                <Text style={style.titulo}>Bem Vindo de Volta!</Text>
            </View> 

            <View style={style.boxMid}>
                <Text style={style.tituloInput}>Login</Text> 
                <View style={style.boxInput}>
                    <TextInput style={style.input} value={email} onChangeText={(e)=>setEmail(e)}/>
                    <MaterialIcons name="email" size={25} color={themas.colors.gray}/> 
                </View>
                
                <Text style={style.tituloInput}>Senha</Text>
                <View style={style.boxInput}>
                    <TextInput style={style.input} value={password} onChangeText={(e)=>setPassword(e)}  /> 
                    <MaterialIcons name="password" size={25} color={themas.colors.gray}/>
                </View>  
            </View> 

            <View style={style.boxBottom}>
                <TouchableOpacity style={style.button} onPress={() => getLogin()}>
                    {loading?<ActivityIndicator color={'#FFFF'} size={"small"}/>:<Text style={style.textButton}>Entrar</Text>}       
                </TouchableOpacity> 
            </View> 

            <Text style={style.buttonFooter}>Não tem conta? <Text style={{color:themas.colors.primary}}>Crie agora!</Text></Text>           
        </View>
    )
};