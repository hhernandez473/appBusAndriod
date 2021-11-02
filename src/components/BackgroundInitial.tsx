import React from 'react'
import { View } from 'react-native';

export const BackgroundInitial = () => {
    return (
        <View 

        style={{
            position: 'absolute',
            backgroundColor: '#17426b',
            top: -310,
            width: 1000,
            height: 1200,
            transform: [
                {
                    rotate: '-70deg'
                }
            ]
        }}
        
        />
     
    )
}
