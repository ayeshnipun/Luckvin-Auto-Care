import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput } from 'react-native'
import { Card, ListItem, Button, Icon, Image } from 'react-native-elements'

import { fb, database } from '../../../firebaseConfig/config';

// import WelcomeScreen from '../../WelcomeScreen';


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

	componentWillMount() {
		fb.auth().onAuthStateChanged(function (user) {
			if (user) {
				this.setState({
					user
				});
			}
		}.bind(this));
	}

	componentDidMount() {
		this.getDataFromFBase();
	}

	getDataFromFBase() {
		database.collection('Users').doc(this.state.user.uid)
			.collection('Vehicles').onSnapshot(snap => {
				snap.docChanges().forEach(change => {
					this.setState(prevState => ({
						v_list: [...prevState.v_list, { key: change.doc.id, details: change.doc.data() }]
					}))
				});
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
			<View style={styles.vehicleContainer}>
				<TextInput onChangeText={(vNum) => this.setState({ v_number: vNum })} placeholder="Vehicle Number" style={styles.ti1}></TextInput>
				<TextInput onChangeText={(vBrn) => this.setState({ v_brand: vBrn })} placeholder="Vehicle Brand" style={styles.ti1}></TextInput>
				<TextInput onChangeText={(vTyp) => this.setState({ v_type: vTyp })} placeholder="Vehicle Type" style={styles.ti1}></TextInput>
				<Button
					title="Submit Vehicle"
					onPress={this.submitVehicle.bind(this)}
				/>
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
						<View>
							<Text>empty</Text>
						</View>
					)}
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
		marginTop: '10%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff',
	},
	ti1: {
		borderColor: 'gray', borderWidth: 1,
		width: 300,
		height: 40
	},
	contentContainer: {
		// paddingVertical: 20
	}
});


export default Vehicles;