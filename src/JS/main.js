
     // Initialize Firebase
     var config = {
        apiKey: "AIzaSyATCT7ucluJ0oGG7LdZCcmJSixpGkVar1Q",
        authDomain: "usuarios-436bc.firebaseapp.com",
        databaseURL: "https://usuarios-436bc.firebaseio.com",
        projectId: "usuarios-436bc",
        storageBucket: "usuarios-436bc.appspot.com",
        messagingSenderId: "1028309699631"
      };
      firebase.initializeApp(config);
  


const formRegisterUser = document.getElementById('register-user');
const btnEnviar = document.getElementById('submitbutton');
let email = document.getElementById('email');
let name = document.getElementById('usr');
const password = document.getElementById('pwd');
const rpassword = document.getElementById('rpwd');

const registrar = (emailVal, rpasswordVal, nameUs) => {
  firebase.auth().createUserWithEmailAndPassword(emailVal, rpasswordVal)
  .then(function (user) {
    console.log(user.user)
    return user.user.updateProfile({'displayName': nameUs});
  })
  .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ...
    });
  formRegisterUser.reset();
}
const expresion = RegExp('\\w+@\\w+\\.+[a-z]');
document.getElementById('email').addEventListener('input', function() {
 const campo = event.target;

 const valido = document.getElementById('emailOK');
valido.classList.add('fa-times');
  //Se muestra un texto a modo de ejemplo, luego va a ser un icono
  if (expresion.test(campo.value)) {
    valido.classList.replace('fa-times','fa-check');
  } else {
    valido.classList.replace('fa-check','fa-times');
  }
});
btnEnviar.addEventListener('click', function () {


 /*  if (name.value === '' || email.value === '' || password.value === '' || rpassword.value === '') {
    alert('son campos requeridos');
  } else if (password.value.length < 8) {
    alert('pwd muy corto')
  } else if (password.value !== rpassword.value) {
    alert('pwd no coinciden');
  } else if(!expresion.test(email.value)){
    alert('correo invalido');
  } else {
    alert('datos correctos');*/
    const nameUser =name.value;
    const emailTo = email.value.replace(/ /g,''); 
    registrar(emailTo,rpassword.value,nameUser);
  //}

}) 
   