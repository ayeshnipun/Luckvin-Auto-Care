import * as firebase from 'firebase';
import 'firebase/firestore';

//Api details
const config = {
    apiKey: "AIzaSyBQ5Ch6-VYLZi7WZBaHhKVU35MxoWo2nCA",
    authDomain: "luckvin-auto-car-1554607918933.firebaseapp.com",
    databaseURL: "https://luckvin-auto-car-1554607918933.firebaseio.com",
    projectId: "luckvin-auto-car-1554607918933",
    storageBucket: "luckvin-auto-car-1554607918933.appspot.com",
    messagingSenderId: "270032302266"
};

// Initialize Firebase
firebase.initializeApp(config);

export const fb = firebase;
export const database = firebase.firestore();
// export const auth = firebase.auth();
export const storage = firebase.storage();

// initializeFirebase = () => {
//     const fb = require("firebase");
  
//     // Initialize Firebase
//     var config = {
//         apiKey: "AIzaSyBDCRldW3dVnX0CA0mdVfO8cuMyV9qC2g0",
//         authDomain: "luckvinma.firebaseapp.com",
//         databaseURL: "https://luckvinma.firebaseio.com",
//         projectId: "luckvinma",
//         storageBucket: "luckvinma.appspot.com",
//         messagingSenderId: "931542634812"
//     };
//     firebase.initializeApp(config);
  
//     //inicializando o firestore
//     const firestore = require("firebase/firestore");
//     database = fb.firestore();
//     database.settings({ timestampsInSnapshots: true });
//   }
  
//   componentWillMount = () => {
//     this.initializeFirebase();
//   }