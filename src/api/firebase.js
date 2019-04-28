import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};

var config = {
    apiKey: "AIzaSyDc-xfTbo82fHhc0O4Z-f1q3fYR65_ci6k",
    authDomain: "jack-b2599.firebaseapp.com",
    databaseURL: "https://jack-b2599.firebaseio.com",
    projectId: "jack-b2599",
    storageBucket: "jack-b2599.appspot.com",
    messagingSenderId: "584081792995"
  };
  firebase.initializeApp(config)

// firebase.firestore().settings(settings);

export default firebase;