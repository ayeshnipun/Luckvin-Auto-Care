import React, { Component } from 'react'
import { Text, View, ActivityIndicator, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, ListItem, Button, Image, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { fb, database } from '../../../../../../../firebaseConfig/config'
import Dialog from 'react-native-dialog';
import Styles from './Styles';

export default class myVehicleList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			v_list: [],
			dialogVisible: false,
			vehicleToDelete: null
		};

	}

	componentDidMount() {
		this.getVehiclesFromFirebase();
	}

	getVehiclesFromFirebase() {
		fb.auth().onAuthStateChanged(function (user) {
			if (user) {
				this.setState({
					user
				});
				database.collection('Users').doc(this.state.user.uid)
					.collection('Vehicles').onSnapshot(snap => {
						var vehicles = [];
						snap.forEach(function (doc) {
							// cities.push(doc.data().name);
							vehicles.push({ key: doc.id, details: doc.data() });
						});
						this.setState({
							v_list: vehicles
						})
						// console.log(this.state.v_list)
						// snap.docChanges().forEach(change => {
						// 	this.setState(prevState => ({
						// 		v_list: [...prevState.v_list, { key: change.doc.id, details: change.doc.data() }]
						// 	}))
						// });
					});
			}
		}.bind(this));
	}

	handleLongPress = (vehicle) => {

	}

	closeDialog = () => {
		this.setState({ dialogVisible: false });
	};

	editVehicle = () => {
		this.setState({ dialogVisible: false });
	}
	
	deleteVehicle = () => {
		this.setState({ dialogVisible: false });
		database.collection("Users").doc(this.state.user.uid).collection("Vehicles").doc(this.state.vehicleToDelete).delete().then(() => {
			console.log("Success");
		}).catch((error) => {
			console.log(error);
		})
	}

	render() {
		return (
			<View style={Styles.outerView}>

				<Dialog.Container visible={this.state.dialogVisible}>
					<Dialog.Title>Vehicle Options</Dialog.Title>
					{/* <Dialog.Description>
						Vehicle Options
          				</Dialog.Description> */}
					<Dialog.Button label="Edit" onPress={this.editVehicle} />
					<Dialog.Button label="Delete" onPress={this.deleteVehicle} />
					<Dialog.Button label="Cancle" onPress={this.closeDialog} />
				</Dialog.Container>

				<Text style={{ color: "#878787", fontSize: 20, marginBottom: 10 }}>My Vehicles</Text>
				{this.state.v_list ? (
					// console.log(object)
					<ScrollView style={Styles.scrollView}>
						{
							this.state.v_list.map((l, i) => (
								<ListItem
									key={i}
									leftAvatar={{ source: { uri: l.details.vehicle_image } }}
									title={l.details.vehicle_brand + " " + l.details.vehicle_model}
									subtitle={l.details.vehicle_number}
									// leftIcon={{ name: 'av-timer' }}
									onPress={() => console.log(l)}
									onLongPress={() => this.setState({dialogVisible: true, vehicleToDelete:l.key})}
									// this.setState({dialogVisible: true, vehicleToDelete:l})
									topDivider={true}
									bottomDivider={true}
									// rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: { marginRight: 10, fontSize: 15 } }}
									chevron
									chevronColor="black"
									// chevronSize={25}

									containerStyle={{
										// backgroundColor: "red"
									}}
								/>
							))
						}
					</ScrollView>
				) : (
						<View style={{
							flex: 1,
							justifyContent: 'center',
							flexDirection: 'row',
							justifyContent: 'space-around',
							padding: 10
						}}
						>
							<ActivityIndicator size="small" color="#00ff00" />
						</View>
					)}
			</View>
		)
	}
}

myVehicleList.navigationOptions = {
	tabBarIcon: ({ tintColor, focused }) => (
		<Icon
			name="ios-car"
			size={25}
			color={tintColor}
		/>
	)
} 