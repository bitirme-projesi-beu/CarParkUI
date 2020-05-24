import React  from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from './Home';
import ProfileScreen from './Profile';
import ReservationsScreen from './Reservations';


const Tab = createMaterialBottomTabNavigator();
const HomeTabScreen =({navigation}) => {

return (<Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
>
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profil',
        activeColor:'#bababa',
        tabBarColor:'#2E304F',
        tabBarIcon: ({ color }) => (
          <Icon name="md-contact" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Harita',
        tabBarIcon: ({ color }) => (
          <Icon name="md-pin" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Reservations"
      component={ReservationsScreen}
      options={{
        tabBarLabel: 'Rezervasyonlarım',
        tabBarIcon: ({ color }) => (
          <Icon name="md-list" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator> 
)};

  export default HomeTabScreen;