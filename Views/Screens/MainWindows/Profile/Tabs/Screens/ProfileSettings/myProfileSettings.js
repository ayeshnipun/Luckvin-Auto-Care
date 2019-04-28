import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { fb, database } from '../../../../../../../firebaseConfig/config'

import Styles from './Styles';
export default class myProfileSettings extends Component {
	state = {
		userId: null,
		userEmail: "",
		fName: "",
		lName: "",
		contact: "",
		textInputWidth:0
	}

	componentWillMount(){
		const width = Dimensions.get('window').width;
		const textInputWidth = width - 50;
		this.setState({
			textInputWidth
		})
	}

	componentDidMount(){
		fb.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					userId: user.uid,
					userEmail: user.email,
				})

				database.collection('Users').doc(user.uid).onSnapshot(user => {
					this.setState({
						fName: user.data().fname,
						lName: user.data().lname,
						contact: user.data().contact,
					});
				})
			} else {
				console.log("Eror")
			}
		})
	}

	render() {
		const user = this.state
		return (
			<View style={Styles.outerView}>
				<Text style={{ color: "#878787", fontSize: 20, marginBottom: 10 }}>Edit Profile</Text>
				
				<ScrollView style={{width:"100%"}}>
				<TextInput style={{backgroundColor:"gray", borderRadius:5, width: this.state.textInputWidth, fontSize:20, marginBottom:10}}>{user.fName}</TextInput>
				<TextInput style={{backgroundColor:"gray", borderRadius:5, width: this.state.textInputWidth, fontSize:20, marginBottom:10}}>{user.lName}</TextInput>
				<TextInput style={{backgroundColor:"gray", borderRadius:5, width: this.state.textInputWidth, fontSize:20, marginBottom:10}}>{user.contact}</TextInput>
				</ScrollView>
			</View>
		)
	}
}

myProfileSettings.navigationOptions = {
	tabBarIcon: ({ tintColor, focused }) => (
		<Icon
			name="ios-settings"
			size={25}
			color={tintColor}
		/>
	)
} 