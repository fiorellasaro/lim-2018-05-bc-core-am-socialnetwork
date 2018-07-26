/* const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyATCT7ucluJ0oGG7LdZCcmJSixpGkVar1Q",
  authDomain: "usuarios-436bc.firebaseapp.com",
  databaseURL: "https://usuarios-436bc.firebaseio.com",
  projectId: "usuarios-436bc",
  storageBucket: "usuarios-436bc.appspot.com",
  messagingSenderId: "1028309699631"
  };
firebase.initializeApp(config); */
window.sesionGoogle = (callback) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');
  firebase.auth().signInWithPopup(provider)
  .then(() => {    
    callback()
  })
  .catch( (error) => {
  });
}
window.sesionFacebook = (callback) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  firebase.auth().signInWithPopup(provider)
  .then(() => {
    callback();
  })
  .catch((error) => {
  });

}

window.registerUser = (emailVal, rpasswordVal, nameUs, callback) => {
  firebase.auth().createUserWithEmailAndPassword(emailVal, rpasswordVal)
  .then((user) => {
    console.log(user);
    user.user.updateProfile({ 'displayName': nameUs });
    firebase.database().ref('users/' + user.user.uid).set({
    username: nameUs,
    email: user.user.email
  });
    

  })
  .catch((error) => {
    callback(error);
  });
}

window.loginUser = (emailVal, passwordVal,callback,callbackError) => {
  firebase.auth().signInWithEmailAndPassword(emailVal, passwordVal)
  .then((user) => {
    callback();
  })
  .catch((error) => {
    callbackError(error);
    
  });
}