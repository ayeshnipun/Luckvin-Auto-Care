import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { fb } from '../../../firebaseConfig/config'
import WelcomeScreen from '../WelcomeScreen';

export default class Profile extends Component {
	logOut = () => {
		fb.auth().signOut().then(() => {
			console.log('Logged out');
			return (
				<WelcomeScreen/>
			);
		}).catch(err => {
			console.log('Error', err);
		});
	}

	render() {
		return (
			<View>
				<Text> textInComponent </Text>
				<Button
					title="Logout"
					onPress={this.logOut}
				/>
			</View>
		)
	}
}
