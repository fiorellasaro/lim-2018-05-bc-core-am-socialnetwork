window.onload = () => {
    firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
        const currentUser = firebase.auth().currentUser;
        firebase.database().ref('users/' + currentUser.uid).set({
        username: currentUser.displayName,
        email: currentUser.email
      });
      //ESTAMOS LOGUEADOS
      //Aquí se implementa para que aparezca la pagina principal de la red social
        showPost();
        console.log(JSON.stringify(user));
      } else {
      //NO ESTAMOS LOGUEADOS
      //aqui implementar para que al salir, aparezca nuevamente la interfaz del login
      }
    }); 
  }
const redirectionLogin = () => {
    window.location.href = "index.html";
}
const addClass = () => {
    
    document.getElementById('post').classList.replace('inherit', 'none');
    document.getElementById('postcontainer').classList.replace('none', 'inherit');
}
document.getElementById('publicButton').addEventListener('click', createPost(addClass));
/* document.getElementById('logout').addEventListener('click', logoutwall); */
document.getElementById('posting').addEventListener('click', () =>{
    postcontainer.innerHTML = '';
    document.getElementById('post').classList.replace('none', 'inherit');
    document.getElementById('postcontainer').classList.replace('inherit', 'none');
});

document.getElementById('logout').addEventListener('click',logoutwall(redirectionLogin));