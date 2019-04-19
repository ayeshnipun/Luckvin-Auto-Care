import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import ProfileAvatar from './ProfileAvatar';

export default class Test extends Component {
	state = {
		name: "John smith",
		profession: "Teacher",
		address: "Jakarta | Indonesia",
		endorsers: 105,
		likes: 45
	}

	render() {
		return (
			<View style={styles.container}>
				<View elevation={5} style={styles.profileCard}>
					<View style={{ flexDirection: 'row' }}>
						{/* <View style={{flexDirection:'column'}}> */}
						<View style={styles.avatarView}>
							<ProfileAvatar size={65} />
						</View>

						{/* </View> */}

						<View style={styles.informationView}>
							<Text style={styles.nameText}>{this.state.name}</Text>
							<Text style={styles.otherText}>{this.state.profession}</Text>
							<Text style={styles.otherText}>{this.state.address}</Text>
						</View>
					</View>

					<View style={{ flexDirection: 'row', marginTop: 18 }}>

						<View style={{ flexDirection: 'row', marginLeft: "2%" }}>
							<View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: 'white', alignItems: 'center', alignContent: 'center' }}>
								<View style={{ marginTop: 4 }}>
									<ProfileAvatar size={26} />
								</View>
							</View >
							<View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: 'white', alignItems: 'center', marginLeft: -10 }}>
								<View style={{ marginTop: 4 }}>
									<ProfileAvatar size={26} />
								</View>
							</View>
							<View style={{ height: 35, width: 35, borderRadius: 50, backgroundColor: 'white', alignItems: 'center', marginLeft: -10 }}>
								<View style={{ marginTop: 4 }}>
									<ProfileAvatar size={26} />
								</View>
							</View>
						</View>

						<View style={{ marginLeft: "4%" }}>
							<Text style={{ fontSize: 16 }}>{this.state.endorsers} endorsers</Text>
						</View>

						<View style={{ flexDirection: 'row', marginLeft: "10%" }}>
							<Icon
								name="thumbsup"
								color="black"
								size={28}
							/>
							<Text style={{ fontSize: 16, marginLeft: 3 }}>{this.state.likes}</Text>
						</View>

						<TouchableOpacity style={styles.plusIconView}>
							{/* <Icon
								name="plus"
								color="white"
								size={28}
							/> */}
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
}
// styles.profileCard

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	profileCard: {
		// flexDirection: 'row',
		marginTop: 10,
		width: "95%",
		height: 200,
		backgroundColor: 'white',
		borderRadius: 20,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 7
		},
		shadowRadius: 5,
		shadowOpacity: 1.0
	},
	avatarView: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 15
	},
	informationView: {
		marginTop: 8
	},
	nameText: {
		fontSize: 28,
		color: 'black',
		marginBottom: 5
	},
	otherText: {
		fontSize: 20,
	},
	plusIconView: {
		width: 30,
		height: 30,
		backgroundColor: '#42d4f4',
		borderRadius: 50,
		alignItems: 'center',
		marginLeft: "9%"
	}
});