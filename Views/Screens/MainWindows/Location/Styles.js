import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
	absView:{ 
		position: 'absolute', 
		backgroundColor: 'transparent', 
		flex: 1, 
		width:"100%", 
		flexDirection:"column",
		justifyContent:"space-between"
	},

	tooglerWithMap:{ 
		marginLeft: 10, 
		marginTop: 10, 
		paddingBottom: 5, 
		backgroundColor: 'transparent' 
	},

	coverageView:{
		width:"90%",  
		backgroundColor:'white', 
		alignItems:"center", 
		height:180, 
		borderRadius:10,
		// bottom:0
		// marginTop:"112%"
	},

	tooglerLoadingMap:{ 
		marginLeft: 10, 
		marginTop: 10, 
		paddingBottom: 5, 
		backgroundColor: 'transparent' 
	},

	activityIndicatorView:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		// justifyContent: 'space-around',
		padding: 10,
	},

	mapLoadingText:{ 
		marginBottom: 3, 
		fontSize: 28, 
		color: 'white' 
	},
	
	mapLoadingView:{
		flex: 1,
		backgroundColor: '#1c1c1c'
	},
	reqBtn:{
		height:50, width:50, borderRadius:50, backgroundColor:"#0968ed", alignItems:"center", alignContent:"center"
	}

});

export default Styles;