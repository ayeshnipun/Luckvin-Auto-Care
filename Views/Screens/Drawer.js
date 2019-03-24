import React from 'react';
import {
	Text,
	View
} from 'react-native';
import {
	createDrawerNavigator,
	createAppContainer
} from 'react-navigation';

import Location from './MainWindows/Location';
import Vehicles from './MainWindows/Vehicles';
import Profile from './MainWindows/Profile';

const TabNavigator = createDrawerNavigator({
	Vehicles: {
		screen: Vehicles
	},
	Location: {
		screen: Location
	},
	Profile: {
		screen: Profile
	},
	Profile: {
		screen: Profile
	},
});

// const TabNav = createAppContainer(TabNavigator);

// export default TabNav;

const AppContainer = createAppContainer(TabNavigator);

export default class Drawer extends React.Component {
	render() {
		return <AppContainer /> ;
	}
}