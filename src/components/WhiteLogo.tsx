import React from 'react'
import { Image, View } from 'react-native';

export const WhiteLogo = () => {
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <Image 
            source={ require('../assets/bus4.png')}
            style={{
                top: 20,
                width: 100,
                height: 125
            }}
            />
        </View>
    )
}
