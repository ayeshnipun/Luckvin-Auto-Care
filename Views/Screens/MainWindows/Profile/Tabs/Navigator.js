import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

import myProfileSettings from './Screens/ProfileSettings/myProfileSettings';
import myVehicleList from './Screens/VehicleList/myVehicleList'
class Navigator extends Component {

}

const TabNavigator = createMaterialTopTabNavigator(
	{
		Vehicles: myVehicleList,
		Settings: myProfileSettings,
	},
	{
		tabBarOptions: {
			showIcon: true,
			showLabel: false,
			activeTintColor: 'white',
			style: {
				backgroundColor: '#4e4e4f',
			},
		},
	}

);

export default createAppContainer(TabNavigator);