import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createMaterialTopTabNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

import myProfileSettings from './Screens/ProfileSettings/myProfileSettings';
import myVehicleList from './Screens/VehicleList/myVehicleList'
import myServices from './Screens/Services/myServices'
class Navigator extends Component {

}

const TabNavigator = createBottomTabNavigator(
	{
		Services: myServices,
		Vehicles: myVehicleList,
		Settings: myProfileSettings,
	},
	{
		tabBarOptions: {
			showIcon: true,
			showLabel: true,
			activeTintColor: '#ed256d',
			style: {
				// marginBottom:10,
				backgroundColor: 'white',
			},
		},
	}

);

export default createAppContainer(TabNavigator);