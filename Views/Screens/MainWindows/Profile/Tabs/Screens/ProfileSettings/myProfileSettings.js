import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

export default class myProfileSettings extends Component {
  render() {
	return (
	  <View>
		<Text> textponent </Text>
	  </View>
	)
  }
}

myProfileSettings.navigationOptions = {
	tabBarIcon : ({tintColor, focused}) => (
		<Icon
			name="setting"
			size = {25}
			color = '#bd5d38'
		/>
	)
} 