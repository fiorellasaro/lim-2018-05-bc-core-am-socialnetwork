const formRegisterUser = document.getElementById('register-user');
const btnEnviar = document.getElementById('register');
let email = document.getElementById('email');
let name = document.getElementById('usr-name');
const password = document.getElementById('pwd');
const rpassword = document.getElementById('rpwd');
const registrar = (emailVal, rpasswordVal) => {
  firebase.auth().createUserWithEmailAndPassword(emailVal, rpasswordVal)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ...
    });
  formRegisterUser.reset();
}
btnEnviar.addEventListener('click', function () {

const expresion = RegExp('\\w+@\\w+\\.+[a-z]');
  if (name.value === '' || email.value === '' || password.value === '' || rpassword.value === '') {
    alert('son campos requeridos');
  } else if (password.value.length < 8) {
    alert('pwd muy corto')
  } else if (password.value !== rpassword.value) {
    alert('pwd no coinciden');
  } else if(!expresion.test(email.value)){
    alert('correo invalido');
  } else {
    alert('datos correctos');
    const emailTo = email.value.replace(/ /g,'');
    registrar(emailTo,rpassword.value);
  }

})