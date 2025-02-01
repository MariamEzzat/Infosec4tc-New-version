import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import maincourses from './maincourses';
import detailCourse from './detailCourse';



const coursesstack = createStackNavigator();

const CoursesStack =() => {
  return (

    <coursesstack.Navigator>
      <coursesstack.Screen name="maincourses" component={maincourses} options={{headerShown: false}}  />
      <coursesstack.Screen name="detailCourse" component={detailCourse} options={{headerTitle: ''}} />
    </coursesstack.Navigator>

  );
}
export default CoursesStack;