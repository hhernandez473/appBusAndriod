import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { TypeUserScreen } from '../screens/TypeUserScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoginScreen } from '../screens/LoginScreen';
import { LateralMenu } from './LateralMenu';
import { ProtectedScreen } from '../screens/ProtectedScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import { MapUserScreen } from '../screens/MapUserScreen';
import { PermissionsScreen } from '../screens/PermissionsScreen';
import { TopTab } from './TopTab';
import { StartTripScreen } from '../screens/StartTripScreen';
export type RootStackParams = {
    LoginScreen: undefined,
    TypeUserScreen: undefined,
    LateralMenu: undefined,
    ProtectedScreen: undefined,
    MapUserScreen: undefined,
    PermissionsScreen: undefined,
    TopTab: undefined,
    StartTripScreen: {
        origin: { longitude: number, latitude: number },
        destination: { longitude: number, latitude: number }
    }
}

const Stack = createStackNavigator<RootStackParams>();

export const UserStackNavigator = () => {

    const { status } = useContext(AuthContext)
    console.log(status);

    //if (status === 'checking') return <LoadingScreen />

    return (
        <Stack.Navigator
            //initialRouteName="" me servira para el login
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    elevation: 0,
                    shadowColor: 'transparent'
                },
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            {
                (status !== 'authenticated')
                    ? (
                        <>
                            <Stack.Screen name="TypeUserScreen" component={TypeUserScreen} />
                            <Stack.Screen name="LoginScreen" component={LoginScreen} />
                            <Stack.Screen name="MapUserScreen" component={MapUserScreen} />
                            <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
                            <Stack.Screen name="StartTripScreen" component={StartTripScreen} />

                            <Stack.Screen name="TopTab" component={TopTab} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="LateralMenu" component={LateralMenu} />
                            <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />

                        </>
                    )
            }
        </Stack.Navigator>
    );
}
