/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Animated, ActivityIndicator, TouchableHighlight, TouchableOpacity, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/Octicons';
// import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';
import Call from './Contact/Call';
var geoLib = require('geolib');
import Dialog from "react-native-dialog";

import { fb, database, storage } from '../../../../firebaseConfig/config';
import Styles from './Styles';
import Request from './Request/Request';

export default class Location extends Component {
	constructor(props) {
		super(props)
		this.state = {
			region: {
				latitude: 6.014977,
				longitude: 80.438775,
				// latitude: 0,
				// longitude: 0,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			},
			originCoords: {
				latitude: 5.970375,
				longitude: 80.692441,
			},
			userID: 'g5VF0YgnFqSYHqTEq34TqgzNjwL2', //fb.auth().currentUser.uid,
			userEmail: 'nipun.dr1@gmail.com', //fb.auth().currentUser.email,
			// request: {
			// 	userFname: 'Ayesh',
			// 	userLname: 'Nipun',
			// 	location: {
			// 		// latitude: this.state.region.latitude,
			// 		// longitude: this.state.region.longitude,
			// 	}
			// },
			//make this false after testing
			coverage: false,
			distance: 0,
			dialogVisible: false
		}
	}

	componentDidMount() {
		var distance = geoLib.getDistance(
			{ latitude: this.state.originCoords.latitude, longitude: this.state.originCoords.longitude },
			{ latitude: this.state.region.latitude, longitude: this.state.region.longitude }
		);
		console.log(distance)
		this.setState({
			distance
		});
		// navigator.geolocation.getCurrentPosition(
		// 	(position) => {
		// 		var distance = geoLib.getDistance(
		// 			{ latitude: this.state.originCoords.latitude, longitude: this.state.originCoords.longitude },
		// 			{ latitude: position.coords.latitude, longitude: position.coords.longitude }
		// 		);
		// 		console.log(distance)
		// 		this.setState({
		// 			distance
		// 		});
		// 		if (distance <= 50000) {
		// 			this.setState({
		// 				coverage: true
		// 			})
		// 		}
		// 		else {
		// 			this.setState({
		// 				coverage: false
		// 			})
		// 		}
		// 		this.setState({
		// 			region: {
		// 				latitude: position.coords.latitude,
		// 				longitude: position.coords.longitude,
		// 				latitudeDelta: 0.01,
		// 				longitudeDelta: 0.0011
		// 				// latitude: 20.3742342,
		// 				// longitude: 37.2234,
		// 				// latitudeDelta: 0.01,
		// 				// longitudeDelta: 0.0011
		// 			}
		// 		});
		// 	},
		// 	(error) => alert("Error", "Cannot get the connection due to bad connectivity."),
		// 	{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		// );
	}

	onRegionChange = (region) => {
		this.setState({ region });
	}

	setAlarmToDestination = () => {
		const { region } = this.state;

		const tempRegion = { latitude: region.latitude, longitude: region.longitude };
		// const tempDestination = { latitude: destination.latitude, longitude: destination.longitude };

		if (JSON.stringify(tempRegion) == JSON.stringify(tempRegion)) {
			Vibration.vibrate(100);
		}
	}

	submitRequest() {
		database.collection('Breakdowns').add({
			user: this.state.userID,
			email: this.state.userEmail,
			latitude: this.state.region.latitude,
			longitude: this.state.region.longitude,
		}).then(() => {
			this.setState({ dialogVisible: true });
		})
		// console.log(this.state.ModalVisibleStatus);
	}

	closeDialog = () => {
		this.setState({ dialogVisible: false });
	};


	render() {
		const { region } = this.state.region;
		if (this.state.region.latitude != 0 && this.state.region.longitude != 0) {
			return (
				<View style={{ flex: 1 }}>
					{/* <Modal
						transparent={false}
						animationType={"slide"}
						visible={this.state.ModalVisibleStatus}
						onRequestClose={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }} >
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
							<View style={styles.ModalInsideView}>
								<Text style={styles.TextStyle}>Text Component With Some Sample Text In Modal. </Text>
								<Button title="Click Here To Hide Modal" onPress={() => { this.ShowModalFunction(!this.state.ModalVisibleStatus) }} />
							
							</View>
						</View>
					</Modal> */}
					<Dialog.Container visible={this.state.dialogVisible}>
						<Dialog.Title>Success</Dialog.Title>
						<Dialog.Description>
							Your request has successfuly Informed.
          				</Dialog.Description>
						<Dialog.Button label="Ok" onPress={this.closeDialog} />
						{/* <Dialog.Button label="Delete" onPress={this.handleDelete} /> */}
					</Dialog.Container>

					<MapView
						provider={PROVIDER_GOOGLE}
						initialRegion={this.state.region}
						region={this.state.region}
						// region={region}
						style={{ flex: 1 }}
						// onRegionChange={this.onRegionChange}
						showsUserLocation
						loadingEnabled
					>
						{/* <MapViewDirections
							origin={this.state.region}
							destination={this.state.originCoords}
							strokeWidth={3}
							apikey={'AIzaSyCfpyjsCryoM6w90zCbqYJpbZcy87Y6fXc'}
							strokeColor="blue"
						/> */}

						<Marker
							coordinate={{
								latitude: this.state.originCoords.latitude,
								longitude: this.state.originCoords.longitude
							}}
						></Marker>
					</MapView>

					<View style={Styles.absView}>
						<TouchableOpacity style={{ marginBottom: 100, width: 40 }} onPress={() => this.props.navigation.toggleDrawer()} >
							<Icon
								name="three-bars"
								color="black"
								size={27}
								style={Styles.tooglerWithMap}
							/>
						</TouchableOpacity>

					</View>

					<View style={{ flex: 1, width: "100%", alignContent: "center", alignItems: "center", position: "absolute", bottom: 10 }}>
						<View style={Styles.coverageView}>
							<Text style={{ marginTop: 3, fontSize: 20, color: "black" }}>You are in {this.state.distance / 1000} KM away from us</Text>

							{
								this.state.distance < 50000 ? (
									<View style={{ alignItems: "center" }}>
										<View style={{ alignItems: "center" }}>
											<Text style={{ marginTop: 3 }}>First, Send your Location with 'Assist' Button</Text>
											<Text style={{ marginTop: 3 }}>Then, You also can give us a call</Text>
										</View>
										<View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
											<TouchableHighlight onPress={() => { this.submitRequest() }} style={Styles.reqBtn}>
												<View style={{ alignItems: "center" }}>
													<Request />
													<Text style={{ marginTop: 11 }}>Assist</Text>
												</View>
											</TouchableHighlight>
											<View style={{ width: 80 }}>

											</View>
											<View style={{ alignItems: "center" }}>
												<Call />
												<Text style={{ marginTop: 3 }}>Call</Text>
											</View>

										</View>
									</View>
								) : (
										<View style={{ flex: 1, justifyContent: "center", alignContent: "center", height: "100%" }}>
											<View style={{ justifyContent: "center", alignItems: "center" }}>
												<Text style={{ color: "red", fontSize: 20 }}>We cannot cover you </Text>
												<Text style={{ color: "red", fontSize: 20 }}>due to the limitation</Text>
											</View>
										</View>
									)
							}
						</View>
					</View>
				</View>
			);
		} else {
			return (
				<View style={Styles.mapLoadingView}>
					<View style={{ marginBottom: 10 }}>
						<TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()} >
							<Icon
								name="three-bars"
								color="white"
								size={27}
								style={Styles.tooglerLoadingMap}
							/>
						</TouchableOpacity>
					</View>

					<View style={Styles.activityIndicatorView}>
						<Text style={Styles.mapLoadingText}>Loading the map..</Text>
						<ActivityIndicator size="large" color="#00ff00" />
					</View>
				</View>
			);
		}

	}
}

const styles = StyleSheet.create({

	MainContainer: {

		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: (Platform.OS == 'ios') ? 20 : 0

	},

	ModalInsideView: {

		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "#00BCD4",
		height: 300,
		width: '90%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff'

	},

	TextStyle: {

		fontSize: 20,
		marginBottom: 20,
		color: "#fff",
		padding: 20,
		textAlign: 'center'

	}

});