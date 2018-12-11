import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBUAagqBEWtudoTwt6mOJCgXY-ujxJZFcU",
  authDomain: "heritage-muttville.firebaseapp.com",
  databaseURL: "https://heritage-muttville.firebaseio.com",
  projectId: "heritage-muttville",
  storageBucket: "heritage-muttville.appspot.com",
  messagingSenderId: "606420258902"
};

firebase.initializeApp(config);
export default firebase;
