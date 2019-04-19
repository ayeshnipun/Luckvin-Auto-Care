import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Avatar } from 'react-native-elements';

export default class ProfileAvatar extends Component {
	constructor(props){
		super(props)
	}

	render() {
		return (
			<View>

				<Avatar
					size={this.props.size}
					rounded
				// source={{ uri: this.state.userData ? this.state.userData.avatar : null }}
				/>
			</View>
		)
	}
}
