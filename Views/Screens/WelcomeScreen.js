// import React, { Component } from 'react'
// import { Text, View, StyleSheet } from 'react-native'

// export default class WelcomeScreen extends Component {
//   render() {
// 	return (
// 	  <View>
// 		<Text> textInComponent </Text>
// 	  </View>
// 	)
//   }
// }

import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/FontAwesome';
import { fb } from '../../firebaseConfig/config';

class WelcomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
			contact: '',
			user: null,
			page: ''
		};
		this.ref = fb.firestore().collection('Users');
		// this.signoutUser();

		// this.signoutUser(); 
	}

	addUser() {
		this.ref.add({
			email: this.state.user.email
		});
	}

	//add users to collection

	//event listner for login button click
	onClickListener = (email, pw) => {
		this.loginUser(email, pw)
	}

	// user login
	loginUser = async (email, pw) => {
		if (email != '' && pw != '') {
			try {
				let user = fb.auth().signInWithEmailAndPassword(email, pw);
				console.log(user);
			} catch (error) {
				console.log(error);
			}
		} else {
			alert('Missing email or password');
		}
	}

	//user signout
	signoutUser = () => {
		fb.auth().signOut().then(() => {
			console.log('Logged out');
		}).catch(err => {
			console.log('Error', err);
		});
	}


	//sign up using email and password 
	async signup(email, pass) {
		try {
			await fb.auth().createUserWithEmailAndPassword(email, pass).then(data => {
				this.ref.doc(data.user.uid).set({
					email: data.user.email,
					name: this.state.name,
					contact: this.state.contact
				});
				// console.log(data.user.uid);
			});
			console.log("Account created");
		} catch (error) {
			console.log(error.toString())
		}
	}

	//fb login
	// async loginWithFb() {
	// 	const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
	// 		'307070559996016',
	// 		{ permissions: ['email', 'public_profile'] } 
	// 	);

	// 	if (type === 'success') {
	// 		const credentials = fb.auth.FacebookAuthProvider.credential(token);
	// 		fb.auth().signInAndRetrieveDataWithCredential(credentials).catch(err => {
	// 			console.log("Error", err);
	// 		});
	// 	}
	// }


	render() {
		if (this.state.page == '') {
			return (
				<View style={styles.container}>
					{/* <ImageBackground source={require('../images/Login.jpg')} resizeMode='cover' style={styles.container}> */}
					<View style={styles.inputContainer}>  
						{/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} /> */}
						<TextInput style={styles.inputs}
							placeholder="Email"
							placeholderTextColor="#ed1a4b"
							keyboardType="email-address"
							underlineColorAndroid='transparent'
							onChangeText={(email) => this.setState({ email })} 
							/>
					</View>

					<View style={styles.inputContainer}>
						{/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} /> */}
						<TextInput style={styles.inputs}
							placeholder="Password"
							placeholderTextColor="#ed1a4b"
							secureTextEntry={true}
							underlineColorAndroid='transparent'
							onChangeText={(password) => this.setState({ password })}
							 />
					</View>

					{/* <Button
						title="SIGNUP"
						ViewComponent={require('expo').LinearGradient}
						linearGradientProps={{
							colors: ['#FF9800', '#F44336'],
							start: [1, 0],
							end: [0.2, 0],
						}}
						onPress={() => this.onClickListener(this.state.email, this.state.password)}
					/>

					<Button
						icon={
							<Icon
								name="arrow-right"
								size={15}
								color="white"
							/>
						}
						iconRight
						onPress={() => this.onClickListener(this.state.email, this.state.password)}
						title="Button with right icon"
					/> */}
					
					<TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.loginUser(this.state.email, this.state.password)}>
						<Text style={styles.loginText}>Login</Text>
					</TouchableHighlight>

					<TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('restore_password')}>
						<Text>Forgot your password?</Text>
					</TouchableHighlight>

					<TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.setState({
						page: "register"
					})}>
						<Text>Register</Text>
					</TouchableHighlight>
					{/* </ImageBackground> */}
				</View>
			)
		} else if (this.state.page == "register") {
			return (
				<View style={styles.container}>
					<View style={styles.inputContainer}>
						{/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} /> */}
						<TextInput style={styles.inputs}
							placeholder="Email"
							keyboardType="email-address"
							underlineColorAndroid='transparent'
							onChangeText={(email) => this.setState({ email })} />
					</View>

					<View style={styles.inputContainer}>
						{/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} /> */}
						<TextInput style={styles.inputs}
							placeholder="Password"
							secureTextEntry={true}
							underlineColorAndroid='transparent'
							onChangeText={(password) => this.setState({ password })} />
					</View>

					<View style={styles.inputContainer}>
						{/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} /> */}
						<TextInput style={styles.inputs}
							placeholder="Name"
							// secureTextEntry={true}
							underlineColorAndroid='transparent'
							onChangeText={(name) => this.setState({ name })} />
					</View>

					<View style={styles.inputContainer}>
						{/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} /> */}
						<TextInput style={styles.inputs}
							placeholder="Contact"
							// secureTextEntry={true}
							underlineColorAndroid='transparent'
							onChangeText={(contact) => this.setState({ contact })} />
					</View>

					<TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.signup(this.state.email, this.state.password)}>
						<Text style={styles.loginText}>Sign Up</Text>
					</TouchableHighlight>
					{/* 	
					<TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
						<Text>Forgot your password?</Text>
					</TouchableHighlight> */}

					<TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.setState({
						page: ''
					})}>
						<Text>Login</Text>
					</TouchableHighlight>
				</View>
			)
		}
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'column',

	},
	inputContainer: {
		borderBottomColor: '#f7073f',
		// backgroundColor: '#FFFFFF',
		borderRadius: 30,
		borderBottomWidth: 1,
		width: 250,
		height: 45,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputs: {
		height: 45,
		marginLeft: 16,
		borderBottomColor: '#FFFFFF',
		flex: 1,
	},
	inputIcon: {
		width: 30,
		height: 30,
		marginLeft: 15,
		justifyContent: 'center'
	},
	buttonContainer: {
		height: 45,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
		width: 250,
		borderRadius: 30,
	},
	loginButton: {
		backgroundColor: "#d12963",
	},
	loginText: {
		color: 'white',
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'stretch',
	}
});

export default WelcomeScreen;