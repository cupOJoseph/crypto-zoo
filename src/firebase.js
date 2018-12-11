import firebase from 'firebase'

var config = {
  apiKey: process.env.MUTTVILLE_KEY,
  authDomain: "heritage-muttville.firebaseapp.com",
  databaseURL: "https://heritage-muttville.firebaseio.com",
  projectId: "heritage-muttville",
  storageBucket: "heritage-muttville.appspot.com",
  messagingSenderId: "606420258902"
};

firebase.initializeApp(config);
export default firebase;
