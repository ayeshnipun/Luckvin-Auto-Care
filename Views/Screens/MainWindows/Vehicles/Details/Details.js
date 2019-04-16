import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { withNavigation } from 'react-navigation';

class Details extends Component {
	constructor(props) {
		super(props);
		state = {
			vehicle: null
		}
		// console.log()
	}

	componentDidMount () {
		console.log(this.props.navigation.state.params.l)
		this.setState({
			vehicle : this.props.navigation.state.params.l
		})
	}

	render() {
		return (
			<View style={{ flex: 1, width: "100%", backgroundColor: "gray" }}>
				{!this.state.vehicle ? (
					<Text> {this.state.vehicle.key} </Text>
				) : (
					<Text>sdasd</Text>
				)}
			</View>
		)
	}
}

export default withNavigation(Details)