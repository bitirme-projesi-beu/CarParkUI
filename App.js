import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import RootStackScreen from '../CarParkUI/screens/RootStackScreen';
import { AuthContext } from '../CarParkUI/components/context'
import HomeTabScreen from '../CarParkUI/screens/HomeTabScreen';
import * as Http from '../CarParkUI/utils/HttpHelper';
import AsyncStorage from '@react-native-community/async-storage';



const App = () => {
  const [isLoading,setIsLoading] = React.useState(true);
  const [userToken,setUserToken] = React.useState(null);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@token', value);
    } catch (e) {
    }
  }

  const storeUserJSON = async (value) => {
    console.log("USER JSON => ",value);
  }

  const waitForSec = async () => {
    setTimeout(() => {
      setIsLoading(false);
    },1000);
  }
  const authContext = React.useMemo(() =>({
    signIn: async (data) => {
      console.log("signIn Method RUNNING", data);      
      Http.Login(data).then(res =>{
        if(res.status===200){
          storeUserJSON(res);
          return res.data;}
      })
      .then(data=> {
        setUserToken(data);
        storeData(data);
        setIsLoading(true);
        waitForSec();
      })
      .catch(err => alert("Yanlış Giriş bilgileri", err))
      setIsLoading(false);
    },
    signOut:async () => {
      await AsyncStorage.removeItem('@token');
      setUserToken(null);
      setIsLoading(false);
    },
    signUp:async (data) => {
      console.log("signUp Method RUNNING");      
      return Http.Register(data).then(res =>{
        if(res===201){
        }
        else {
          alert("hatalı bilgi girişi")
        }
        return res;      
      })
      .catch(err =>alert("Böyle bir üyelik var"))
    },
    catchAsyncToken:async () =>{
      const value = await AsyncStorage.getItem('@token')
      if(value !== null){
        setUserToken(value);
        setIsLoading(true);
        waitForSec();
      }
      
      console.log("ASYNC ITEM => ", value);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    },0);
  }, []);

  if(isLoading){
    return(
      <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      {userToken === null ? (
      <RootStackScreen/>) :    
      <HomeTabScreen/> 
  }
    </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
