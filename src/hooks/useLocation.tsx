import Geolocation from '@react-native-community/geolocation';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Location } from '../interfaces/appInterfaces';
import { Subject } from 'rxjs';
export const useLocation = () => {
    const { user } = useContext(AuthContext);
    const [hasLocation, setHasLocation] = useState(false);
    const [routeLines, seRouteLines] = useState<Location[]>([]);

    const [initialPosition, setinitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0
    });

    const [userLocation, setUserLocation] = useState<Location>({
        latitude: 0,
        longitude: 0
    });


    const watchId = useRef<number>();
    const isMounted = useRef(true);

    const newDriver = useRef(new Subject());
    const busTripStart = useRef(new Subject());
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        gerCurrentLocation().then(location => {
            if (!isMounted.current) return;

            setinitialPosition(location);
            setUserLocation(location);
            seRouteLines(routes => [...routes, location]);
            setHasLocation(true);
            //si el marcador tiene id no emitir
            newDriver.current.next({
                id: user?.uid,
                latitude: location.latitude,
                longitude: location.longitude
            });
        })
    }, [])

    const gerCurrentLocation = (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({ coords }) => {

                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });

                },
                (err) => reject({ err }), { enableHighAccuracy: true }
            );
        })
    }

    //follow user real position  
    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(

            ({ coords }) => {
                if (!isMounted.current) return;
                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
                setUserLocation(location);
                seRouteLines(routes => [...routes, location]);
                busTripStart.current.next({
                    id: user?.uid,
                    latitude: location.latitude,
                    longitude: location.longitude
                })
            },
            (err) => console.log(err), { enableHighAccuracy: true, distanceFilter: 10 }
        );
    }

    const stopFollowUserLocation = () => {
        if (watchId.current)
            Geolocation.clearWatch(watchId.current)
    }

    return {
        followUserLocation,
        gerCurrentLocation,
        hasLocation,
        initialPosition,
        stopFollowUserLocation,
        userLocation,
        routeLines,
        newDriver$: newDriver.current,
        busTripStart$: busTripStart.current
    }
}
