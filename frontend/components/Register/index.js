import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View,TextInput, Pressable , FlatList, TouchableOpacity} from 'react-native';
import AuthService from '../../services/auth.service';
import appStyles from '../../style';

function Register(){

  const [register, setRegister] = useState({email: "" , password: "", userName: ""});

  const registerUer = async() => {
    try{
      debugger;
      await AuthService.register(register)
      setLogin({ email: "", password: "", userName: "" })
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <View style={appStyles.container}>
      <div style = {appStyles.card}>
        <Text style={appStyles.categoryName}>Login</Text>
        
      </div>
      <div style = {appStyles.card}>
        <TextInput
          style = {appStyles.inputText}
          placeholder="User name"
          value={register.userName}
          onChangeText={text => setRegister({ ...register, userName: text })}
        />
        <hr className="rounded"></hr>
        <TextInput
          style = {appStyles.inputText}
          placeholder="Email"
          value={register.email}
          onChangeText={text => setRegister({ ...register, email: text })}
        />
        <hr className="rounded"></hr>
         <TextInput
          style = {appStyles.inputText}
          placeholder="Password"
          value={register.password}
          onChangeText={text => setRegister({ ...register, password: text })}
        />
        <Pressable style = {appStyles.myButton} onPress={registerUer}>
          <Text style={appStyles.text}>{"Register"}</Text>
        </Pressable>
      </div>
    </View>
  );
}
  
export default Register