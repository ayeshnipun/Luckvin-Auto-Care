import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput, Picker, ActivityIndicator, KeyboardAvoidingView, TouchableHighlight, TouchableOpacity } from 'react-native'
import { Card, ListItem, Button, Image, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Octicons'
import { Avatar } from 'react-native-elements';

import { fb, database, storage } from '../../../../firebaseConfig/config';
import Details from './Details/Details';
var ImagePicker = require('react-native-image-picker');

import Styles from './Styles'
class Vehicles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			v_number: "",
			v_brand: "",
			v_model:"",
			v_type: null,
			v_image: null,
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
						var vehicles = [];
						snap.forEach(function (doc) {
							// cities.push(doc.data().name);
							vehicles.push({ key: doc.id, details: doc.data() });
						});
						this.setState({
							v_list: vehicles
						})
						// snap.docChanges().forEach(change => {
						// 	this.setState(prevState => ({
						// 		v_list: [...prevState.v_list, { key: change.doc.id, details: change.doc.data() }]
						// 	}))
						// });
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
				this.setState({
					v_image: res.uri
				});
			}
		});
	}

	dataChecker = () => {
		if (this.state.v_number == "" || this.state.v_brand == "" || this.state.v_type == "") {
			alert(
				'All Fields are required..!!',
				'My Alert Msg',
				[
					{ text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
					{
						text: 'Cancel',
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel',
					},
					{ text: 'OK', onPress: () => console.log('OK Pressed') },
				],
				{ cancelable: false },
			);
		} else {
			this.uploadVehicleImage()
		}
	}

	uploadVehicleImage = async () => {
		var uri = this.state.v_image;
		console.log(uri);
		var that = this;
		var vId = this.state.v_number
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

		alert("Vehicle Registerd");
	}

	setDatabse = (imageURL) => {
		database.collection('Users').doc(this.state.user.uid).collection('Vehicles').add({
			vehicle_number: this.state.v_number,
			vehicle_brand: this.state.v_brand,
			vehicle_type: this.state.v_type,
			vehicle_image: imageURL,
		}).then(() => {
			this.setState({
				v_number: "",
				v_brand: "",
				v_type: "",
				v_image: null,
			});
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

	goToVehicle = (l) => {
		console.log(l.details)
		this.props.navigation.navigate('Details', { l });
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={Styles.mainView}>
				<View style={Styles.header}>
					<View>
						<TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} >
							<Icon
								name="three-bars"
								color="black"
								size={27}
								style={Styles.navigationIcon}
							/>
						</TouchableOpacity>
					</View>
					<View style={Styles.addVehicleView}>
						<Text style={Styles.addVehicleText}>Add a Vehicle</Text>
					</View>
				</View>

				<View style={Styles.vehicleContainer}>
					<ScrollView elevation={5} style={Styles.vehicleInputFrom} contentContainerStyle={{alignItems:"center",}}>
						{/* <View style={{ flexDirection: "row", alignItems: "center" }}> */}
						<View style={{marginBottom:20, marginTop:20, flexDirection:"row", alignItems:"center"}}>
							<Text style={{marginRight:20}}>Choose an image</Text>
							<Avatar
								size="large"
								rounded
								onPress={() => this.addPicture()}
								source={{ uri: this.state.v_image }}
								showEditButton
							/>
						</View>
							{/* <View style={{borderRadius:10, width: "80%", overflow: 'hidden' }}> */}
								<Picker
									selectedValue={this.state.v_type}
									style={{ height: 40, width: "80%"}}
									onValueChange={(v_type, itemIndex) =>
										this.setState({ v_type })
									}>
									{/* <Picker.Item label="Select a vehicle type" value={null} /> */}
									<Picker.Item label="Motorcycle" value="Motorcycle" />
									<Picker.Item label="Three wheel" value="Three wheel" />
									<Picker.Item label="Car" value="Car" />
									<Picker.Item label="Van" value="Van" />
									<Picker.Item label="Lorry" value="Lorry" />
									<Picker.Item label="Bus" value="Bus" />
									<Picker.Item label="Hand Tractor" value="Hand Tractor" />
									<Picker.Item label="Land Vehicle" value="Land Vehicle" />
								</Picker>
							{/* </View> */}
						{/* </View> */}

						<TextInput
							onChangeText={(vNum) => this.setState({ v_number: vNum })}
							placeholder="Plate number"
							placeholderTextColor="#98999b"
							value={this.state.v_number}
							style={Styles.ti1} />

						<TextInput
							onChangeText={(vBrn) => this.setState({ v_brand: vBrn })}
							placeholder="Brand"
							placeholderTextColor="#98999b"
							value={this.state.v_brand}
							style={Styles.ti1} />

						<TextInput
							onChangeText={(vMdl) => this.setState({ v_model: vMdl })}
							placeholder="Model"
							placeholderTextColor="#98999b"
							value={this.state.v_model}
							style={Styles.ti1} />

						<TouchableOpacity
							style={{
								backgroundColor:'blue', 
								height:50, 
								width:180,
								justifyContent:"center",
								alignItems:"center", 
								borderRadius:10,
								marginTop:20
							}}
							// title="Submit Vehicle"
							onPress={this.dataChecker.bind(this)}
						>
							<Text style={{color:'white', fontSize:15}}>Save My Vehicle</Text>
						</TouchableOpacity>
					</ScrollView>
					{/* </KeyboardAvoidingView> */}
					{/* {this.state.v_list ? (
						<ScrollView style={Styles.scrollView}>
							{
								this.state.v_list.map((l, i) => (
									<ListItem
										key={i}
										leftAvatar={{ source: { uri: l.details.vehicle_image } }}
										title={l.details.vehicle_type}
										subtitle={l.details.vehicle_number}
										leftIcon={{ name: 'av-timer' }}
										onPress={() => this.goToVehicle(l)}
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
						)} */}
				</View>
			</View>
		)
	}
}



export default Vehicles;
