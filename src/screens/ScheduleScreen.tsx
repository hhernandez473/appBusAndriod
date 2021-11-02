import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Button, Text, View, TouchableOpacity } from 'react-native'
import { styles } from '../themes/appTheme';

interface Props extends StackScreenProps<any, any> { };

export const ScheduleScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.globalMargin} >
            <Text style={styles.title} > Schedule </Text>

            <Button
                title="Ir al Home"
                onPress={() => navigation.popToTop()}
            />

            <Text>Navegar con argumentos</Text>
            <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity
                    style={ { 
                        ...styles.btnBig, 
                        backgroundColor: '#FF9427'
                    } }
                    onPress={() => navigation.navigate('TicketPriceScreen', {
                        id: 1,
                        route: 'Tablon'
                    })}
                >
                    <Text style={ styles.btnBigText }>Costo</Text>

                </TouchableOpacity>

            </View>


        </View>
    )
}
