import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Language from './Language'
import Terms from './Terms';
import Settings from './Setting';

const Stack = createStackNavigator();


const SettingNavigator = () => {
    return (
   
        <Stack.Navigator>
          <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}} />
          <Stack.Screen name="Language" component={Language} options={{headerTitle: 'Language'}} />
          <Stack.Screen name="Terms & Conditions" component={Terms} options={{headerTitle: 'Terms & Conditions'}}/>
        </Stack.Navigator>

    );
  };
  
  export default SettingNavigator;