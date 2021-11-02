import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScheduleDriverScreen } from '../screens/ScheduleDriverScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { TicketPriceScreen } from '../screens/TicketPriceScreen';

export type RootStackParams = {
    ScheduleDriverScreen: undefined,
    ScheduleScreen: undefined,
    TicketPriceScreen: { id: number, route: string}
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            //initialRouteName="" me servira para el login
            screenOptions={{
                headerStyle :{
                    elevation: 0,
                    shadowColor: 'transparent'
                },
                cardStyle:{
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name="ScheduleDriverScreen"  options={{ title:'Horario Asignado'}} component={ ScheduleDriverScreen } />
            <Stack.Screen name="ScheduleScreen" options={{ title:'Horario Bus'}} component={ ScheduleScreen } />
            <Stack.Screen name="TicketPriceScreen"  component={ TicketPriceScreen } />
        </Stack.Navigator>
    );
}