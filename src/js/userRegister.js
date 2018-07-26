window.onload = () => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            //ESTAMOS LOGUEADOS
            //Aquí se implementa para que aparezca la pagina principal de la red social
            console.log(JSON.stringify(user));
            // window.location.href = "wall.html"; 
        } else {
            //NO ESTAMOS LOGUEADOS
            //aqui implementar para que al salir, aparezca nuevamente la interfaz del login
        }
    });
}
const registrar = (emailVal, rpasswordVal, nameUs) => {
    firebase.auth().createUserWithEmailAndPassword(emailVal, rpasswordVal)
        .then(function (user) {
            user.user.updateProfile({ 'displayName': nameUs });
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ...
        });
    formRegisterUser.reset();
    valido.classList.remove('fa-check');
    email.classList.remove('danger');
}

const ingresar = (emailVal, passwordVal) => {
    firebase.auth().signInWithEmailAndPassword(emailVal, passwordVal)
        .then(function (user) {
            // showGreeting(user.user);          
            window.location.href = "wall.html";
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            // ...
        });
    document.getElementById('login').reset();
}
const expresion = RegExp('\\w+@\\w+\\.+[a-z]');

email.addEventListener('input', function () {
    const campo = event.target;

    valido.classList.add('fa-times');
    email.classList.add('danger');
    if (expresion.test(campo.value)) {
        email.classList.replace('danger', 'valid')
        valido.classList.replace('fa-times', 'fa-check');
    } else {
        email.classList.replace('valid', 'danger');
        valido.classList.replace('fa-check', 'fa-times');
    }
});

password.addEventListener('input', function () {
    const campo = event.target;
    validpwd.classList.add('fa-times');
    password.classList.add('danger');
    if (campo.value.length >= 8) {
        password.classList.replace('danger', 'valid')
        validpwd.classList.replace('fa-times', 'fa-check');
    } else {
        password.classList.replace('valid', 'danger');
        validpwd.classList.replace('fa-check', 'fa-times');
    }
});

repeatPassword.addEventListener('input', function () {
    const campo = event.target;
    valid.classList.add('fa-times');
    repeatPassword.classList.add('danger');
    if (campo.value === password.value) {
        repeatPassword.classList.replace('danger', 'valid')
        valid.classList.replace('fa-times', 'fa-check');
    } else {
        repeatPassword.classList.replace('valid', 'danger');
        valid.classList.replace('fa-check', 'fa-times');
    }
});
name.addEventListener('input', function () {
    const campo = event.target;
    validusr.classList.add('fa-times');
    name.classList.add('danger');
    if (campo.value.length >= 3) {
        name.classList.replace('danger', 'valid')
        validusr.classList.replace('fa-times', 'fa-check');
    } else {
        name.classList.replace('valid', 'danger');
        validusr.classList.replace('fa-check', 'fa-times');
    }
});

const sesionGoogle = () => {
    if (!firebase.auth().currentUser) {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {

                window.location.href = "wall.html";
                console.log(user);

            })

            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const errorEmail = error.email;
                const credential = error.credential;
                if (errorCode === 'auth/account-exits-with-different-credential') {
                    alert('Es el mismo usuario');
                }
            });
    } else {
        firebase.auth().signOut();
    }
}
const sesionFacebook = () => {
    if (!firebase.auth().currentUser) {
        let provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('public_profile');
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {

                window.location.href = "wall.html";
                console.log(user);

            })
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const errorEmail = error.email;
                const credential = error.credential;
                if (errorCode === 'auth/account-exits-with-different-credential') {
                    alert('Es el mismo usuario');
                }
            });
    } else {
        firebase.auth().signOut();
    }
}
const showGreeting = (user) => {

    document.getElementById('saludo').innerHTML = `<div class="alert alert-success mb-1" role="alert">
          <h4 class="alert-heading">Bienvenido  ${user.displayName}!</h4>
          <p>Aqui podras hablar de comida cuando quieras, como quieras.</p>
          <button type="button" id="cerrar" onClick="logout()" class="btn btn-light">Cerrar Sesión</button>
        </div>`;


}
const logout = () => {
    document.getElementById('saludo').innerHTML = '';
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        document.getElementById('saludo').innerHTML = '';
        console.log('saliendo');

    }).catch(function (error) {
        // An error happened.
        console.log(error);

    });
    document.getElementById('signUp').classList.replace('none', 'block');
    name.classList.remove('valid');
    password.classList.remove('valid');
    repeatPassword.classList.remove('valid');
    email.classList.remove('valid');
    valid.classList.remove('fa-check');
    validpwd.classList.remove('fa-check');
    validusr.classList.remove('fa-check');
}

document.getElementById('signFacebook').addEventListener('click', function () {
    sesionFacebook();
    document.getElementById('signUp').classList.replace('block', 'none');

});
document.getElementById('signGoogle').addEventListener('click', function () {
    sesionGoogle();
    document.getElementById('signUp').classList.replace('block', 'none');
});
document.getElementById('signIFacebook').addEventListener('click', function () {

    sesionFacebook();
    document.getElementById('signIn').classList.replace('block', 'none');
});
document.getElementById('signIGoogle').addEventListener('click', function () {
    sesionGoogle();
    document.getElementById('signIn').classList.replace('block', 'none');
});


btnEnviar.addEventListener('click', function () {
    let rpasswordVal = repeatPassword.value;
    let emailVal = email.value;
    let nameVal = name.value;
    let passwordVal = password.value;

    if (nameVal === '' || emailVal === '' || passwordVal === '' || rpasswordVal === '') {
        name.classList.add('danger');
        email.classList.add('danger');
        password.classList.add('danger');
        repeatPassword.classList.add('danger');
        alert('Todos los campos son requeridos')
    } else if (passwordVal.length < 8) {
        alert('password muy corto')
    } else if (passwordVal !== rpasswordVal) {
        alert('password no coinciden');
    } else if (!expresion.test(emailVal)) {
        alert('correo invalido');
    } else {
        // alert('datos correctos');
        // const nameUser = name.value;
        const emailTo = emailVal.replace(/ /g, '');
        console.log(emailTo, nameVal)
        registrar(emailTo, rpasswordVal, nameVal);

    }
})

document.getElementById('signInButton').addEventListener('click', function () {
    const emailSing = document.getElementById('email1');
    const passwordSing = document.getElementById('pwd1');
    let emailVal = emailSing.value;
    let passwordVal = passwordSing.value;

    if (emailVal === '' || passwordVal === '') {
        emailSing.classList.add('danger');
        passwordSing.classList.add('danger');
        alert('Todos los campos son requeridos')
    } else if (!expresion.test(emailSing.value)) {
        alert('correo invalido o contraseña');
    } else {
        const emailTo = emailVal.replace(/ /g, '');
        ingresar(emailTo, passwordVal);
    }
})



document.getElementById("signUpLink").addEventListener('click', () => {

    document.getElementById("signUp").classList.replace('block', 'none');
    document.getElementById("signIn").classList.replace('none', 'block');

});

document.getElementById("signInLink").addEventListener('click', () => {

    document.getElementById("signUp").classList.replace('none', 'block');
    document.getElementById("signIn").classList.replace('block', 'none');

});
