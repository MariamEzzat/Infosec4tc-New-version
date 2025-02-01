import React, { useState, useEffect } from 'react';
import {   SafeAreaView,ScrollView, View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import NotificationIcon from '../../images/notification.svg';
import { FontFamily } from '../../utils/GlobalStyles';
import { incrementProgress } from '../../../progressService';
import Svg, { Ellipse, Defs, RadialGradient, Stop } from 'react-native-svg';


const Notifications = ({ route }) => {
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();

  let notificationRef = firestore().collection('NotificationsList');

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    try {
      const snapshot = await notificationRef.get();
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id, // Add the document ID here
        ...doc.data(),
      }));
      setNotifications(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const notificationPressed = async (notification) => {
    try {
      switch (notification.type) {
        case 'news':
          console.log('Link: ' + notification.link);
          navigation.navigate('News', { link: notification.link });
          await incrementProgress('articles');
          break;
  
        case 'test':
          navigation.navigate('Quiz');
          await incrementProgress('tests');
          break;
  
        default:
          console.log('Unknown notification type:', notification.type);
          break;
      }
    } catch (error) {
      console.error('Error handling notification press:', error);
    }
  };
  

  const NotificationItem = ({ item }) => {
    return (
 
      <View style={styles.notificationCard}>
        <View style={styles.notificationHeader}>
          <View style={styles.imageView}>
            <NotificationIcon style={styles.imageIcon} />
          </View>
          <Text style={styles.notificationTitle}>{item.title}</Text>
        </View>
        <View style={styles.notificationContent}>
          <Text style={styles.notificationBody}>{item.body}</Text>
        </View>
      </View>
    
    );
  };

  return (
        <SafeAreaView style={styles.container}>


      <ScrollView>
        <Text style={styles.header}>Notifications</Text>

        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()} // Ensures unique keys
          renderItem={({ item }) => {
            const handlePress = () => notificationPressed(item);
            return (
              <TouchableOpacity onPress={handlePress}>
                <NotificationItem item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>

    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    fontSize: 20,
    color: '#131313',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  notificationCard: {
    shadowRadius: 30,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    flex: 1,
    width: 345,
    height: 176,
    marginLeft: 25,
    marginBottom: 16,
    marginTop: 15,
  },
  imageIcon: {
    flex: 1,
    width: '100%',
    height: 47,
  },
  imageView: {
    width: 47,
    height: 47,
    borderRadius: 25,
    backgroundColor: '#FFECEC',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginLeft: 10,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    margintop: 32,
    marginLeft: 13,
  },
  notificationBody: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: FontFamily.interRegular,
    color: '#131313',
    textAlign: 'left',
    marginLeft: 29,
    marginTop: 10,
  },
  notificationTitle: {
    marginTop: 9,
    fontSize: 15,
    fontWeight: '500',
    color: '#131313',
    flexShrink: 1,
  },
  eclipse:{
  
    marginTop: -50, // Position the ellipse higher

    
  }
});
