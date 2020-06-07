import axios from 'axios'

const url = (endpoint) =>{
    var apiURL = 'https://mumincarpark.herokuapp.com/api/v2' + endpoint;
    return apiURL;
}

const Login = (data) => {

    // var tryData ={
    //     password: "test",
    //     email: "test"
    //     };
    var apiURL = url("/users/authenticate")
    console.log("POST DATA => ", data);
    console.log("POST URL  => ", apiURL);
    return axios.post(apiURL,data).then(res =>res)
    .catch(err =>       console.log("***************************************") );


// AUTHENTICE Kapısını kullan
}


export {
    Login
}