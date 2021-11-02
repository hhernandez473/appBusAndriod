import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { styles } from '../themes/appTheme';
import { RootStackParams } from '../navigator/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'TicketPriceScreen'>{};

export const TicketPriceScreen = ( { route, navigation }: Props ) => {
    const { params } = route;

    useEffect ( () => {
        navigation.setOptions({
            title: params.route
        })
     }, []);
    
    return (
        <View style={styles.globalMargin}>
            <Text style={ styles.title } >
                {
                    JSON.stringify(params, null, 3)
                }
            </Text>
        </View>
    )
}
 