import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScheduleBusScreen } from '../screens/ScheduleBusScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colores } from '../themes/appTheme';
import { LogBox, Text } from 'react-native';
import { PermissionsScreen } from '../screens/PermissionsScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StartTripScreen } from '../screens/StartTripScreen';
LogBox.ignoreLogs(['Reanimated 2'])
const Tab = createMaterialTopTabNavigator();

export const  TopTab = () =>  {
    const {top } = useSafeAreaInsets();
  return (
    <Tab.Navigator
        style={{
            paddingTop: top,
        }}

        sceneContainerStyle={{
            
        }}

        tabBarOptions={{
            pressColor: Colores.primary,
            showIcon: true,
            indicatorStyle: {
                backgroundColor: Colores.primary
            },
            style: {
                borderTopWidth: 0,
                shadowColor: 'transparent',
                elevation: 0
            }
        }}

        screenOptions={ ({route}) => ({
            tabBarIcon: ({color, focused}) => {
                let iconName: string = '';
                switch (route.name) {
                    case 'Paradas de Bus':
                        iconName= 'map-marker';
                    break;
                    case 'Horarios':
                        iconName= 'calendar';
                    break;
                    
                }
                return <Icon name={iconName} size={20} color={ color } />
            }
           })
    
           }
    >
      <Tab.Screen name="Paradas de Bus" component={
          PermissionsScreen
      }   />
      <Tab.Screen name="Horarios" component={ScheduleBusScreen} />
      
    </Tab.Navigator>
  );
}