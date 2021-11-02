import React from 'react'
import { View, Text } from 'react-native';
import { styles } from '../themes/appTheme';

export const SettingsScreen = () => {
    return (
        <View style={styles.globalMargin}>
            <Text style={styles.title} >
               Settings
            </Text>
        </View>
    )
}
