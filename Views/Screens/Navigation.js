import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Location from './MainWindows/Location';
import Vehicles from './MainWindows/Vehicles';
import Profile from './MainWindows/Profile';

const TabNavigator = createBottomTabNavigator({
	Vehicles: { screen: Vehicles },
	Location: { screen: Location },
	Profile: { screen: Profile },
});

// const TabNav = createAppContainer(TabNavigator);

// export default TabNav;

const AppContainer = createAppContainer(TabNavigator);

export default class Navigation extends React.Component {
	render() {
		return <AppContainer />;
	}
}