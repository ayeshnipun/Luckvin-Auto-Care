import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import Styles from './Styles';

export default class myVehicleList extends Component {
	render() {
		return (
			<View style={Styles.outerView}>
				<Text style={{color:"#878787", fontSize:20}}>My Vehicles</Text>
			</View>
		)
	}
}

myVehicleList.navigationOptions = {
	tabBarIcon: ({ tintColor, focused }) => (
		<Icon
			name="ios-car"
			size={25}
			color = {tintColor}
		/>
	)
} 