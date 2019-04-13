import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
	absView:{ 
		position: 'absolute', backgroundColor: 'transparent', flex: 1 
	},
	tooglerWithMap:{ 
		marginLeft: 10, marginTop: 10, paddingBottom: 5, backgroundColor: 'transparent' 
	},
	coverageView:{
		flex:1, width:"100%", alignContent:"center"
	},
	tooglerLoadingMap:{ 
		marginLeft: 10, marginTop: 10, paddingBottom: 5, backgroundColor: 'transparent' 
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
		marginBottom: 3, fontSize: 28, color: 'white' 
	},
	mapLoadingView:{
		flex: 1,
		backgroundColor: '#1c1c1c'
	}

});

export default Styles;