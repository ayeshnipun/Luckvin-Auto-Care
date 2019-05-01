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
			v_reading: 30,
			v_year: 1980,
			v_type: null,
			v_image: null,
			v_status: false,
			user: null,
			v_list: [],
		};

	}

	componentDidMount() {
		fb.auth().onAuthStateChanged(function (user) {
			if (user) {
				this.setState({
					user
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
		if (this.state.v_number == "" || this.state.v_brand == ""  || this.state.v_model == "" || this.state.v_image == "" || this.state.v_type == null) {
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

		var uploadTask = storage.ref('photos/vehicles/' + userId).child(filePath).put(blob);

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

	}

	setDatabse = (imageURL) => {
		database.collection('vehicles').add({
			vehicle_type: this.state.v_type,
			Reg_no: this.state.v_number,
			vehicle_brand: this.state.v_brand,
			vehicle_model: this.state.v_model,
			imgurl: imageURL,
			Odometer_reading:this.state.v_reading,
			manufactured_year: this.state.v_year,
			userid: this.state.user.uid,
			status: !this.state.v_status ? "unconfirmed" : "confirmed"

		}).then(() => {
			alert("Vehicle Registerd");
			this.setState({
				v_number: "",
				v_brand: "",
				v_type: "",
				v_model:"",
				v_image: null,
				v_reading: 0,
				v_year: 1980,
				v_status: false
			});
		})
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
									<Picker.Item label="Select a vehicle type" value={null} />
									<Picker.Item label="Motor cycle" value="motorcycle" />
									<Picker.Item label="Threewheeler" value="threewheeler" />
									<Picker.Item label="Car (C class)" value="Car (C class) licence" />
									<Picker.Item label="Light Rigid (LR class) Heavy" value="Light Rigid (LR class) heavy vehicle" />
									<Picker.Item label="Medium Rigid (MR class) Heavy" value="Medium Rigid (MR class) heavy vehicle" />
									<Picker.Item label="Special tractor" value="Tractor" />
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
								backgroundColor:'#009dff', 
								height:50, 
								width:180,
								justifyContent:"center",
								alignItems:"center", 
								borderRadius:10,
								marginTop:20
							}}
							onPress={this.dataChecker.bind(this)}
						>
							<Text style={{color:'white', fontSize:15}}>Save My Vehicle</Text>
						</TouchableOpacity>
					</ScrollView>
					{/* </KeyboardAvoidingView> */}
				</View>
			</View>
		)
	}
}



export default Vehicles;
