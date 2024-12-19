import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View,TextInput, Pressable , FlatList, TouchableOpacity} from 'react-native';
import AuthService from '../../services/auth.service';
import appStyles from '../../style';
import { useNavigation } from '@react-navigation/native';

function Login(){

  const [login, setLogin] = useState({email: "" , password: ""});

  const loginUer = async() => {
    try{
      await AuthService.login(login)
      setLogin({ email: "", password: "" })
      handleLinkPress('Home')
    } catch (error) {
      setError(error.message);
    }
  }

  const navigation = useNavigation();
  
  const handleLinkPress = (screenName) => {
      navigation.navigate(screenName, {refresh: true});
    };
  

  return (
    <View style={appStyles.container}>
      <div style = {appStyles.card}>
        <Text style={appStyles.categoryName}>Login</Text>
        
      </div>
      <div style = {appStyles.card}>
        <TextInput
          style = {appStyles.inputText}
          placeholder="Email"
          value={login.email}
          onChangeText={text => setLogin({ ...login, email: text })}
        />
        <hr className="rounded"></hr>
        <TextInput
          style = {appStyles.inputText}
          placeholder="Password"
          value={login.password}
          onChangeText={text => setLogin({ ...login, password: text })}
        />
        <Pressable style = {appStyles.myButton} onPress={loginUer}>
          <Text style={appStyles.text}>{"Login"}</Text>
        </Pressable>
        <Pressable title="RememberPassword" style = {appStyles.myButton}>
          <Text style={appStyles.text}>{"Remember Password"}</Text>
        </Pressable>
      </div>
    </View>
  );
}
  
export default Login