import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

import Styles from './Styles';
export default class myProfileSettings extends Component {
  render() {
	return (
	  <View style={Styles.outerView}>
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
			color = '#ed256d'
		/>
	)
} 