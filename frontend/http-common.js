import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const token = await AsyncStorage.getItem('jwtToken');

const instance = axios.create({
  baseURL: "https://localhost:7158/",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer " + token
  }
});

export default instance;