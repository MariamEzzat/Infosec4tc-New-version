import React from 'react';
import { View, Dimensions, Image, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get('window');

const Splash = () => {
	return (
		<View style={styles.iphone1415Pro6}>
			<Image style={styles.infosec4tcPng11} resizeMode="cover" source={require('../../images/splash2.png')} />
			<Image style={[styles.infosec4tcPng12, styles.iphone1415Position]} resizeMode="cover" source={require('../../images/splash.png')}/>
			<Image style={[styles.iphone1415Pro6Child, styles.iphone1415Position , { tintColor: 'black' }]} resizeMode="cover" source={require('../../images/Vector40.png')} />
			<Image style={[styles.iphone1415Pro6Item, styles.iphone1415Position , { tintColor: 'black' }]} resizeMode="cover" source={require('../../images/Vector41.png')} />
			<Image style={[styles.iphone1415Pro6Inner, styles.iphone1415Position,{ tintColor: 'black' }]} resizeMode="cover" source={require('../../images/Vector42.png')} />
		</View>
	);
};
const styles = StyleSheet.create({
	iphone1415Position: {
		top: "50%",
		left: "50%",
		position: "absolute"
	},
	infosec4tcPng11: {
		marginLeft: -48.5,
		top: 744,
		width: 97,
		height: 34,
		left: "50%",
		position: "absolute"
	},
	infosec4tcPng12: {
		marginTop: -120,
		marginLeft: -88.5,
		width: 178,
		height: 196
	},
	iphone1415Pro6Child: {
		color: "#f1f1f1",
		marginTop: -200,
		marginLeft: -159.5,
		width: 320,
		height: 374,
		opacity: 0.15
	},
	iphone1415Pro6Item: {
		color: "#f1f1f1",
		marginTop: -301,
		marginLeft: -252.5,
		width: 506,
		height: 588,
		opacity: 0.1
	},
	iphone1415Pro6Inner: {
		color: "#f1f1f1",
		marginTop: -417,
		marginLeft: -358.5,
		width: 718,
		height: 834,
		opacity: 0.05
	},
	iphone1415Pro6: {
		backgroundColor:  "#fff",
		flex: 1,
		width: width,  // Dynamically sets the screen width
		height: height, // Dynamically sets the screen height
		overflow: "hidden"
	}
})

export default Splash;