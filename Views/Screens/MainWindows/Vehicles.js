import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import { Card, ListItem, Button, Image, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Octicons'
import { Avatar } from 'react-native-elements';
import { ImagePicker } from 'react-native-image-picker';

import { fb, database } from '../../../firebaseConfig/config';

// var ImagePicker = require('react-native-image-picker');


class Vehicles extends Component {
	constructor(props) {
		super(props);
		this.state = {
			v_number: "",
			v_brand: "",
			v_type: "",
			v_image: null,
			user: null,
			v_list: [],
		};

	}

	componentDidMount() {
		this.getDataFromFBase();
	}

	getDataFromFBase() {
		fb.auth().onAuthStateChanged(function (user) {
			if (user) {
				this.setState({
					user
				});
				database.collection('Users').doc(this.state.user.uid)
					.collection('Vehicles').onSnapshot(snap => {
						snap.docChanges().forEach(change => {
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
				this.uploadAvatar(res).then(() => {
					alert("Success");
				}).catch((error) => {
					alert(error);
				})
				// this.setState({
				// 	avatar: res
				// 	// avatar: { uri: res.uri }
				// });
				// console.log(this.state.avatar);
			}
		});
	}

	submitVehicle = () => {
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
			database.collection('Users').doc(this.state.user.uid).collection('Vehicles').add({
				vehicle_number: this.state.v_number,
				vehicle_brand: this.state.v_brand,
				vehicle_type: this.state.v_type,
			});
			this.setState({
				vehicle_number: "",
				vehicle_brand: "",
				vehicle_type: "",
			});
		}
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
					<View style={{width:"100%", marginBottom:30}}>
						<Avatar
							size="large"
							rounded
							onPress={() => this.addPicture()}
							source={{ uri: 'https://api.adorable.io/avatars/285/test@user.i.png' }}
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
							onPress={this.submitVehicle.bind(this)}
						/>
					</View>
					{/* </KeyboardAvoidingView> */}
					{this.state.v_list ? (
						<ScrollView style={styles.scrollView}>
							{
								this.state.v_list.map((l, i) => (
									<ListItem
										key={i}
										leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' } }}
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
		marginTop:20,
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
		borderBottomColor: 'gray'
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