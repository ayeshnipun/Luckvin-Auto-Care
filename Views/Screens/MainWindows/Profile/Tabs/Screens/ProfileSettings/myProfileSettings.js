import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import Styles from './Styles';
export default class myProfileSettings extends Component {
  render() {
	return (
	  <View style={Styles.outerView}>
		<Text style={{color:"#7c7c7c", fontSize:20}}> Settings </Text>
	  </View>
	)
  }
}

myProfileSettings.navigationOptions = {
	tabBarIcon : ({tintColor, focused}) => (
		<Icon
			name="ios-settings"
			size = {25}
			color = {tintColor}
		/>
	)
} 