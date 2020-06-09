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
export {
    Login,Register
}