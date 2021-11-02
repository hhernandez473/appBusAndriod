import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, FlatList, StatusBar } from "react-native";
import { Picker } from '@react-native-picker/picker';
import busApi from "../api/busApi";
import Icon from 'react-native-vector-icons/FontAwesome';


export const ScheduleBusScreen = () => {
    const [listSchedule, setListSchedule] = useState([]);
    const [listRoutes, setlistRoutes] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

    const getListRoutes = async () => {
        const resp = await busApi.get('/route');
        setlistRoutes(resp.data.route);
       
        

    }

    useEffect(() => {
        getListRoutes();
      
    }, []);

    const renderSportsList = () => {
        return listRoutes.map((schedule: any) => {
            return <Picker.Item label={schedule.name}
                value={schedule._id} key={schedule._id}  />;
        });
    };

    const showList = async () => {
        const resp = await busApi.get(`/schedule/route/${selectedValue}`);
        setListSchedule(resp.data.detail);

    }

    const ListHeader = () => {
        //View to set in Header
        return (
            <View style={styles.headerFooterStyle}>
                <Text style={styles.textStyle}>Hora Salida     Hora Retorno</Text>
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

        <TouchableOpacity style={styles.item} >
            <Icon style={{ marginLeft: 20 }} name="bus" size={30} color={'grey'} />
            <Text style={{ ...styles.itemStyle, marginLeft: 40 }}>{item.departureTime}</Text>
            <Text style={{ ...styles.itemStyle, marginLeft: 60 }}>{item.returnTime}</Text>
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
            <Text style={styles.emptyListStyle} onPress={() => renderItem(item)}>
                No existen horarios asignados a esta ruta!!!
            </Text>
        );
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.cajaMorada}>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.pickerS}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedValue(itemValue);
                        }}
                    >
                        {renderSportsList()}
                    </Picker>

                </View>
                <View style={styles.cajaNaranja}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btn}
                        onPress={showList}
                    //onPress= { () => navigation.replace('LateralMenu') }
                    >
                        <Text style={styles.btnText}>Búscar</Text>
                    </TouchableOpacity>

                </View>


            </View>
            <SafeAreaView style={styles.container2}>
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

    );
}

const styles = StyleSheet.create({
    container: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    cajaMorada: {
        width: 200,

        height: 70,
        
        borderRadius: 20,
        alignSelf: 'flex-start',
        borderWidth: 1,
        marginVertical: 20
        // top: 100
    },
    cajaNaranja: {
        width: 120,
        marginLeft: 10,
        height: 70,

        backgroundColor: '#28425B',
        borderRadius: 10,
        alignSelf: 'flex-start',
        marginVertical: 20

    },
    pickerS: {
        marginVertical: 5,
        alignSelf: 'center',
        width: 200,
        

    },

    btnText: {
        fontSize: 18,
        color: 'white',
      
    },
    btn: {
        marginTop: 15,
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20
    },
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
