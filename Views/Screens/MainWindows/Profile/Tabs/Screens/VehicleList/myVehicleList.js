import React, { Component } from 'react'
import { Text, View, ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from 'react-native'
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
			vehicleToDelete: null,
			vehicle: null,
			vehicleToEdit: null,
			gotoEdit: false,
			e_brand: "",
			e_model: "",
			e_number: "",
			e_type: ""
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
				database.collection('Vehicles').where('userid','==', this.state.user.uid).onSnapshot(snap => {
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

	handleEdit = () => {
		const l = this.state.vehicle
		this.setState({
			dialogVisible: false,
			gotoEdit: true,
			e_brand: l.details.vehicle_brand,
			e_model: l.details.vehicle_model,
			e_number: l.details.Reg_no,
			vehicleToEdit: l.key
		})
	}

	editVehicle = () => {
		database.collection("Vehicles").doc(this.state.vehicleToEdit).update({
			vehicle_brand: this.state.e_brand,
			vehicle_model: this.state.e_model,
			vehicle_number: this.state.e_number,
		}).then(() => {
			alert("Vehicle Updated")
			this.setState({
				vehicleToEdit: null
			})
		}).catch((error) => {
			console.log(error);
		})
	}


	deleteVehicle = () => {
		this.setState({ dialogVisible: false });
		database.collection("Vehicles").doc(this.state.vehicleToDelete).delete().then(() => {
			console.log("Success");
		}).catch((error) => {
			console.log(error);
		})
	}

	render() {
		const vehicle = this.state
		return (
			<View style={Styles.outerView}>

				<Dialog.Container visible={this.state.dialogVisible}>
					<Dialog.Title>Vehicle Options</Dialog.Title>
					{/* <Dialog.Description>
						Vehicle Options
          				</Dialog.Description> */}
					<Dialog.Button label="Edit" onPress={this.handleEdit} />
					<Dialog.Button label="Delete" onPress={this.deleteVehicle} />
					<Dialog.Button label="Cancle" onPress={this.closeDialog} />
				</Dialog.Container>

				<Text style={{ color: "#878787", fontSize: 20, marginBottom: 10 }}>My Vehicles</Text>
				{this.state.v_list ? (
					// console.log(object)
					!this.state.gotoEdit ? (
						<ScrollView style={Styles.scrollView}>
							{
								this.state.v_list.map((l, i) => (
									<ListItem
										key={i}
										leftAvatar={{ source: { uri: l.details.imgurl } }}
										title={l.details.vehicle_brand + " " + l.details.vehicle_model}
										subtitle={l.details.vehicle_number}
										// onPress={() => this.setState({
										// 	gotoEdit: true,
										// 	e_brand: l.details.vehicle_brand,
										// 	e_model: l.details.vehicle_model,
										// 	e_number: l.details.vehicle_number,
										// 	vehicleToEdit: l.key
										// })}
										onLongPress={() => this.setState({ vehicle: l, dialogVisible: true, vehicleToDelete: l.key })}
										// this.setState({dialogVisible: true, vehicleToDelete:l})
										topDivider={true}
										bottomDivider={true}
										// rightIcon={{ name: 'arrow-right', type: 'font-awesome', style: { marginRight: 10, fontSize: 15 } }}
										chevron
										chevronColor="black"
										containerStyle={{
											// backgroundColor: "red"
										}}
									/>
								))
							}
						</ScrollView>
					) : (
							<ScrollView style={Styles.scrollView}>
								<TouchableOpacity onPress={() => this.setState({
									gotoEdit: false,
									e_brand: "",
									e_model: "",
									e_number: "",
									vehicleToEdit: null
								})}>
									<Text>dsdsdsds</Text>
								</TouchableOpacity>
								<TextInput
									style={{
										backgroundColor: "#c9cacc",
										borderRadius: 5, width: this.state.textInputWidth, fontSize: 20, marginBottom: 10
									}}
									onChangeText={(e_brand) => this.setState({ e_brand })}
								>{vehicle.e_brand}</TextInput>

								<TextInput
									style={{
										backgroundColor: "#c9cacc",
										borderRadius: 5, width: this.state.textInputWidth, fontSize: 20, marginBottom: 10
									}}
									onChangeText={(e_model) => this.setState({ e_model })}
								>{vehicle.e_model}</TextInput>

								<TextInput
									style={{
										backgroundColor: "#c9cacc",
										borderRadius: 5, width: this.state.textInputWidth, fontSize: 20, marginBottom: 10
									}}
									onChangeText={(e_number) => this.setState({ e_number })}
								>{vehicle.e_number}</TextInput>

								<TouchableOpacity onPress={this.editVehicle} style={{ height: 30, width: 100, justifyContent: "center", backgroundColor: "green", alignItems: "center" }} >
									<Text>Update</Text>
								</TouchableOpacity>
							</ScrollView>
						)
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