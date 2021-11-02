import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://appbus-backend.herokuapp.com/api';

const busApi = axios.create( { baseURL });

busApi.interceptors.request.use(
    async(config) =>{
        const token = await AsyncStorage.getItem('token');
        if(token) {
            config.headers['x-token'] = token;
        }

        return config;
    }
)

export default busApi;