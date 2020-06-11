import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

const getStoragedToken = async () => {
      const value = await AsyncStorage.getItem('@token')
      return value;
  }

const url = (endpoint) =>{
    var apiURL = 'https://mumincarpark.herokuapp.com/api/v2' + endpoint;
    return apiURL;
}

const Login = (data) => {
    var apiURL = url("/users/authenticate")
    return axios.post(apiURL,data).then(res =>res)
    .catch(err =>console.log("Hata Alındı =>", err));
}

const Register = (data) => {
    var apiURL = url("/users/driver-sign-up");
    return axios.post(apiURL,data).then(res =>res.status)
    .catch(err =>console.log("Hata Alındı =>", err));
}

const Reservation = async (data) => {
    var token = await getStoragedToken();
    let header ={
        headers: {
            "Authorization" :"Bearer " + token
        } 
    }
    var apiURL =url("/reservations");
    return axios.post(apiURL,data,header).then(res =>res.status)
    .catch(err => console.log("REZERVASYON HATALI => ", err))
}

const getParkingLots = async () => {
    var token = await getStoragedToken();
    var apiURL = url("/parkinglots")
    let header ={
        headers: {
            "Authorization" :"Bearer " + token
        } 
    }

    return axios.get(apiURL,header)
    .then(res =>res.data)
    .catch(err =>console.log("Parking Lots Doesn't getted =>", err));
}
export {
    Login,Register,getParkingLots,Reservation
}