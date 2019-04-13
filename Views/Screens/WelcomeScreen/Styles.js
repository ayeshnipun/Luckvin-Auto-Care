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
});

export default Styles;