import React, { createContext, useEffect, useState } from "react";
import { AppState } from "react-native";
import { check, openSettings, PERMISSIONS, PermissionStatus, request } from "react-native-permissions";

export interface PermissionState {
    locationStatus: PermissionStatus
}

export const permissionInitState: PermissionState = {
    locationStatus: 'unavailable',
}

type PermissionContextProps = {
    permissions: PermissionState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

export const PermissionContext = createContext({} as PermissionContextProps);


export const PermissionProvider = ({ children }: any) => {

    const [permissions, setPermission] = useState(permissionInitState)

    useEffect(() => {
        AppState.addEventListener('change', state =>{
          if(state !== 'active') return;

          checkLocationPermission();
        })
    }, [])

    const askLocationPermission = async() => {
        let permissionStatus: PermissionStatus;
        permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if(permissionStatus === 'blocked'){
            openSettings();
        }
        setPermission({
            ...permissions,
            locationStatus: permissionStatus
        })
    }

    const checkLocationPermission = async() => {
        let permissionStatus: PermissionStatus;
        permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        
        setPermission({
            ...permissions,
            locationStatus: permissionStatus
        })
    }
    
    return (
        <PermissionContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission
        }}>
            {children}
        </PermissionContext.Provider>
    )
}