import * as firebase from 'firebase';
import 'firebase/firestore';

//Api details
const config = {
	apiKey: "AIzaSyBDCRldW3dVnX0CA0mdVfO8cuMyV9qC2g0",
    authDomain: "luckvinma.firebaseapp.com",
    databaseURL: "https://luckvinma.firebaseio.com",
    projectId: "luckvinma",
    storageBucket: "luckvinma.appspot.com",
    messagingSenderId: "931542634812"
};

// Initialize Firebase
firebase.initializeApp(config);

export const fb = firebase;
export const database = firebase.firestore();
// export const auth = firebase.auth();
// export const storage = firebase.storage();