import React, { Component } from 'react'
import { Text, View, Button, Image, TouchableOpacity } from 'react-native'
import { ImagePicker } from 'react-native-image-picker'
import { Avatar } from 'react-native-elements';
import { fb, database } from '../../../firebaseConfig/config'

import WelcomeScreen from '../WelcomeScreen'

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: null,
			user: null
		}

	}

	componentDidMount() {
		if (!this.state.user) {
			fb.auth().onAuthStateChanged((user) => {
				if (user) {
					this.setState({
						user
					});
					database.collection('Users').doc(this.state.user.uid).get().then(user => {
						this.setState({
							userData: user.data()
						});
					})
					console.log(user);
				} else {
					console.log("Eror")
				}
			})
		}
	}

	editAvatar = () => {
		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				const source = { uri: response.uri };

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };

				this.setState({
					avatarSource: source,
				});
			}
		});
		//   });
	}

	logOut = () => {
		fb.auth().signOut().then(() => {
			console.log('Logged out');
			return (
				<WelcomeScreen />
			);
		}).catch(err => {
			console.log('Error', err);
		});
	}

	render() {
		// const {user} = this.state.user;
		return (
			<View style={{ flex: 1 }}>
				<View
					style={{
						height: 50,
						paddingTop: 30,
						backgroundColor: 'white',
						borderColor: 'lightgray',
						borderBottomWidth: 0.5,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text
						style={{
							fontSize: 20,
							fontWeight: 'bold',
						}}
					>
						Profile
					</Text>
				</View>
				<View
					style={{
						justifyContent: 'space-evenly',
						alignItems: 'center',
						flexDirection: 'row',
						paddingVertical: 10
					}}
				>
					{/* <TouchableOpacity onPress={() => this.editAvatar()}>
						<Image
							source={{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png' }}
							style={{
								marginLeft: 10, width: 100, height: 100, borderRadius: 50
							}}
						/>
					</TouchableOpacity> */}
					<Avatar
						size="xlarge"
						rounded
						onPress={() => console.log("Works!")}
						source={{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png' }}
						showEditButton
					/>
					<View
						style={{
							marginRight: 10
						}}
					>
						{this.state.userData ? (
							<View>
								<Text>{this.state.userData.name}</Text>
								<Text>{this.state.userData.email}</Text>
								{/* <Text>Username</Text> */}
							</View>
						) : (
								<Text>Fetching Data..</Text>
							)}
					</View>
				</View>

				<View style={{ paddingBottom: 20, borderBottomWidth: 1 }}>
					<TouchableOpacity>
						<Text>Logout</Text>
					</TouchableOpacity>
					<TouchableOpacity>
						<Text>Edit Profile</Text>
					</TouchableOpacity>
					{/* <TouchableOpacity>
						<Text>Logout</Text>
					</TouchableOpacity> */}
				</View>
			</View>
		)
	}
}
