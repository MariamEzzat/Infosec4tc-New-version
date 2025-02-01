import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert,SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TermsIcon from '../../images/Terms';
import LanguageIcon from '../../images/Language';
import NotificationsIcon from '../../images/NotificationSetting'
import LogoutIcon from '../../images/Logout'
import WriteIcon from '../../images/writeIcon'
import ForwardIcon from '../../images/Foward'
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import Language from './Language'
import Terms from './Terms';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../../UserContext'


const Settings = () => {
    //const { username, setUsername } = useUser();  // Get username and setUsername from context

   // console.log("check: ",username)
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const navigation = useNavigation();

    const handleToggleNotifications = async () => {
        const newState = !notificationsEnabled;
        setNotificationsEnabled(newState);

        if (newState) {
            await requestNotificationPermission();
        } else {
            disablePushNotifications();
        }
    };

    const requestNotificationPermission = async () => {
        try {
            const authStatus = await messaging.requestNotificationPermission();
            const isAuth = authStatus == messaging.AuthorizationStatus.AUTHORIZED || authStatus == messaging.AuthorizationStatus.NOT_DETERMINED;

            if (isAuth) {
                console.log('Notification permission granted.');
                await getToken(); // Register device for notifications

            }
            else {
                console.log("Authenticaion is denied");
                setNotificationsEnabled(false);
            }

        }
        catch (error) {
            console.log("Authentcation Error");
            setNotificationsEnabled(false);
        }
    }

    const getToken = async() => {
        try{
            const token = await messaging.getToken();
            console.log('FCM Token:', token);
        }
        catch(error){
            console.log("Token failed")
        }
    }

    const disablePushNotifications=()=>{
        setNotificationsEnabled(false);
    }

const handleLogOut = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', onPress: () => auth().signOut()},
    ]);
    
};

useEffect(() => {
    // Handle notifications when the app is in the foreground 
    const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
      console.log('A new notification arrived:', remoteMessage);
       Alert.alert('Notification Received', JSON.stringify(remoteMessage.notification));
    });

    // Handle notifications when the app is in the background or killed
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification caused app to open from background:', remoteMessage);
    });
   // Handle App opened after being completely killed because of a notification.
    const checkInitialNotification = async () => {
      const initialNotification = await messaging().getInitialNotification();
      if (initialNotification) {
        console.log('Notification caused app to open from quit state:', initialNotification);
      }
    };

    checkInitialNotification();

    //Listeners(onMessage and onNotificationOpenedApp) should be unsubscribed when the component unmounts to prevent memory leaks.

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpened();
    };

  }, []);

return (
    <LinearGradient
        colors={['#F1F0F0', '#F1EEEE', '#F0EAEA', '#F0E5E5', '#F0E5E6']} // Gradual shades of light gray
        locations={[0, 0.25, 0.5, 0.75, 1]} // Control the spread of each color
        start={{ x: 0.5, y: 0.5 }} // Center of the gradient
        end={{ x: 1, y: 1 }} // Gradual fade
        style={styles.container}
    >
        <SafeAreaView style={styles.container}>
            <View style={styles.headercontent}>
                {/* <Text style={styles.header}>Hello {username}</Text> */}

                <WriteIcon style={styles.profileIcon} />

            </View>

            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('Language')}>
                <View style={styles.itemContent}>
                    <LanguageIcon />
                    <Text style={styles.itemText}>Language</Text>
                    <ForwardIcon style={styles.forwardlanguageIcon} />
                </View>
            </TouchableOpacity>

            <View style={styles.item}>
                <View style={styles.itemContent}>
                    <NotificationsIcon />
                    <Text style={styles.itemText}>Notifications</Text>
                </View>
                <Switch value={notificationsEnabled} onValueChange={handleToggleNotifications} />
            </View>

            <TouchableOpacity style={styles.item}   onPress={() => navigation.navigate('Terms & Conditions')}>        
                <View style={styles.itemContent}>
                    <TermsIcon />
                    <Text style={styles.itemText}>Terms & Conditions</Text>
                    <ForwardIcon style={styles.forwardTermIcon} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.item, styles.logOut]} onPress={handleLogOut}>
                <View style={styles.itemContent}>
                    <LogoutIcon style={styles.LogoutIcon} />
                    <Text style={[styles.itemText, styles.logOutText]}>Log Out</Text>
                </View>
            </TouchableOpacity>
       
        </SafeAreaView>
        </LinearGradient>
     );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 40,
    },
    header: {
        fontSize: 20,
        fontWeight: '#400',
    },
    profileIcon: {
        alignSelf: 'flex-end',
        height: 43,
        width: 43
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Ensures space between left and right icons
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#131313'
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#000',
    },
    logOut: {
        borderBottomWidth: 0, // Remove bottom border for the last item

    },
    logOutText: {
        color: '#CB1C00',
    },
    forwardTermIcon: {
        marginLeft: 110,
        height: 30,
        width: 30
    },
    forwardlanguageIcon: {
        marginLeft: 220,
    },
    LogoutIcon: {
        height: 30,
        width: 30
    },
    headercontent: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Ensures space between left and right icons
        alignItems: 'center',
        marginRight: -15,
        marginTop: -40,
        marginBottom: 40
    }
});

export default Settings;
