// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

// import WelcomeScreen from './Views/Screens/WelcomeScreen';
// import Location from './Views/Screens/MainWindows/Location';
// // import WelcomeScreen from './Views/Screens/WelcomeScreen'


// export default class App extends Component {

// 	// state = {
// 	// 	region: {
// 	// 		latitude: 6.911168,
//     //         longitude: 79.860848,
//     //         latitudeDelta: 0.0922,
//     //         longitudeDelta: 0.0421
// 	// 	}
// 	// }
// 	render() {
// 		// const {region} = this.state;
// 		return (
// 				// <MapView
// 				// 	provider={PROVIDER_GOOGLE}
// 				// 	region={region}
// 				// 	style={{ flex: 1 }}
// 				// 	showsUserLocation
// 				// 	loadingEnabled
// 				// />
// 				<View style={{flex:1}}>

// 					{/* <WelcomeScreen /> */}
// 					<WelcomeScreen/>
// 				</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#F5FCFF',
// 	},
// 	welcome: {
// 		fontSize: 20,
// 		textAlign: 'center',
// 		margin: 10,
// 	},
// 	instructions: {
// 		textAlign: 'center',
// 		color: '#333333',
// 		marginBottom: 5,
// 	},
// });

import React from 'react';
import { Text, View, YellowBox  } from 'react-native';
import { fb } from './firebaseConfig/config';

import WelcomeScreen from './Views/Screens/WelcomeScreen';
import Navigation from './Views/Screens/Navigation'

class App extends React.Component {

	constructor(props) {
		super(props);
		YellowBox.ignoreWarnings(['Setting a timer']);
		this.state = {
			signupState: false,
			email: '',
			password: '',
			user: null
		};



		// this.ref = fb.firestore().collection('Users');

		// console.log(this.ref.doc.data());
	}

	componentDidMount() {
		fb.auth().onAuthStateChanged(function (user) {
			if (user) {
				// console.log(user);
				this.setState({
					user,
					signupState: true
				});
				// console.log(this.ref.doc.id);
			} else {
				this.setState({
					signupState: false
				});
			}
		}.bind(this));
	}

	render() {
		if (!this.state.signupState) {
			return (
				<View style={{ flex: 1 }}>
					<WelcomeScreen />
				</View>
			);
		} else {
			return (
				<View style={{ flex: 1 }}>
					{/* <KeepAwake></KeepAwake> */}
					{/* <Text style={{color: "red"}}>dhfhgcgcghchgsdf</Text> */}
					<Navigation />
				</View>
			);
		}
	}
}


export default App;