import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
	profileInfo: {
		fontSize: 15,
		color: 'white'
	},
	infoLoadingIndicator:{ 
		flex: 1, justifyContent: 'center', flexDirection: 'row', justifyContent: 'space-around', padding: 10 
	},
	navigator:{
		flex:1, width:"100%", marginTop:8
	},
	userDataView:{
		marginRight: 10
	},
	infoWithAvatarView:{ 
		justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', paddingVertical: 10 
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
		color: 'white', fontSize: 26 
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
		flex: 1, backgroundColor: '#1c1c1c' 
	}
});

export default Styles;