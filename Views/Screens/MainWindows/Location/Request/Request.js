import React, { Component } from 'react'
import { Text, View, Linking, TouchableHighlight, TouchableOpacity, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Styles from './Styles';
export default class Request extends Component {
	// state = {
	// 	contact = +94772226925,
	// }
	constructor(props) {
		super(props);
	}

	

	render() {
		return (
			<View>
				{/* <TouchableOpacity  > */}
					<Icon
						name="support"
						color="white"
						size={35}
						style={{ paddingTop: 7 }}
					/>
				{/* </TouchableOpacity> */}
			</View>
		)
	}
}
