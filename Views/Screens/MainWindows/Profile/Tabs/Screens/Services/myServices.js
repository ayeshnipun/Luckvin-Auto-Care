import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './Styles';

export default class myServices extends Component {
	render() {
		return (
			<View style={styles.outerView}>
				<Text style={{color:"white"}}> Services </Text>
			</View>
		)
	}
}

myServices.navigationOptions = {
	tabBarIcon: ({ tintColor, focused }) => (
		<Icon
			name="customerservice"
			size={25}
			color = {tintColor}
		/>
	)
} 