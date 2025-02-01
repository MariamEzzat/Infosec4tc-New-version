import React, {useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Platform , Image} from 'react-native';
import {WebView} from 'react-native-webview';
import firestore from '@react-native-firebase/firestore';


const News = ({navigation, route}) => {
  const [canGoBack, setCanGoBack] = useState(true);
  const [canGoForward, setCanGoForward] = useState(false);
  const [webLink, setWebLink] = useState('https://www.infosec4tc.com/blog/');
  const webviewRef = useRef();

  const backButtonHandler = () => webviewRef.current?.goBack();

  const link = firestore()
    .collection('news')
    .doc('news')
    .onSnapshot(documentSnapshot => {
      setWebLink(documentSnapshot.data().link);
    });

  const forwardButtonHandler = () => webviewRef.current?.goForward();
  let webViewUrl = route.params?.link ? route.params?.link : webLink;


  return (
    <View style={{flex: 1}}>


      {webViewUrl === null ? (
        <View style={{flex: 1}}>
          <ScrollView>
          </ScrollView>
        </View>
      ) : (
        <WebView
          style={{flex: 1}}
          ref={webviewRef}
          source={{uri: webViewUrl}}
          renderLoading
          cacheEnabled
          onNavigationStateChange={navState => {
            setCanGoBack(navState.canGoBack);
            setCanGoForward(navState.canGoForward);
          }}
        />
      )}

    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  navigationBtn: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {
    minHeight: 40,
    borderTopLeftRadius: 12,
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom:0,
    justifyContent: 'flex-end',
  },
  header: {
    height: 70,
    marginBottom: -12,
    flexDirection: 'row',
    width: '100%',
    // position: 'absolute',
    // top: 0,
    // zIndex: 2,
    backgroundColor: "#fff",
  },
  heading: {flex: 10, justifyContent: 'flex-start', alignItems: 'flex-start',flexDirection: 'row' , right:20,top:20},
});
