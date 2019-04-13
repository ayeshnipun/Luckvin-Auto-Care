import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

export default class myVehicleList extends Component {
	render() {
		return (
			<View style={{backgroundColor:"gray"}}>
				<Text> textInComponent </Text>
			</View>
		)
	}
}

myVehicleList.navigationOptions = {
	tabBarIcon: ({ tintColor, focused }) => (
		<Icon
			name="car"
			size={25}
			color='#bd5d38'
		/>
	)
} 