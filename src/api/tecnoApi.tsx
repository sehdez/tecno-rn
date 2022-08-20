import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrlDevelopment = 'http://192.168.8.5:3000/api';
const baseURL = 'https://tecno-back.herokuapp.com/api'

const tecnoApi = axios.create({ baseURL })

tecnoApi.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if ( token ){
            config.headers = {'x-token':token};
        }

        return config
    }
)

export default tecnoApi;