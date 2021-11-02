import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import { Map } from '../components/Map';

import busApi from "../api/busApi";

export const MapUserScreen = () => {

    const [listMarker, setListMarker] = useState<any>([]);

    const getListMarker = async () => {
        const resp = await busApi.get('/stopBus');
        const detail = resp.data.stopBus[0].detail;
        const title = resp.data.stopBus[0].route.name;
        const marks = detail.map((m: any) => ({
            title: title,
            latlng: {
                latitude: m.latitude,
                longitude: m.longitude,
            },

            description: m.name,
            identifier: m._id,
            key: m._id
            
        }));
      
        setListMarker(marks);

    }

    useEffect(() => {
        getListMarker();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Map markers={listMarker} />
        </View>
    )
}
