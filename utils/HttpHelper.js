import axios from 'axios'

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
    var apiURL = url("/users/driver-sign-up")
    return axios.post(apiURL,data).then(res =>res.status)
    .catch(err =>console.log("Hata Alındı =>", err));
}

const getParkingLots = () => {
    var apiURL = url("/parkinglots")
    let header ={
        headers: {
            "Authorization" :"Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0Iiwicm9sZXMiOlt7ImF1dGhvcml0eSI6IlJPTEVfRFJJVkVSIn1dLCJleHAiOjE1OTE5MDE4MzIsImlhdCI6MTU5MTg4MzgzMn0.Ixze1ZgRoWjioIBnUT0HtuhY1GvUeRoiCKz30dGl9QRVCaci-6cksKW2SW_g8x_xe5Whws2Ih7LBIR0rHXcp1g"
        } 
    }

    return axios.get(apiURL,header)
    .then(res =>res.data)
    .catch(err =>console.log("Parking Lots Doesn't getted =>", err));
}
export {
    Login,Register,getParkingLots
}