import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

// const TabBottom = createBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

import Card from './../Card';
import Login from './../Login';
import Register from './../Register';

function CustomHeader() {
    const navigation = useNavigation();

    const handleLinkPress = (screenName) => {
        navigation.navigate(screenName);
      };

    return (
        <View style={styles.header}>
            <View style={styles.logoColumn}>
            {/* Logo */}
            {/* <Image source={logo} style={styles.logo} /> */}
            </View>
            <View style={styles.column}>
                {/* Second link */}
                <Text style={styles.link} onPress={() => handleLinkPress('Home')}>
                    Home
                </Text>
                <Text style={styles.link} onPress={() => handleLinkPress('Login')}>
                    Login
                </Text>
                <Text style={styles.link} onPress={() => handleLinkPress('Register')}>
                    Register
                </Text>
            </View>
        </View>
    );
  }

function WebNavigation(){
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ header: (props) => <CustomHeader {...props} /> }}>
            <Stack.Screen name="Home" component={Card} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default WebNavigation