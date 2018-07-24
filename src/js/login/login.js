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
  .then(function (result) {    
    callback()
  })
  .catch(function (error) {
  });
}
window.sesionFacebook = (callback) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('public_profile');
  firebase.auth().signInWithPopup(provider)
  .then(function (result) {
    callback();
  })
  .catch(function (error) {
  });

}
window.checkUser = () => {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification()
  .then(() => {
  // Email sent.
  }).catch((error) => {
  // An error happened.
  });
}
window.registerUser = (emailVal, rpasswordVal, nameUs, callback) => {
  firebase.auth().createUserWithEmailAndPassword(emailVal, rpasswordVal)
  .then((user) => {
    user.user.updateProfile({ 'displayName': nameUs });
    checkUser();
  })
  .catch((error) => {
    callback(error);
  });
}
window.validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
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