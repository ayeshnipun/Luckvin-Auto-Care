import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, Dimensions, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import { fb, database } from '../../../../../../../firebaseConfig/config'

import Styles from './Styles';
export default class myProfileSettings extends Component {
	state = {
		userId: null,
		userEmail: "",
		displayName: "",
		contact: "",
		textInputWidth: 0
	}

	componentWillMount() {
		const width = Dimensions.get('window').width;
		const textInputWidth = width - 50;
		this.setState({
			textInputWidth
		})
	}

	componentDidMount() {
		fb.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					userId: user.uid,
					userEmail: user.email,
				})

				database.collection('users').doc(user.uid).onSnapshot(user => {
					this.setState({
						displayName: user.data().displayName,
						contact: user.data().contact,
					});
				})
			} else {
				console.log("Eror")
			}
		})
	}

	updateProfile = () => {
		database.collection("users").doc(this.state.userId).update({
			displayName : this.state.displayName,
			contact : this.state.contact
		}).then(() => {
			alert("Profile Updated")
		}).catch((error) => {
			console.log(error);
		})
	}

	render() {
		const user = this.state
		return (
			<View style={Styles.outerView}>
				<Text style={{ color: "#878787", fontSize: 20, marginBottom: 10 }}>Edit Profile</Text>
				{/* <View style={{width:"100%", alignItems:"center"}}> */}
					<ScrollView style={{ width: "100%", flex:1 }} contentContainerStyle={{alignItems:"center"}}>
						<TextInput 
							style={{ 
								backgroundColor: "#c9cacc", 
								borderRadius: 5, width: this.state.textInputWidth, fontSize: 20, marginBottom: 10 
							}}
							onChangeText={(displayName) => this.setState({displayName})}
						>{user.displayName}</TextInput>

						{/* <TextInput 
							style={{ 
								backgroundColor: "#c9cacc", 
								borderRadius: 5, width: this.state.textInputWidth, fontSize: 20, marginBottom: 10 
								}}
							onChangeText={(lName) => this.setState({lName})}
						>{user.lName}</TextInput> */}

						<TextInput 
							style={{ backgroundColor: "#c9cacc", 
								borderRadius: 5, width: this.state.textInputWidth, fontSize: 20, marginBottom: 10 
								}}
							onChangeText={(contact) => this.setState({contact})}
						>{user.contact}</TextInput>

						<TouchableOpacity onPress={this.updateProfile} style={{height:30, width:100, justifyContent:"center", backgroundColor:"green", alignItems:"center"}} >
							<Text>Update</Text>
						</TouchableOpacity>
					</ScrollView>
				{/* </View> */}
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