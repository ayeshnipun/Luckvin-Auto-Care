import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
		flexDirection: 'column',
		tintColor: 'hsla(360, 100%, 100%, 1.0)'
	},
	textInputs:{
		borderBottomColor: '#5e5d5d', 
		borderBottomWidth:1, 
		color: 'white', 
		width:"100%", fontSize:18
	},
	registerBtnStyles:{
		marginTop: 10,
		marginHorizontal: 40,
		paddingVertical: 15,
		borderRadius: 2,
		backgroundColor: '#ed256d',
		fontSize: 20,
		marginBottom:60
	},
	registerText:{
		textAlign:'center', color:'white'
	},
	textInputIcons:{
		paddingTop:20, paddingLeft:10, paddingRight:10
	},
	textInputView:{ 
		marginBottom: 20, flexDirection:'row' 
	},
	registerView:{ 
		marginTop: 0, flex: 1 
	},
	keyboardAvoid:{ 
		flex: 1, width:"100%"
	},
	gotoRegisterText:{
		textAlign:'center', color:'#bab8b8', 
	},
	gotoRegisterButton:{
		marginTop:40, marginBottom:30
	},
	gotoLoginIcon:{
		marginLeft:30,
		marginTop:20,
		paddingBottom:5,
		backgroundColor:'transparent'
	},
	logintext:{
		textAlign:'center', color:"white", marginTop:3, marginLeft:5
	},
	loginIcon:{
		marginLeft:100
	},
	loginButton:{
		marginTop: 10,
		marginHorizontal: 40,
		paddingVertical: 15,
		borderRadius: 2,
		backgroundColor: '#ed256d',
		fontSize: 20,
		flexDirection:'row'
	},
	loginView:{ 
		marginBottom: 10, marginTop:30, flexDirection:'row'
	},
	topTickIcon:{
		height:200, width:200
	},
	topTickIconView:{
		alignItems:'center'
	},
	loginScrollView:{
		paddingTop: 20, flex: 1 
	},
});

export default Styles;