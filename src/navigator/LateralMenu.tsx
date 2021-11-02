import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView } from '@react-navigation/drawer';
//import { StackNavigator } from './StackNavigator';
import { SettingsScreen } from '../screens/SettingsScreen';
import { Image, Text, useWindowDimensions, View, TouchableOpacity } from 'react-native';
import { styles } from '../themes/appTheme';
import { Tabs } from './Tabs';
import { AuthContext } from '../context/AuthContext';


const Drawer = createDrawerNavigator();

export const LateralMenu = () => {

    const { width } = useWindowDimensions();

    return (
        <Drawer.Navigator
            drawerType={width >= 768 ? 'permanent' : 'front'}
            drawerContent={(props) => <HiddenMenu {...props} />}
        >
            <Drawer.Screen name="Tabs" component={Tabs} />
            <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
        </Drawer.Navigator>
    );
}

const HiddenMenu = ( { navigation }: DrawerContentComponentProps<DrawerContentOptions>) => {
    
    const { user, token, logOut} = useContext(AuthContext)

    return (
        <DrawerContentScrollView>
            <View style={styles.avatarContainer}>
                <Image
                    source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                    }}

                    style={styles.avatar}                >

                </Image>
                <Text style= { styles.userText }> {user?.name} </Text>
            </View>

            <View style= { styles.menuContainer }>
                <TouchableOpacity 
                style= { styles.btnMenu } 
                onPress={ () => navigation.navigate('Tabs')}
                >
                    <Text style= { styles.menuText } > Menu</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                style= { styles.btnMenu } 
                onPress={ () => navigation.navigate('SettingsScreen')}
                >
                    <Text style= { styles.menuText } > Settings </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style= { styles.btnMenu } 
                onPress={ logOut }
                >
                    <Text style= { styles.menuText } > Salir </Text>
                </TouchableOpacity>

            </View>
        </DrawerContentScrollView>
    )
}