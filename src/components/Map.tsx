
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab'
import { useNavigation } from '@react-navigation/native';

interface Props {
    markers?: [];
}




export const Map = ({ markers }: Props) => {
    const navigation = useNavigation();

    const {
        hasLocation,
        initialPosition,
        gerCurrentLocation,
        followUserLocation,
        stopFollowUserLocation,
        routeLines,
        newDriver$,
        busTripStart$,
        userLocation } = useLocation();

    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);

    useEffect(() => {
        followUserLocation();

        return () => {
            stopFollowUserLocation()
        }
    }, [])

    useEffect(() => {
       newDriver$.subscribe( marker2 => {
           console.log(marker2);
       })
    }, [newDriver$])

    useEffect(() => {
        if (!following.current) return;
        const { latitude, longitude } = userLocation;
        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        })
    }, [userLocation]);

    useEffect(() => {
        busTripStart$.subscribe( follow =>{
            console.log(follow);
            console.log("follow");
        })
    }, [busTripStart$])

    const centerPosition = async () => {
        const { latitude, longitude } = await gerCurrentLocation();

        following.current = true;

        mapViewRef.current?.animateCamera({
            center: { latitude, longitude }
        })
    }

    const [showPolyline, setshowPolyline] = useState(true)

    const coordinatesNavigation = (coordinates: any) =>{
        console.log(coordinates);
    }



    if (!hasLocation) {
        return <LoadingScreen />
    }

    return (
        <>
            <MapView
                ref={(el) => mapViewRef.current = el!}
                style={{ flex: 1 }}
                showsUserLocation
                initialRegion={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}

                onTouchStart={() => following.current = false}
            >
                {
                    showPolyline && (
                        <Polyline
                            coordinates={routeLines}
                            strokeColor="black"
                            strokeWidth={3}
                        />
                    )
                }

                {/* <Marker 
                    image={require('../assets/custom-marker.png')}
                    coordinate= {{
                        latitude: 37.78825,
                        longitude: -122.4324
                    }}
                    title= "hola"
                    description="esta es una prueba"
                /> */}

                {
                    (markers) &&
                    markers!.map((marker: any) => (
                        <Marker
                            key={marker.identifier}
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                            onPress= { () =>navigation.navigate('StartTripScreen', {
                                origin: {
                                    longitude: userLocation.longitude,
                                    latitude: userLocation.latitude
                                },
                                destination: {
                                    longitude: marker.latlng.longitude,
                                    latitude: marker.latlng.latitude
                                }
                            })} 
                        />
                    ))
                }

               

            </MapView>
            <Fab
                iconName="compass"
                onPress={centerPosition}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20
                }}
            />
            <Fab
                iconName="paint-brush"
                onPress={() => setshowPolyline(!showPolyline)}
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 20,

                }}
            />
        </>
    )
}
