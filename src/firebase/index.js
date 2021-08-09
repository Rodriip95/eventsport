import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_FS_APIKEY,
  authDomain: process.env.REACT_APP_FS_AUTH,
  databaseURL: process.env.REACT_APP_FS_DATABASE,
  projectId: process.env.REACT_APP_FS_PROJECT,
  storageBucket: process.env.REACT_APP_FS_STORAGE,
  messagingSenderId: process.env.REACT_APP_FS_MESSAGING,
  appId: process.env.REACT_APP_FS_APPID,
  measurementId: process.env.REACT_APP_FS_MEASURE
}

firebase.initializeApp(config)

// export const startFirebase = () => firebase.initializeApp(config)

export const db = firebase.firestore()
