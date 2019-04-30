import React from 'react';
import { Text, View, YellowBox } from 'react-native';
import { fb } from './firebaseConfig/config';
import NetInfo from "@react-native-community/netinfo";

import WelcomeScreen from './Views/Screens/WelcomeScreen/WelcomeScreen';
import Drawer from './Views/Screens/Drawer';
import Location from './Views/Screens/MainWindows/Location/Location';
import Profile from './Views/Screens/MainWindows/Profile/Profile';
class App extends React.Component {
	constructor(props) {
		super(props);
		YellowBox.ignoreWarnings(['Setting a timer']);
		this.state = {
			//make this signup state false after editing profile.js
			signupState: false,
			email: '',
			password: '',
			user: null
		};
	}

	componentDidMount() {
		NetInfo.isConnected.fetch().then(isConnected => {
			console.log("status", isConnected);			
			if (isConnected) {
				// this.getUser()
				if (!this.state.user) {					
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
			}else {
				alert("Check your connection.")
			}
		});
	}

	render() {
		if (!this.state.signupState) {
			return (
				<View style={{ flex: 1 }}>
					{/* <Test /> */}
					{/* <Profile/> */}
					{/* <Vehicles/> */}
					{/* <Location /> */}
					<WelcomeScreen />
				</View>
			);
		} else {
			return (
				<View style={{ flex: 1 }}>
					{/* <KeepAwake></KeepAwake> */}
					{/* <Text style={{color: "red"}}>dhfhgcgcghchgsdf</Text> */}
					{/* <Location /> */}
					<Drawer user={this.state.user} />
				</View>
			);
		}
	}
}


export default App;