import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
	profileInfo: {
		fontSize: 15,
		color: 'black'
	},
	infoLoadingIndicator:{ 
		flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 
	},
	navigator:{
		flex:1, 
		width:"100%",
		marginTop:30 
		// marginTop:8
		// top:20,
		// bottom:20
	},
	userDataView:{
		marginRight: 10
	},
	infoWithAvatarView:{ 
		top: 10,
		bottom: 30,
		width: "95%",
		height: 120,
		backgroundColor: 'white',
		borderRadius: 20,
		shadowColor: 'black',
		shadowOffset: {
			width: 10,
			height: 10
		},
		shadowRadius: 10,
		shadowOpacity: 1.0,
		flexDirection:"row",
		alignItems:"center"
	},
	signOutIcon:{
		marginLeft: 110,
		marginTop: 10,
		paddingBottom: 5,
		backgroundColor: 'transparent'
	},
	signOutIconView:{
		marginBottom: 10 
	},
	headerText:{ 
		color: 'black', fontSize: 26 
	},
	headerView:{ 
		marginLeft: "30%", marginTop: 5 
	},
	navigationIcon:{ 
		marginLeft: 10, marginTop: 10, paddingBottom: 5, backgroundColor: 'transparent' 
	},
	navigationIconView:{ 
		marginBottom: 10 
	},
	mainHeaderView:{ 
		flexDirection: 'row', marginTop: 8 
	},
	mainView:{ 
		flex: 1, backgroundColor: 'white' 
	}
});

export default Styles;