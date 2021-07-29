import firebase from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTH,
    projectId: process.env.PROJECT,
    storageBucket: process.env.STORAGE,
    messagingSenderId: process.env.MESSAGING,
    appId: process.env.APPID,
    measurementId: process.env.MEASURE
  };

const initialFirebase = () => firebase.initializeApp(firebaseConfig);

export {
    initialFirebase
}
