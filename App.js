// In App.js in a new project

import * as React from 'react';
import { View, Text , TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screen/MapScreen';
import LoginScreen from './screen/LoginScreen';
import NewUserScreen from './screen/NewUserScreen';
import SettingScreen from './screen/SettingScreen';
import StoresListScreen from './screen/StoresListScreen';

// IMPORT ICONS
import Icon from 'react-native-ionicons';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" 
        component={LoginScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              title="Info"
              color="#fff"
              style={{marginRight:10}}>
              <Icon name="settings" />
            </TouchableOpacity>
          ),
        })} />
        <Stack.Screen name="NewUser"
         component={NewUserScreen}
         options={({navigation}) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              title="Info"
              color="#fff"
              style={{marginRight:10}}>
              <Icon name="settings" />
            </TouchableOpacity>
          ),
        })} />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="ListStores"
         component={StoresListScreen}
         options={({navigation}) => ({
          headerBackVisible:false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              title="Info"
              color="#fff"
              style={{marginRight:10}}>
              <Icon name="settings" />
            </TouchableOpacity>
          ),
        })}/>
        <Stack.Screen name="Map" component={MapScreen} options={({ route }) => ({ title: route.params.item.banner + " " + route.params.item.address })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;