import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput ,SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';


// Replace with your configured SVG components or use Image as a fallback
import PasswordIcon from '../../images/group-50.svg'; // Ensure SVG setup is correct
import EyeIcon from '../../images/group-51.svg';
import EmailIcon from '../../images/group-55.svg';
import UserIcon from '../../images/group-48.svg';
import { Button, Checkbox } from 'react-native-paper';


const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('')
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [activeTab, setActiveTab] = useState('Login'); // Default to "Login"
  const navigation = useNavigation();
  const [showForgetPassword, setShowForgetPassword] = useState(false);


  GoogleSignin.configure({
    webClientId:
      '633010889799-05b5nolqbe7h2qitulkqbdn0ef39rh7p.apps.googleusercontent.com',
  });


  const onPressSentEmail = async () => {

    await auth().sendPasswordResetEmail(email).then(() => {
      alert('Email sent')
      setEmail('')
    }).catch(err => {
      alert(err)
    })
  }
  const onPresslogin = () => {
    if (email && password) {
      setLoader(true);
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setLoader(false);
          setEmail('');
          setpassword('');
          navigation.navigate('App');
        })
        .catch(error => {
          setLoader(false);
          alert(error.message);
        });
    } else {
      alert('Please fill details');
    }
  };


  const onPressSignUp = async () => {
    let userCreated = false;
    // Regular Expressions for Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email format validation
    const usernameRegex = /^[A-Za-z]+$/; // Allows only letters (uppercase and lowercase)


    // Validate Username
    if (!usernameRegex.test(username)) {
      alert('Username must contain only letters.');
      return;
    }

    // Validate Email
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate Passwords
    if (password !== confirmPassword) {
      alert('Password and Confirm Password must match.');
      return;
    }

    if (password.length < 6) {
      alert('Password length must be at least 6 characters.');
      return;
    }

    // Validate Terms and Conditions
    if (!checked) {
      alert('You must agree to the terms and conditions.');
      return;
    }
    try {
      // Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Update Profile with Username
      await user.updateProfile({
        displayName: username,
      });

      await user.reload(); // Refreshes the user's data

      // Fetch the updated user info
      const updatedUser = auth().currentUser;

      console.log('User account created & signed in:', updatedUser.displayName);

      userCreated = true;
    } catch (error) {
      // Handle Firebase Authentication Errors
      if (error.code === 'auth/email-already-in-use') {
        alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
      } else if (error.code === 'auth/weak-password') {
        alert('Password is too weak!');
      } else {
        console.error('Error creating user:', error);
      }
    }
    if (userCreated) {
      navigation.navigate('Notifications')
    }
  };

  const onGoogleButtonPress = async () => {
  //   try {
  //     // Start Google Sign-In process
  //     const { idToken } = await GoogleSignin.signIn();

  //     // Create a Google credential with the token
  //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //     // Sign-In with Firebase using the Google credential
  //     const userCredential = await auth().signInWithCredential(googleCredential);

  //     console.log('User signed in with Google:', userCredential.user);

  //     return userCredential.user;
  //   } catch (error) {
  //     console.error('Error with Google Sign-In:', error);

  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       alert('Sign-In was cancelled.');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       alert('Sign-In is already in progress.');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       alert('Google Play Services not available.');
  //     } else {
  //       alert('An error occurred during Google Sign-In.');
  //     }
  //   }
   };

  return (
    
    <SafeAreaView style={styles.container}>
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
        colors={['#F1F0F0', '#F1EEEE', '#F0EAEA', '#F0E5E5', '#F0E5E6']}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >


        {activeTab === 'SignUp' ? (
          <View style={styles.rectangleLineargradient}>
            <TouchableOpacity style={styles.googleButton} onPress={onGoogleButtonPress}>
              <Image
                source={require('../../images/googleIcon.png')}
                style={styles.Googleimage}
              />
              <Text style={styles.buttonText}>Login with Google</Text>
            </TouchableOpacity>
            <View style={styles.inputWrapper}>
              <UserIcon />
              <TextInput
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.textInput}
                placeholder="Your name"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputWrapper}>
              <EmailIcon />
              <TextInput
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.textInput}
                placeholder="Enter your Email"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputWrapper}>
              <PasswordIcon />
              <TextInput
                value={password}
                onChangeText={text => setpassword(text)}
                style={styles.textInput}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.iconContainer}
              >
                <EyeIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <PasswordIcon />
              <TextInput
                value={confirmPassword}
                onChangeText={text => setconfirmPassword(text)}
                style={styles.textInput}
                placeholder="Confirm your password"
                secureTextEntry={!showPassword}
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.iconContainer}
              >
                <EyeIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)}
                color="#B71C1C"
                uncheckedIcon="checkbox-blank-outline"
                checkedIcon="checkbox-marked"
                style={styles.checkboxContainer}
              />
              <Text style={styles.checkboxText}>
                By agreeing to the terms and conditions, you are entering
                into a legally binding contract with the service provider.
              </Text>
            </View>

            <Button style={styles.signupbotton} onPress={onPressSignUp}>
              <Text style={styles.buttonSignUpText}>SignUp with Email</Text>
            </Button>
          </View>
        ) : (
          <View style={styles.rectangleLineargradient}>
            {showForgetPassword ? (
              <View>

                <Text style={styles.forgetpassText}>Forgot Password?</Text>
                <Text style={styles.enteremailText}>Enter your email and we will send you a reset link.</Text>
                <View style={styles.inputWrapper}>
                  <EmailIcon />
                  <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.textInput}
                    placeholder="Enter your Email"
                    placeholderTextColor="#aaa"
                  />
                </View>
                <TouchableOpacity onPress={() => { setShowForgetPassword(false) }}> <Text style={styles.backToLogin}>{`<- Back to login`}</Text></TouchableOpacity>

                <Button style={styles.ResetPasswordButton} onPress={onPressSentEmail}>
                  <Text style={styles.buttonLoginText}>Reset Password</Text>
                </Button>

              </View>
            ) : (
              <View style={styles.rectangleLineargradient}>
                <TouchableOpacity style={styles.googleButton} onPress={onGoogleButtonPress}>
                  <Image
                    source={require('../../images/googleIcon.png')}
                    style={styles.Googleimage}
                  />
                  <Text style={styles.buttonText}>Login with Google</Text>
                </TouchableOpacity>
                <View style={styles.inputWrapper}>
                  <EmailIcon />
                  <TextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.textInput}
                    placeholder="Enter your Email"
                    placeholderTextColor="#aaa"
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <PasswordIcon />
                  <TextInput
                    value={password}
                    onChangeText={text => setpassword(text)}
                    style={styles.textInput}
                    placeholder="Enter your Password"
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#aaa"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.iconContainer}
                  >
                    <EyeIcon />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => setShowForgetPassword(!showForgetPassword)}
                  style={styles.ForgetPassword}
                >
                  <Text>Forget password</Text>
                </TouchableOpacity>

                <Button style={styles.LoginButton} onPress={onPresslogin}>
                  <Text style={styles.buttonLoginText}>Login with Email</Text>
                </Button>
              </View>
            )}
          </View>
        )}
      </LinearGradient>
      </SafeAreaView >
  );
}
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
    marginTop: 48,
    marginBottom: 55,
    marginHorizontal: 23,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#CECECE',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 15, // Replaces marginTop and marginBottom
    marginHorizontal: 27,
  },
  textInput: {
    color: "#2D2D2D",
    fontSize: 15,
    marginLeft: 2,
    height: 40,
    width: 339
  },
  iconContainer: {
    paddingHorizontal: 5,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center content horizontally
    backgroundColor: "#131313",
    borderRadius: 10,
    marginTop: 23,
    marginBottom: 13,
    marginHorizontal: 27,
    height: 50,
    width: 339
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "400",
    alignItems: 'center'
  },
  ForgetPassword: {
    marginLeft: 27,
    marginTop: 10,
  },
  LoginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#131313",
    borderRadius: 10,
    marginHorizontal: 27,
    marginTop: 30,
    height: 50,
    width: 339,
  },
  buttonLoginText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: 'center',
  },
  buttonSignUpText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 14,
    width: 339,
    height: 35
  },
  tabWrapper: {
    backgroundColor: '#F5F5F5',
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#B71C1C',
  },
  activeIndicator: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#B71C1C',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 27,
  },
  checkboxText: {
    marginTop: 3,
    marginLeft: 2,
    marginRight: 8,
    color: '#555',
    fontSize: 10
  },
  signupbotton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#131313",
    borderRadius: 10,
    marginLeft: 27,
    marginTop: 30,
    height: 50,
    width: 339,
  },
  forgetpassText: {
    fontSize: 20,
    letterSpacing: 0,
    fontWeight: "500",
    color: "#131313",
    textAlign: "center",
    marginTop: 28,
  },
  enteremailText: {
    fontSize: 12,
    fontWeight: "300",
    letterSpacing: 0,
    color: "#494949",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15
  },
  backToLogin: {
    fontSize: 12,
    letterSpacing: 0,
    fontWeight: "300",
    color: "#494949",
    textAlign: "left",
    marginLeft: 27
  },
  ResetPasswordButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#131313",
    borderRadius: 10,
    marginHorizontal: 27,
    marginTop: 180,
    // paddingVertical: 15, // Adjust height with padding
    height: 50,
    width: 339,
  },
  rectangleLineargradient: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }
});


export default Login;
