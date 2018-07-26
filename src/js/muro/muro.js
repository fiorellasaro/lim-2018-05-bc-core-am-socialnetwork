const userContainer = document.getElementById('user-container');
const redirectionLogin = () => {
    window.location.href = "index.html";
}
const addClass = () => {
    
  postcontainer.innerHTML = '';
    document.getElementById('post').classList.replace('inherit', 'none');
    document.getElementById('postcontainer').classList.replace('none', 'inherit');
}

  firebase.auth().onAuthStateChanged((user) =>{
    if (user) {
      console.log(user);
    const currentUser = firebase.auth().currentUser;
      firebase.database().ref('users/' + currentUser.uid).set({
      username: currentUser.displayName,
      email: currentUser.email
    }); 
    
    document.getElementById('publicButton').addEventListener('click', function (){
      createPost(addClass, currentUser)
    });
    /* document.getElementById('logout').addEventListener('click', logoutwall); */
    document.getElementById('posting').addEventListener('click', () =>{
      postcontainer.innerHTML = '';
      document.getElementById('post').classList.replace('none', 'inherit');
      document.getElementById('postcontainer').classList.replace('inherit', 'none');
    });
      showPost(addClass);
    //ESTAMOS LOGUEADOS
    //Aquí se implementa para que aparezca la pagina principal de la red social
     
      // console.log(JSON.stringify(user));
    } else {
    //NO ESTAMOS LOGUEADOS
    //aqui implementar para que al salir, aparezca nuevamente la interfaz del login
    }
  }); 


  document.getElementById('logout').addEventListener('click', function (){
    logoutwall(redirectionLogin)
  }
  );


// function toggleStar(postRef, uid) {
//   postRef.transaction(function(post) {
//     if (post) {
//       if (post.stars && post.stars[uid]) {
//         post.starCount--;
//         post.stars[uid] = null;
//       } else {
//         post.starCount++;
//         if (!post.stars) {
//           post.stars = {};
//         }
//         post.stars[uid] = true;
//       }
//     }
//     return post;
//   });
// }