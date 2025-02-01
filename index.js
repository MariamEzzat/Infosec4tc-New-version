import { AppRegistry } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import Navigator from './src/navigation/Navigator';
import SplashScreen from './src/screens/Splash/index';
import { name as appName } from './app.json';
import { NavigationContainer } from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { UserProvider } from './UserContext'

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const firebaseConfig = {
  apiKey: "AIzaSyDUH6IEOdBbOHXHomiS8oRvEkEhE2eC2pU",
  authDomain: "infosec4tc-f40d4.firebaseapp.com",
  projectId: "infosec4tc-f40d4",
  storageBucket: "infosec4tc-f40d4.appspot.com",
  messagingSenderId: "633010889799",
  appId: "1:633010889799:android:f31519b388cbdc5ed3fd62",
};

const MainApp = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    console.log('Initializing Firebase...');
    if (!firebase.apps.length) {
      console.log('Firebase app not initialized, initializing now...');
      try {
        firebase.initializeApp(firebaseConfig);
        console.log('Firebase initialized successfully.');
      
      
      } catch (error) {
        console.error('Firebase initialization error:', error);
      }
    } else {
      console.log('Firebase app already initialized');
      
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return <SplashScreen />;

  return (

    <NavigationContainer>
      <Navigator user={user} />
    </NavigationContainer>

  );
};

AppRegistry.registerComponent(appName, () => MainApp);
