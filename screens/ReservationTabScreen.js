import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {AuthContext} from '../components/context'
import { IconButton,Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ReservationsScreen from './Reservations';
import TicketScreen from './Ticket';

const Tab = createMaterialTopTabNavigator();

const ProfileScreen = ({navigation}) => {

  return (
    <Tab.Navigator>
        <Tab.Screen name="Fiş" component={TicketScreen} />
        <Tab.Screen name="Rezervasyonlarım" component={ReservationsScreen} />
    </Tab.Navigator>
  );
  };

  export default ProfileScreen;
