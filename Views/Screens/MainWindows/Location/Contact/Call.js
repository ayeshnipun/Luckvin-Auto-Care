import React, { Component } from 'react'
import { Text, View, Linking, TouchableHighlight, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Call extends Component {
	// state = {
	// 	contact = +94772226925,
	// }

	callAssistant = () => {
		Linking.openURL(`tel:${+94772226925}`)
	}

	render() {
		return (
			<View>
				<TouchableOpacity onPress={() => this.callAssistant()} style={{height:50, width:50, borderRadius:50, backgroundColor:"#cecece", alignItems:"center", alignContent:"center"}}>
					<Icon
						name="mobile-phone"
						color="green"
						size={35}
						style={{paddingTop: 7}}
					/>
				</TouchableOpacity>
			</View>
		)
	}
}
