import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import EmailIcon from '../../images/group-55.svg';

const   ForgetPassword = () => {
  const [checked, setChecked] = React.useState(false);


  return (
<View style={styles.container}>
      <Image
        style={styles.infosec4tcPng11}
        resizeMode="contain"
        source={require('../../images/infosec4tcPng11.png')}
      />
      
      <View style={styles.tabContainer}>
      <TouchableOpacity
          onPress={() => setActiveTab('SignUp')}
          style={styles.tab}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'SignUp' && styles.activeTabText,
            ]}
          >
            Sign Up
          </Text>
          {activeTab === 'SignUp' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        {/* Login Tab */}
        <TouchableOpacity
          onPress={() => setActiveTab('Login')}
          style={styles.tab}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Login' && styles.activeTabText,
            ]}
          >
            Login
          </Text>
          {activeTab === 'Login' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
        </View>
     
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["#FFFFFF", "#EFEFEF"]}
        style={styles.gradient}
        useAngle={true}
        angle={180}
      >
        {/* Google Login Button */}
        <TouchableOpacity style={styles.googleButton} onPress={() => alert('Button Pressed')}>
          <Image
            source={require('../../images/googleIcon.png')}
            style={styles.Googleimage}
          />
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <UserIcon/>
          <TextInput
            style={styles.textInput}
            placeholder="Your name"
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.inputWrapper}>
          <EmailIcon/>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your Email"
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.inputWrapper}>
          <EmailIcon/>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
          />
        </View>
      <Button mode="contained" style={styles.nextButton}>Next</Button>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F1",
  },
  gradient: {
    flex: 1,
    marginTop: 17,
  },
  infosec4tcPng11: {
    width: 128,
    height: 34,
    marginTop: 58,
    marginBottom: 65,
    marginHorizontal: 23,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: 339,
		height: 50,
		borderColor: "#CECECE",
		marginVertical: 20,
		marginHorizontal: 27,
		borderRadius: 10,
		borderWidth: 1,
  },
  textInput: {
    flex: 1,
    color: "#2D2D2D",
    fontSize: 15,
    marginLeft: 10,
  },
  iconContainer: {
    paddingHorizontal: 5,
  },

});

export default SignUpScreen;
