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
    user.user.updateProfile({ 'displayName': nameUs });
    // window.location.href = 'wall.html'
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