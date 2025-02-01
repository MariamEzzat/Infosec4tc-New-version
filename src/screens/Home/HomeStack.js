import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Profile/index'
import HomeScreen from '../Home/HomeScreen'


const NewStack = createStackNavigator();

const HomeStack=()=> {
  return (

    <NewStack.Navigator>
    <NewStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    <NewStack.Screen name="Profile" component={Profile} options={{ headerTitle: 'Profile'}} />
  </NewStack.Navigator>

  );
}

export default HomeStack;
