import React, { Component } from 'react'
import { Text, View, Button, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions  } from 'react-native'
// import { ImagePicker } from 'react-native-image-picker'
import { Avatar } from 'react-native-elements';
import { fb, database, storage } from '../../../../firebaseConfig/config'
import Icon from 'react-native-vector-icons/Octicons'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import WelcomeScreen from '../../WelcomeScreen/WelcomeScreen'
import Navigator from './Tabs/Navigator';
var ImagePicker = require('react-native-image-picker');

import Styles from './Styles';

const options = {
	title: 'Select Avatar',
	customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
	storageOptions: {
		skipBackup: true,
		path: 'images',
	},
};
export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: null,
			user: null,
			avatar: null,
			fName: null,
			lName: null,
			email: null,
			profileCardWidth:0
		}

	}

	componentWillMount(){
		const width = Dimensions.get('window').width;
		const profileCardWidth = width - 30;
		this.setState({
			profileCardWidth
		})
	}

	componentDidMount() {
		var email = fb.auth().currentUser.email
		this.setState({
			email
		})
		fb.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					user
				});
				database.collection('Users').doc(this.state.user.uid).onSnapshot(user => {
					console.log(user);
					this.setState({
						userData: user.data(),
						fName: user.data().fname,
						lName: user.data().lname,
						avatar: user.data().photoURL
					});
				})
				// console.log(user);
			} else {
				console.log("Eror")
			}
		})

	}

	addPicture = () => {
		ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
			if (res.didCancel) {
				console.log("User cancelled!");
			} else if (res.error) {
				console.log("Error", res.error);
			} else {
				this.updateProfilePicture(res.uri)
				// this.setState({
				// 	u_image: res.uri
				// });
			}
		});
	}

	updateProfilePicture = async (uri) => {
		console.log(uri);
		var that = this;
		var userId = this.state.user.uid
		var re = /(?:\.([^.]+))?$/;
		var ext = re.exec(uri)[1];

		this.setState({
			currentFileType: ext
		});

		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				console.log(e);
				reject(new TypeError('Network request failed'));
			};
			xhr.responseType = 'blob';
			xhr.open('GET', uri, true);
			xhr.send(null);
		});

		var filePath = userId + '.' + that.state.currentFileType;

		var uploadTask = storage.ref('Users/').child(filePath).put(blob);

		uploadTask.on('state_changed', function (snapshot) {
			let progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
			that.setState({
				progress: progress
			});
		}, function (error) {
			console.log(error);
		}, function () {
			that.setState({
				progress: 100
			});
			uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
				that.setDatabse(downloadURL);
			})
		})
		// alert("Vehicle Registerd");
	}

	setDatabse = (imageURL) => {
		var user = fb.auth().currentUser;
		var userID = fb.auth().currentUser.uid;
		database.collection('Users').doc(userID).update({ "avatar": imageURL });
		console.log("User: " + user);
		user.updateProfile({
			photoURL: imageURL
		});
		alert('SuccessFully Published!!');
		// this.setState({
		//     imageSelected: false,
		//     uploading: false,
		//     progress: 0,
		//     caption: '',
		//     avatar: imageURL
		// });
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

	ccc = () => {
		console.log(this.state.avatar)
	}

	render() {
		// const {user} = this.state.user;
		return (
			<View style={Styles.mainView}>
				<View style={Styles.mainHeaderView}>
					<View style={Styles.navigationIconView}>
						<TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} >
							<Icon
								name="three-bars"
								color="black"
								size={27}
								style={Styles.navigationIcon}
							/>
						</TouchableOpacity>
					</View>
					<View style={Styles.headerView}>
						<Text style={Styles.headerText}>Profile</Text>
					</View>
					<View style={Styles.signOutIconView}>
						<TouchableOpacity onPress={() => this.logOut()} >
							<Icon
								name="sign-out"
								color="red"
								size={27}
								style={Styles.signOutIcon}
							/>
						</TouchableOpacity>
					</View>
				</View>

				{/* <View elevation={5}>
					<Text>asas</Text>
				</View> */}
				<View style={{alignItems:"center"}}>
					<View elevation={5} style={{
						top: 10,
						bottom: 30,
						width: this.state.profileCardWidth,
						height: 120,
						backgroundColor: 'white',
						borderRadius: 20,
						shadowColor: 'black',
						shadowOffset: {
							width: 10,
							height: 10
						},
						shadowRadius: 10,
						shadowOpacity: 1.0,
						flexDirection:"row",
						alignItems:"center"
					}}>
						<View style={{ left: 40, marginRight: 60 }}>
							<Avatar
								size="large"
								rounded
								onPress={this.addPicture}
								source={{ uri: this.state.userData ? this.state.userData.avatar : null }}
								showEditButton
							/>
						</View>
						<View style={Styles.userDataView}>
							{this.state.userData ? (
								<View>
									<Text style={Styles.profileInfo}>{this.state.fName + " " + this.state.lName}</Text>
									<Text style={Styles.profileInfo}>{this.state.email}</Text>
									{/* <Text>Username</Text> */}
								</View>
							) : (
									<View style={Styles.infoLoadingIndicator}>
										<ActivityIndicator size="small" color="#00ff00" />
									</View>
								)}
						</View>
					</View>
				</View>
				{/* <View style={{ paddingBottom: 20, borderBottomWidth: 1 }}>
					<TouchableOpacity style={{ marginTop: 10, marginHorizontal: 40, paddingVertical: 15, borderRadius: 20, backgroundColor: 'gray' }} onPress={this.ccc}>
						<Text style={{ textAlign: 'center', color: 'white', fontSize: 17 }}>
							Edit Profile
						</Text>
					</TouchableOpacity>
				</View> */}

				<View style={Styles.navigator}>
					<Navigator />
				</View>
			</View>
		)
	}
}


Profile.navigationOptions = {
	tabBarIcon: ({ tintColor, focused }) => (
		<View>
			<IconFA5
				name="user-friends"
				size={26}
				color={tintColor}
			/>
		</View>
	)
} 