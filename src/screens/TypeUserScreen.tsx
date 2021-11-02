import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { styles, Colores } from '../themes/appTheme';
import Icon from 'react-native-vector-icons/FontAwesome';

import { BackgroundInitial } from '../components/BackgroundInitial';
interface Props extends StackScreenProps<any, any> { };

export const TypeUserScreen = ({ navigation }: Props) => {
    useEffect(() => {
        console.log("users");

    }, [])
    return (    
        <>
            <BackgroundInitial />
            <View style={{...styles.globalMargin, flex: 1,  justifyContent: 'center'}}>
            <View style={{ flexDirection: 'row', alignContent:'stretch'}}>
                <TouchableOpacity
                    style={{
                        ...styles.btnBig,
                        backgroundColor: '#dedede',
                        width: '100%'
                    }}
                    onPress={() => navigation.navigate('TopTab')}
                >
                    <Icon name="user" size={50}  />
                    <Text style={styles.btnBigText}> Pasajero</Text>

                </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', alignContent:'stretch', marginTop: 20 }}>
                <TouchableOpacity
                    style={{
                        ...styles.btnBig,
                        backgroundColor: '#dedede',
                        width: '100%'
                    }}
                    onPress={() => navigation.replace('LoginScreen')}
                >
                    <Icon name="bus" size={40}  />
                    <Text style={styles.btnBigText}> Conductor</Text>

                </TouchableOpacity>

            </View>
        </View>
   
        
        </>
         )
}
