import React, { Component } from 'react'
import {
	StyleSheet,
	Text, View, TextInput, TouchableHighlight, Image, ImageBackground, KeyboardAvoidingView, ScrollView, TouchableOpacity
} from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { fb } from '../../firebaseConfig/config';

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
				<KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#045487' }}>
					<View style={{ marginTop: 70, flex: 1 }}>
						<ScrollView style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, flex: 1 }}>
							<Text style={{ fontSize: 30, color: 'white', fontWeight: '300', marginBottom: 30, textAlign:'center' }}>Log In</Text>
							<View style={{ marginBottom: 20 }}>
								<Text style={{ color: 'white' }}>EMAIL ADDRESS</Text>
								<Input style={{ borderBottomColor: 'white' }} onChangeText={(email) => {this.setState({email})}}/>
							</View>

							<View style={{ marginBottom: 20 }}>
								<Text style={{ color: 'white' }}>PASSWORD</Text>
								<Input style={{ borderBottomColor: 'white', color:'white' }} onChangeText={(password) => {this.setState({password})}}/>
							</View>

							<TouchableOpacity style={{
								marginTop: 10,
								marginHorizontal: 40,
								paddingVertical: 15,
								borderRadius: 20,
								// borderColor:'gray',
								backgroundColor: 'white',
								fontSize: 20
							}}
								onPress={() => this.loginUser(this.state.email, this.state.password)}>
								<Text style={{textAlign:'center'}}>LOGIN</Text>
							</TouchableOpacity>

							<TouchableOpacity style={{marginTop:40}} onPress={() => this.setState({
								page: "register",
								email: '',
								password: ''
							})}>
								<Text style={{textAlign:'center', color:'white'}}>Click here to Register</Text>
							</TouchableOpacity>
						</ScrollView>
					</View>
				</KeyboardAvoidingView>
			)
		} else if (this.state.page == "register") {
			return (
				<KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#045487' }}>
					<View style={{ marginTop: 0, flex: 1 }}>
						<ScrollView style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, flex: 1 }}>
							<Text style={{ fontSize: 30, color: 'white', fontWeight: '300', marginBottom: 30, textAlign:'center' }}>Register</Text>
							<View style={{ marginBottom: 20 }}>
								<Text style={{ color: 'white' }}>EMAIL ADDRESS</Text>
								<Input style={{ borderBottomColor: 'white' }} onChangeText={(email) => {this.setState(email)}}/>
							</View>
							<View style={{ marginBottom: 20 }}>
								<Text style={{ color: 'white' }}>FIRST NAME</Text>
								<Input style={{ borderBottomColor: 'white' }} onChangeText={(fname) => {this.setState(fname)}}/>
							</View>
							<View style={{ marginBottom: 20 }}>
								<Text style={{ color: 'white' }}>LAST NAME</Text>
								<Input style={{ borderBottomColor: 'white' }} onChangeText={(lname) => {this.setState(lname)}}/>
							</View>
							<View style={{ marginBottom: 20 }}>
								<Text style={{ color: 'white' }}>CONTACT NUMBER</Text>
								<Input style={{ borderBottomColor: 'white' }} onChangeText={(contact) => {this.setState(contact)}}/>
							</View>

							<View style={{ marginBottom: 20 }}>
								<Text style={{ color: 'white' }}>PASSWORD</Text>
								<Input style={{ borderBottomColor: 'white', color:'white' }} onChangeText={(password) => {this.setState(password)}}/>
							</View>
							<View style={{ marginBottom: 20 }}>
								<Text style={{ color: 'white' }}>CONFIRM PASSWORD</Text>
								<Input style={{ borderBottomColor: 'white', color:'white' }} onChangeText={(password_c) => {this.setState(password_c)}}/>
							</View>

							<TouchableOpacity style={{
								marginTop: 10,
								marginHorizontal: 40,
								paddingVertical: 15,
								borderRadius: 20,
								// borderColor:'gray',
								backgroundColor: 'white',
								fontSize: 20
							}}
								onPress={() => this.loginUser()}>
								<Text style={{textAlign:'center'}}>REGISTER</Text>
							</TouchableOpacity>

							<TouchableOpacity style={{marginTop:40, marginBottom:40}} onPress={() => this.setState({
								page: ''
							})}>
								<Text style={{textAlign:'center', color:'white'}}>Already a user? Click here to Login</Text>
							</TouchableOpacity>
						</ScrollView>
					</View>
				</KeyboardAvoidingView>
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