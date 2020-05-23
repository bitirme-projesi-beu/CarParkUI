/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RootStackScreen from '../carpark-ui/screens/RootStackScreen';

import HomeScreen from '../carpark-ui/screens/Home';
import ProfileScreen from '../carpark-ui/screens/Profile';
import ReservationsScreen from '../carpark-ui/screens/Reservations';
import { AuthContext } from '../carpark-ui/components/context'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const App = () => {
  const [isLoading,setIsLoading] = React.useState(true);
  const [userToken,setUserToken] = React.useState(null);

  const authContext = React.useMemo(() =>({
    signIn:() => {
      setUserToken('selam');
      setIsLoading(false);
    },
    signOut:() => {
      setUserToken(null);
      setIsLoading(false);
    },
    signUp:() => {
      setUserToken('selam');
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    },1000);
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
     <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Reservations" component={ReservationsScreen} />
      </Drawer.Navigator> }
    </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
