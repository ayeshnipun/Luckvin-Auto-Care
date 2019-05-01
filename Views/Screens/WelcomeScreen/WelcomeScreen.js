import React, { Component } from 'react'
import {
	StyleSheet,
	Text, View, TextInput, TouchableHighlight, Image, ImageBackground, KeyboardAvoidingView, ScrollView, TouchableOpacity
} from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { fb } from '../../../firebaseConfig/config';

import Styles from './Styles';

let interval;
class WelcomeScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			fname:'',
			lname:'',
			contact: '',
			password: '',
			password_c:'',
			user: null,
			page: '',
			isConnected:true
		};
		this.ref = fb.firestore().collection('Users');
		// this.signoutUser();

		// this.signoutUser(); 
	}

	componentDidMount = () => {
		interval = setInterval(() => {
			NetInfo.isConnected.fetch().then(isConnected => {
				this.setState({
					isConnected
				});
			});
				// console.log(this.state.isConnected);
		}, 2000);
	}

	componentWillUnmount() {
		clearInterval(interval);
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
		if (this.state.isConnected) {
			if (email != '' && pw != '' ) {
				try {
					let user = fb.auth().signInWithEmailAndPassword(email, pw).catch((err) => {
						alert('Invalid email or password');
					});
					console.log(user);
				} catch (error) {
					// alert('Bad connctivity. Check your connection.');
					console.log(error);
				}
			} else {
				alert('Missing email or password');
			}	
		} else {
			alert('Bad connctivity. Check your connection.');	
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
		if (this.state.isConnected) {
			try {
				await fb.auth().createUserWithEmailAndPassword(email, pass).then(data => {
					this.ref.doc(data.user.uid).set({
						email: data.user.email,
						displayName: this.state.fname + " " + this.state.lname,
						contact: this.state.contact,
						uid: data.user.uid
					});
					// console.log(data.user.uid);
				});
				console.log("Account created");
			} catch (error) {
				console.log(error.toString())
			}
		} else {
			alert("Check your connection.")
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
				<ImageBackground source={require('../../Images/login3.jpg')} resizeMode='cover' style={Styles.container}>
					<KeyboardAvoidingView style={Styles.keyboardAvoid}>
							<ScrollView style={Styles.loginScrollView}>
								<View style={Styles.topTickIconView}>
									<Image source={require('../../Images/tick.png')} style={Styles.topTickIcon}/>
								</View>
								<View style={Styles.loginView}>
									<Entypo
										size = {20}
										style={Styles.textInputIcons}
  										name='email'
  										color='white' />
									<TextInput 
										keyboardType='email-address'
										placeholder="Email" 
										placeholderTextColor="#bab8b8" 
										style={ Styles.textInputs } 
										onChangeText={(email) => {this.setState({email})}}
									/>
								</View>

								<View style={Styles.textInputView}>
									<Icon
										size = {20}
										style={Styles.textInputIcons}
  										name='eye'
  										color='white' />
									<TextInput 
										secureTextEntry={true}
										placeholder="Password" 
										placeholderTextColor="#bab8b8" 
										style={Styles.textInputs} 
										onChangeText={(password) => {this.setState({password})}}/>
								</View>

								<TouchableOpacity style={Styles.loginButton}
									onPress={() => this.loginUser(this.state.email, this.state.password)}>
									<Icon name="sign-in" color="white" style={Styles.loginIcon} size={27}/>
									<Text style={Styles.logintext}>LOGIN</Text>
								</TouchableOpacity>

								<TouchableOpacity style={Styles.gotoRegisterButton} onPress={() => this.setState({
									page: "register",
									email: '',
									password: ''
								})}>
									<Text style={Styles.gotoRegisterText}>Click here to Register</Text>
								</TouchableOpacity>
							</ScrollView>
						{/* </View> */}
					</KeyboardAvoidingView>
				</ImageBackground>
			)
		} else if (this.state.page == "register") {
			return (
				<ImageBackground source={require('../../Images/login3.jpg')} resizeMode='cover' style={Styles.container}>
					<KeyboardAvoidingView style={Styles.keyboardAvoid}>
						<View style={Styles.registerView}>
							<TouchableHighlight
								onPress={()=>this.setState({
									page: '',
									email: '',
									fname:'',
									lname:'',
									contact: '',
									password: '',
									password_c:'',
								})}
							>
								<Icon
									name="arrow-left"
									color="white"
									size={27}
									style={Styles.gotoLoginIcon}
								/>
							</TouchableHighlight>
							<ScrollView style={{paddingTop: 40, flex: 1}}>
								<Text style={{ fontSize: 30, color: 'white', fontWeight: '300', marginBottom: 30 }}>New Account</Text>
								<View style={Styles.textInputView}>
									<Entypo
										size = {20}
										style={Styles.textInputIcons}
  										name='email'
  										color='white' />
									<TextInput 
										keyboardType='email-address'
										placeholder = "Emali"
										placeholderTextColor = "#bab8b8"
										style={Styles.textInputs}  
										onChangeText={(email) => {this.setState({email})}}
									/>
								</View>
								<View style={Styles.textInputView}>
									<Icon
										size = {20}
										style={Styles.textInputIcons}
  										name='user'
  										color='white' />
									<TextInput
										placeholder = "First Name"
										placeholderTextColor = "#bab8b8" 
										style={Styles.textInputs} 
										onChangeText={(fname) => {this.setState({fname})}}
									/>
								</View>
								<View style={Styles.textInputView}>
									<Icon
										size = {20}
										style={Styles.textInputIcons}
  										name='user'
  										color='white' />
									<TextInput
										placeholder = "Last Name"
										placeholderTextColor = "#bab8b8" 
										style={Styles.textInputs} 
										onChangeText={(lname) => {this.setState({lname})}}
									/>
								</View>
								<View style={Styles.textInputView}>
									<Icon
										size = {20}
										style={Styles.textInputIcons}
  										name='phone'
  										color='white' />
									<TextInput
										keyboardType='phone-pad'
										placeholder = "Contact Number"
										placeholderTextColor = "#bab8b8" 
										style={Styles.textInputs} 
										onChangeText={(contact) => {this.setState({contact})}}
									/>
								</View>

								<View style={Styles.textInputView}>
									<Icon
										size = {20}
										style={Styles.textInputIcons}
  										name='eye'
  										color='white' />
									<TextInput 
										secureTextEntry={true}
										placeholder = "Password"
										placeholderTextColor = "#bab8b8"
										style={Styles.textInputs} 
										onChangeText={(password) => {this.setState({password})}}
									/>
								</View>
								
								<View style={Styles.textInputView}>
									<Icon
										size = {20}
										style={Styles.textInputIcons}
  										name='eye'
  										color='white' />
									<TextInput 
										secureTextEntry={true}
										placeholder = "Confirm Password"
										placeholderTextColor = "#bab8b8"
										style={Styles.textInputs} 
										onChangeText={(password_c) => {this.setState({password_c})}}
									/>
								</View>

								<TouchableOpacity style={Styles.registerBtnStyles}
									onPress={() => this.signup(this.state.email, this.state.password)}>
									<Text style={Styles.registerText}>REGISTER</Text>
								</TouchableOpacity>
							</ScrollView>
						</View>
					</KeyboardAvoidingView>
				</ImageBackground>
			)
		}
	}
}


export default WelcomeScreen;