/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
// import Location from './Views/Screens/MainWindows/Location';
// import WelcomeScreen from './Views/Screens/WelcomeScreen'


export default class Location extends Component {
	constructor(props) {
		super(props)
		this.state = {
			region: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			}
		}
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					region: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.0011
					}
				});
			},
			(error) => alert(JSON.stringify(error)),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
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
					<Marker
						coordinate={{
							latitude: this.state.region.latitude,
							longitude: this.state.region.longitude
						}}
					></Marker>
				</MapView>
				{/* <Search onLocationSelected={this.handleLocationSelected} /> */}
				<Button title="Place" color="red" onPress={this.setAlarmToDestination} />
			</View>
			// <View style={{flex:1}}>

			// 	{/* <WelcomeScreen /> */}
			// 	{/* <Location/> */}
			// </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
