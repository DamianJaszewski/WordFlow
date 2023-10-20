import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View,TextInput, Pressable , FlatList, TouchableOpacity} from 'react-native';
import CardsService from '../../services/auth.service';
import CategoryService from '../../services/auth.service';
import styles from '../../style';

function Login(){

  return (
    <View style={styles.container}>
      <div style = {styles.card}>
        <Text style={styles.categoryName}>Login</Text>
        
      </div>
      <div style = {styles.card}>
        <TextInput
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            marginBottom: 10,
          }}
          placeholder="Kategoria"
        />
        <TextInput
          style = {styles.inputText}
          placeholder="Pytanie"
        />
        <hr className="rounded"></hr>
        <TextInput
          style = {styles.inputText}
          placeholder="Odpowiedź"
        />
        <Pressable style = {styles.myButton} >
          <Text style={styles.text}>{"Dodaj"}</Text>
        </Pressable>
        <Pressable title="Edytuj" style = {styles.myButton} ><Text style={styles.text}>{"Edytuj"}</Text></Pressable>
        <Pressable title="Usuń" style = {styles.myButton} ><Text style={styles.text}>{"Usuń"}</Text></Pressable>
        <StatusBar style="auto" />
      </div>
    </View>
  );
}
  
export default Login