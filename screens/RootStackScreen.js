import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';

import SignInScreen from './SignIn';
import SignUpScreen from './SignUp2';
import SplashScreen from './Splash';

const RootStack = createStackNavigator();
const RootStackScreen = ({navigation}) => {
  return (
        <RootStack.Navigator>
        <RootStack.Screen name="Splash" component={SplashScreen} options={{
          headerBackTitleStyle:{
              backgroundColor:'#fff',
          },
        headerShown:false}}/>
        <RootStack.Screen name="Login" component={SignInScreen} options={{
        headerShown:false}}/>
        <RootStack.Screen name="SignUp" component={SignUpScreen}options={{
        headerShown:false,
        }}/>
      </RootStack.Navigator>
)};

export default RootStackScreen;
