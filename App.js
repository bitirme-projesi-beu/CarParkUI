/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
import Icon from 'react-native-vector-icons/Ionicons';
import RootStackScreen from '../CarParkUI/screens/RootStackScreen';
import { AuthContext } from '../CarParkUI/components/context'
import HomeTabScreen from '../CarParkUI/screens/HomeTabScreen';

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
    },200);
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
      <RootStackScreen/>) :        <HomeTabScreen/> 
  }
    
    </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
