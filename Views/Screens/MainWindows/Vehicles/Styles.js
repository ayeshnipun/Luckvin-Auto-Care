import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
	scrollView: {
		width: "100%"
	},
	vehicleContainer: {
		flex: 1,
		width: "100%",
		marginTop: 20,
		paddingTop: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1c1c1c',
	},
	ti1: {
		marginBottom: 4,
		width: "100%",
		height: 40,
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
		color: 'white'
	},
	vehicleInputFrom:{ 
		width: "100%", marginBottom: 30 
	},
	addVehicleText:{ 
		color: 'white', fontSize: 26 
	},
	addVehicleView:{ 
		marginLeft: "20%", marginTop: 10 
	},
	navigationIcon:{
		marginLeft: 10,
		marginTop: 10,
		paddingBottom: 5,
		backgroundColor: 'transparent'
	},
	header:{ 
		flexDirection: 'row' 
	},
	mainView:{ 
		flex: 1, backgroundColor: '#1c1c1c' 
	}
});

export default Styles;

