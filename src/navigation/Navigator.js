import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from '../screens/Home/HomeStack';
import LoginScreen from '../screens/Authentication/Login';
import Bookmark from '../screens/Bookmark/Bookmark';
import Courses from '../screens/Courses/coursesStack'
import Notifications from '../screens/Notifications/NotificationsStack'
import AchivementsIcon from '../images/AchivementsIcon'
import BookmarkIcon from '../images/BookmarkIcon'
import CoursesIcon from '../images/CoursesIcon'
import NotificationIcon from '../images/NotificationIcon'
import ProfileIcon from '../images/ProfileIcon'
import Settings from '../screens/Setting/SettingNavigator';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomIcon = ({ routeName, color, size, focused }) => {
  const svgIcons = {
    HomeStack: AchivementsIcon,
    Bookmark: BookmarkIcon,
    Courses: CoursesIcon,
    Notifications: NotificationIcon,
    Settings: ProfileIcon
  };

  const SelectedIcon = svgIcons[routeName];

  if (!SelectedIcon) return null;

  return (
    <View style={styles.iconContainer}>
      {focused && <View style={styles.redCircle} />}
      <SelectedIcon width={size} height={size} fill={color} />
    </View>
  );
};



const BottomTabs = ({ route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <CustomIcon routeName={route.name} focused={focused} color={color} size={size} />
        ),

        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false, // Removes the label under the icons
        headerShown: false, // Hides the header for all tabs
        
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="Courses" component={Courses} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Settings" component={Settings}/> 
      <Tab.Screen name="Bookmark" component={Bookmark} />
    </Tab.Navigator>
  );
};

const Navigator = ({ user }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="BottomTabs" component={BottomTabs}/>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};



const styles = StyleSheet.create({
  tabBarStyle: {
    bottom: 20,
    marginLeft: 18,
    marginRight: 18,
    shadowRadius: 20,
    elevation: 10,
    shadowOpacity: 1,
    borderRadius: 46,
    backgroundColor: '#ffffff', // Bright background for modern design
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 0.5,
    borderColor: '#dcdcdc',

  },
  iconContainer: {
    marginTop:30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redCircle: {
    position: 'absolute',
    backgroundColor: '#E43944',
    borderRadius: 28, // Half of 56 to make a perfect circle
    width: 55,
    height: 55,
    zIndex: -1, // Ensures the circle is behind the icon
  },
});

export default Navigator;
