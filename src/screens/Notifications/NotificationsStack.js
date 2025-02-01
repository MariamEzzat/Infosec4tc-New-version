import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import News from './News'
import Notifications from './Notifications'
import Quiz from './Quiz'
import QuizResult from './QuizResult'


const NewStack = createStackNavigator();

const NotificationsStack=()=> {
  return (

    <NewStack.Navigator>
    <NewStack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
    <NewStack.Screen name="News" component={News} options={{ headerTitle: '' }} />
    <NewStack.Screen name="Quiz" component={Quiz} options={{ headerTitle: '' }} />
    <NewStack.Screen name="QuizResult" component={QuizResult} options={{headerTitle:''}}/>
  </NewStack.Navigator>

  );
}




export default NotificationsStack;
