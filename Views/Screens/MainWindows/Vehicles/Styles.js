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
		backgroundColor: 'white',
		// backgroundColor: '#1c1c1c',
	},
	ti1: {
		marginTop: 10,
		width: "80%",
		height: 40,
		backgroundColor:'#c9cacc',
		// borderBottomWidth: 1,
		// borderBottomColor: 'gray',
		color: 'black',
		borderRadius:10
	},
	vehicleInputFrom:{ 		
		
		marginTop: 10,
		marginBottom: 30,
		width: "95%",
		height: "50%",
		backgroundColor: 'white',
		borderRadius: 20,
		shadowColor: 'black',
		shadowOffset: {
			width: 10,
			height: 10
		},
		shadowRadius: 10,
		shadowOpacity: 1.0
		// width: "95%", 
		// marginBottom: 30,
		// shadowColor: 'black',
		// shadowOffset: {
		// 	width: 10,
		// 	height: 10
		// },
		// shadowRadius: 10,
		// shadowOpacity: 1.0 
	},
	addVehicleText:{ 
		color: 'black', fontSize: 26 
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
		flex: 1, 
		backgroundColor: 'white' 
		// backgroundColor: '#1c1c1c' 
	}
});

export default Styles;

