import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// const TabBottom = createBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

import Card from './../Card';
import Login from './../Login';

function MobileNavigation(){
  return (
    <NavigationContainer>
      <TabTop.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: 'white' },
      }}
       tabBarOptions={{
        style: {
          flexDirection: 'row', // Ustawia orientację na poziomą
          justifyContent: 'space-evenly', // Rozłożenie przycisków w odstępach
          backgroundColor: 'lightgrey', // Kolor tła paska nawigacyjnego
        },
      }}
      >
        <Stack.Screen name="Home" component={Card} />
        <Stack.Screen name="Login" component={Login} />
      </TabTop.Navigator>
    </NavigationContainer>
  );
}

export default MobileNavigation