import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// const TabBottom = createBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

import Card from './../Card';
import Login from './../Login';

function CustomHeader() {
    const navigation = useNavigation();

    const handleLinkPress = (screenName) => {
        navigation.navigate(screenName);
      };

    return (
        <View style={styles.header}>
        {/* Logo */}
        {/* <Image source={logo} style={styles.logo} /> */}
        {/* Navigation links */}
        <Text style={styles.link} onPress={() => handleLinkPress('Home')}>
          Home
        </Text>
        <Text style={styles.link} onPress={() => handleLinkPress('Login')}>
          Login
        </Text>
        {/* <Text style={styles.link} onPress={() => handleLinkPress('Services')}>
          Register
        </Text> */}
      </View>
    );
  }

function WebNavigation(){
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ header: (props) => <CustomHeader {...props} /> }}>
            <Stack.Screen name="Home" component={Card} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'right',
      padding: 16,
      backgroundColor: '#333', // Background color for the header
    },
    logo: {
      width: 100,
      height: 40,
      marginRight: 'auto', // Push the logo to the right side
    },
    link: {
      color: 'white',
      marginLeft: 16,
    },
  });

export default WebNavigation