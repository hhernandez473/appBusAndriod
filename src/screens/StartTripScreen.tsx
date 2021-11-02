import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native';

import MapboxNavigation from '@homee/react-native-mapbox-navigation';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/UserStackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'StartTripScreen'> { };

export const StartTripScreen = ({ route, navigation }: Props) => {
    const { params } = route;
    const { origin, destination} = params;
   

    return (
        <>
            
            <View style={{ flex: 1 }}>
            <Button
                title="Ir al Home"
                onPress={() => navigation.popToTop()}
            />
                <MapboxNavigation
                    origin={[origin.longitude, origin.latitude]}
                    destination={[destination.longitude, destination.latitude]}
                    //shouldSimulateRoute={true}
                    
                    onCancelNavigation={() => navigation.replace('PermissionsScreen')}
                    onArrive={() => {
                        // Called when you arrive at the destination.
                        
                    }}
                />



            </View>

        </>
    )
}
