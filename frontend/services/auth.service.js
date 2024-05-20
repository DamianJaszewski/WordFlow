import http from "../http-common";
import AsyncStorage from '@react-native-async-storage/async-storage';

const register = data => {
    return http.post("/register", {
        "userName": data.userName,
        "email": data.email,
        "password": data.password
    });
};

const login = async data => {
    const response = await http.post("/login", {
        "userName": "",
        "email": data.email,
        "password": data.password
    });

    debugger;
    // Get token from response
    const token = response.data;
    AsyncStorage.setItem('jwtToken', token.accessToken);
    return token; 
};

const AuthService = {
    login,
    register
};

export default AuthService;