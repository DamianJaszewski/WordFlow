import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,TextInput, Pressable , FlatList, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Card from './components/Card';
import Login from './components/Login';

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Card} />
      <Tab.Screen name="Settings" component={Login} />
    </Tab.Navigator>
  );
}

