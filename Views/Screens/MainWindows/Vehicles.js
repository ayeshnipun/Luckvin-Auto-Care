import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import { Card, ListItem, Button, Image, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Octicons'
import { Avatar } from 'react-native-elements';
// import { ImagePicker } from 'react-native-image-picker';

import { fb, database, storage } from '../../../firebaseConfig/config';
var ImagePicker = require('react-native-image-picker');
// var ImagePicker = require('react-native-image-picker');


class Vehicles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			v_number: "",
			v_brand: "",
			v_type: "",
			v_image: null,
			v_id: null,
			user: null,
			v_list: [],
		};

	}

	componentDidMount() {
		this.getVehiclesFromFirebase();
	}

	getVehiclesFromFirebase() {
		fb.auth().onAuthStateChanged(function (user) {
			if (user) {
				this.setState({
					user
				});
				database.collection('Users').doc(this.state.user.uid)
					.collection('Vehicles').onSnapshot(snap => {
						snap.docChanges().forEach(change => {
							// var ref = fb.storage().ref('Vehicles/' + this.state.user.uid +'/'+ change.doc.data().vehicle_number.jpg)
							// const url = ref.getDownloadURL();
							this.setState(prevState => ({
								v_list: [...prevState.v_list, { key: change.doc.id, details: change.doc.data() }]
							}))
						});
					});
			}
		}.bind(this));
	}

	addPicture = () => {
		ImagePicker.showImagePicker({ title: "Pick an Image", maxWidth: 800, maxHeight: 600 }, res => {
			if (res.didCancel) {
				console.log("User cancelled!");
			} else if (res.error) {
				console.log("Error", res.error);
			} else {
				// this.uploadAvatar(res)
				this.setState({
					v_image: res.uri
					// avatar: { uri: res.uri }
				});
				// console.log(this.state.avatar);
			}
		});
	}

	// uploadAvatar = (res) => {
	// 	this.setState({
	// 		v_image: res
	// 	})

	// }

	dataChecker = () => {
		// if (this.state.v_number == "" || this.state.v_brand == "" || this.state.v_type == "") {
		// 	alert(
		// 		'All Fields are required..!!',
		// 		'My Alert Msg',
		// 		[
		// 			{ text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
		// 			{
		// 				text: 'Cancel',
		// 				onPress: () => console.log('Cancel Pressed'),
		// 				style: 'cancel',
		// 			},
		// 			{ text: 'OK', onPress: () => console.log('OK Pressed') },
		// 		],
		// 		{ cancelable: false },
		// 	);
		// } else {
		this.uploadVehicleImage()
		// setTimeout(() => {
		// 	// this.uploadVehicleToFS()
		// 	this.stateEmpty()
		// }, 1000)


		// }
	}

	uploadVehicleToFS = () => {
		database.collection('Users').doc(this.state.user.uid).collection('Vehicles').add({
			vehicle_number: this.state.v_number,
			vehicle_brand: this.state.v_brand,
			vehicle_type: this.state.v_type,
		}).then((data) => {
			console.log(data.id)
			this.setState({
				v_id: data.id
			})
		})
	}

	uploadVehicleImage = async () => {
		var uri = this.state.v_image;
		console.log(uri);
		var that = this;
		var vId = this.state.v_number
		var v_id = this.state.v_id
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
		// var filePath = userId + '.' + that.state.currentFileType;

		// var uploadTask = storage.ref('user/img').child(filePath).put(blob);

		// uploadTask.on('state_changed', function (snapshot) {
		// 	let progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
		// 	that.setState({
		// 		progress: progress
		// 	});
		// }, function (error) {
		// 	console.log(error);
		// }, function () {
		// 	that.setState({
		// 		progress: 100
		// 	});
		// 	// uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {

		// 	// 	that.setDatabse(downloadURL);
		// 	// })
		// })

		// const response = await fetch(uri);

		// const blob = await new Promise((resolve, reject) => {
		// 	const xhr = new XMLHttpRequest();
		// 	xhr.onload = function () {
		// 		resolve(xhr.response);
		// 	};
		// 	xhr.onerror = function (e) {
		// 		console.log(e);
		// 		reject(new TypeError('Network request failed'));
		// 	};
		// 	xhr.responseType = 'blob';
		// 	xhr.open('GET', uri, true);
		// 	xhr.send(null);
		// });

		// const blob = await response.blob();

		var filePath = vId + '.' + that.state.currentFileType;

		var uploadTask = storage.ref('Vehicles/' + userId).child(filePath).put(blob);

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
		// const store = storage.ref('Vehicles/' + userId).child(filePath);

		// var snap = store.put(blob).on('state_changed', snap => {
		// 	console.log('Progress', snap.bytesTransferred, snap.totalBytes)
		// })

		// snap.snapshot.ref.getDownloadURL().then(function (downloadURL) {

		// 	that.setDatabse(downloadURL);
		// })

		alert("Vehicle Registerd");
	}

	setDatabse = (imageURL) => {
		// var user = fb.auth().currentUser;
		// var userID = fb.auth().currentUser.uid;
		// database.collection('/Users/' + userID + '/Vehicles' + v_id).update({ "avatar": imageURL });
		// console.log("User: " + user);
		// user.updateProfile({
		// 	photoURL: imageURL
		// });
		// alert('SuccessFully Published!!');
		// this.setState({
		// 	imageSelected: false,
		// 	uploading: false,
		// 	progress: 0,
		// 	caption: '',
		// 	avatar: imageURL
		// });
		database.collection('Users').doc(this.state.user.uid).collection('Vehicles').add({
			vehicle_number: this.state.v_number,
			vehicle_brand: this.state.v_brand,
			vehicle_type: this.state.v_type,
			vehicle_image: imageURL,
		}).then((data) => {
			console.log(data.id)
			this.setState({
				v_id: data.id
			})
		})
	}

	stateEmpty = () => {
		this.setState({
			v_number: "",
			v_brand: "",
			v_type: "",
			v_image: null,
		});
	}

	render() {
		return (
			// <KeyboardAvoidingView style={styles.vehicleContainer} behavior="padding">
			<View style={{ flex: 1, backgroundColor: '#1c1c1c' }}>
				<View style={{ flexDirection: 'row' }}>
					<View>
						<TouchableHighlight onPress={() => this.props.navigation.toggleDrawer()} >
							<Icon
								name="three-bars"
								color="white"
								size={27}
								style={{
									marginLeft: 10,
									marginTop: 10,
									paddingBottom: 5,
									backgroundColor: 'transparent'
								}}
							/>
						</TouchableHighlight>
					</View>
					<View style={{ marginLeft: "20%", marginTop: 10 }}>
						<Text style={{ color: 'white', fontSize: 26 }}>Add a Vehicle</Text>
					</View>
				</View>

				<View style={styles.vehicleContainer}>
					<View style={{ width: "100%", marginBottom: 30 }}>
						<Avatar
							size="large"
							rounded
							onPress={() => this.addPicture()}
							// source={{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png' }}
							source={{ uri: this.state.v_image }}
							showEditButton
						/>

						<TextInput
							onChangeText={(vNum) => this.setState({ v_number: vNum })}
							placeholder="Vehicle Number"
							placeholderTextColor="white"
							style={styles.ti1} />

						<TextInput
							onChangeText={(vBrn) => this.setState({ v_brand: vBrn })}
							placeholder="Vehicle Brand" placeholderTextColor="white" style={styles.ti1} />

						<TextInput
							onChangeText={(vTyp) => this.setState({ v_type: vTyp })}
							placeholder="Vehicle Type"
							placeholderTextColor="white"
							style={styles.ti1} />

						<Button
							title="Submit Vehicle"
							onPress={this.dataChecker.bind(this)}
						/>
					</View>
					{/* </KeyboardAvoidingView> */}
					{this.state.v_list ? (
						<ScrollView style={styles.scrollView}>
							{
								this.state.v_list.map((l, i) => (
									<ListItem
										key={i}
										leftAvatar={{ source: { uri: l.details.vehicle_image } }}
										title={l.details.vehicle_type}
										subtitle={l.details.vehicle_number}
										topDivider={true}
										bottomDivider={true}
									/>
								))
							}
						</ScrollView>
					) : (
							<View style={{
								flex: 1,
								justifyContent: 'center',
								flexDirection: 'row',
								justifyContent: 'space-around',
								padding: 10
							}}
							>
								<ActivityIndicator size="small" color="#00ff00" />
							</View>
						)}
				</View>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	scrollView: {
		width: "100%"
	},
	vehicleContainer: {
		flex: 1,
		width: "100%",
		marginTop: 20,
		paddingTop: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1c1c1c',
	},
	ti1: {
		// borderColor: 'gray', 
		// borderWidth: 1,
		marginBottom: 4,
		width: "100%",
		height: 40,
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
		color: 'white'
	},
	contentContainer: {
		// paddingVertical: 20
	}
});


export default Vehicles;

// import React, { Component } from 'react'
// import { Text, View, Button } from 'react-native'

// export default class Vehicles extends Component {
//   render() {
// 	return (
// 	  <View>
// 		  <Button
//         	onPress={() => this.props.navigation.toggleDrawer()}
//         	title="Go to notifications"
//       />
// 		<Text> textInComponent </Text>
// 	  </View>
// 	)
//   }
// }