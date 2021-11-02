import React, { useContext } from 'react'
import { View, Button, Text, StyleSheet } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';
import { BlackButton } from '../components/BlackButton';
import { PermissionContext } from '../context/PermissionContext';
import { MapUserScreen } from './MapUserScreen';

export const PermissionsScreen = () => {

    const { permissions, askLocationPermission} = useContext(PermissionContext )
    if(permissions.locationStatus =='granted') return <MapUserScreen />
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Es nesesario el uso del GPS para el uso de la aplicación </Text>
            <BlackButton 
                title="Permiso"
                onPress={askLocationPermission}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title:{
        width: 200,
        fontSize: 18, 
        textAlign: 'center',
        marginBottom: 20
    }
})