/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, ActivityIndicator, TouchableHighlight, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/Octicons';
import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';
import Call from './Contact/Call';
var geoLib = require('geolib');

import Styles from './Styles';

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
			//make this false after testing
			coverage: true,
			distance: 0
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



	render() {
		const { region } = this.state.region;
		if (this.state.region.latitude != 0 && this.state.region.longitude != 0) {
			return (
				<View style={{ flex: 1 }}>

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
							<Text>You are in {this.state.distance/1000} KM away from us</Text>
							<Call />
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

