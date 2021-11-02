import { DrawerScreenProps } from '@react-navigation/drawer';
//import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles, Colores } from '../themes/appTheme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../context/AuthContext';
import busApi from '../api/busApi';
//interface Props extends StackScreenProps<any, any>{};
interface Props extends DrawerScreenProps<any, any> { };
export const ScheduleDriverScreen = ({ navigation }: Props) => {
    const { user } = useContext(AuthContext);
    const [listSchedule, setListSchedule] = useState([]);
    const [routeAssigned, setRouteAssigned]= useState("");
    useEffect(() => {
        showHeaderLeft();
    }, []);

    const showHeaderLeft = () =>{
        navigation.setOptions({
            headerLeft: () => (
                // <Button 
                //     title='Profile'
                //     onPress={ () => navigation.toggleDrawer()}
                // />
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Icon name="bars"
                        color={Colores.secondary}
                        size={35}
                    />
                </TouchableOpacity>
            )
        });
        showList();
    }

    const showList = async () => {
        const resp = await busApi.get(`/schedule/driver/${user?.uid}`);
        setListSchedule(resp.data.detail);
        setRouteAssigned(resp.data.route.name);

    }


    const ListHeader = () => {
        //View to set in Header
        return (
            <View style={styles2.headerFooterStyle}>
                <Text style={styles2.textStyle}>Hora Salida     Hora Retorno</Text>
            </View>
        );
    };

    const ListFooter = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };



    const renderItem = ({ item }: any) => (

        <TouchableOpacity style={styles2.item} >
            <Icon style={{ marginLeft: 20 }} name="bus" size={30} color={'grey'} />
            <Text style={{ ...styles2.itemStyle, marginLeft: 40 }}>{item.departureTime}</Text>
            <Text style={{ ...styles2.itemStyle, marginLeft: 60 }}>{item.returnTime}</Text>
        </TouchableOpacity>

    );

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const EmptyListMessage = ({ item }: any) => {
        return (
            // Flat List Item
            <Text style={styles2.emptyListStyle} onPress={() => renderItem(item)}>
                No existen horarios asignados a esta ruta!!!
            </Text>
        );
    };

    return (
        < >
            {/* <Text style={ styles.title }> {user?.name} {user?.uid} </Text>
            <Button 
                title="Horario"
                onPress = { () => navigation.navigate('ScheduleScreen')}
            /> */}
            <Text style={ {...styles.title, textAlign:'center'} }> Ruta: {routeAssigned}</Text>
            <SafeAreaView style={styles2.container2}>
                <FlatList

                    data={listSchedule}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={renderItem}
                    ListHeaderComponent={ListHeader}
                    ListFooterComponent={ListFooter}
                    ListEmptyComponent={EmptyListMessage}

                />
            </SafeAreaView>
        </>
    )
}


const styles2 = StyleSheet.create({

    container2: {
        flex: 1,


    },
    emptyListStyle: {
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
    },
    itemStyle: {
        padding: 10,
        fontSize: 18
    },
    headerFooterStyle: {
        width: '100%',
        height: 45,
        backgroundColor: '#606070',
    },
    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 22,
        padding: 7,
    },
    item: {

        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
});

