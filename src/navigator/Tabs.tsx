import React from 'react';
import { TypeUserScreen } from '../screens/TypeUserScreen';
import { StackNavigator } from './StackNavigator';
import { Colores } from '../themes/appTheme';
import { Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { TopTab } from './TopTab';
import { LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
LogBox.ignoreLogs(['Reanimated 2'])
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const BtnTabIOS = createBottomTabNavigator();

export const Tabs = () => {
    return Platform.OS == 'ios'
            ? <TabsIOS />
            : <TabsAndroid />
}



const BtnTabAndroid = createMaterialBottomTabNavigator();


function TabsAndroid() {
  return (
    <BtnTabAndroid.Navigator
        sceneAnimationEnabled={ true }
       barStyle={{
           backgroundColor: Colores.primary
       }}

       screenOptions={ ({route}) => ({
        tabBarIcon: ({color, focused}) => {
            let iconName: string = '';
            switch (route.name) {
                case 'TypeUserScreen':
                    iconName= 'T1';
                break;
                case 'StackNavigator':
                    iconName= 'St';
                break;
            }
            return <Icon name="bus" size={20} color={ color } />
        }
       })

       }
    >
      <BtnTabAndroid.Screen name="TypeUserScreen" component={ TopTab } />
      <BtnTabAndroid.Screen name="Horario" component={ StackNavigator } />
    </BtnTabAndroid.Navigator>
  );
}

const TabsIOS = () => {
  return (
    <BtnTabIOS.Navigator
        sceneContainerStyle={{
            backgroundColor: 'white'
        }}
        tabBarOptions={{
            activeTintColor: Colores.primary,
            style: {
                borderTopWidth: 0,
                elevation: 0
            },
            labelStyle:{
                fontSize: 15
            }
        }}

       screenOptions={ ({route}) => ({
        tabBarIcon: ({color, focused, size}) => {
            let iconName: string = '';
            switch (route.name) {
                case 'TypeUserScreen':
                    iconName= 'T1';
                break;
                case 'StackNavigator':
                    iconName= 'St';
                break;
            }
            return <Text style={{ color }} >{ iconName }</Text>
        }
       })

       }
    >
      <BtnTabIOS.Screen name="TypeUserScreen" component={ TopTab } />
      <BtnTabIOS.Screen name="StackNavigator" component={ StackNavigator } />
    </BtnTabIOS.Navigator>
  );
}