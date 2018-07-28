const redirectionLogin = () => {
    window.location.href = "index.html";
}
const addClass = () => {
  postcontainer.innerHTML = '';
  document.getElementById('post').classList.replace('inherit', 'none');
  document.getElementById('postcontainer').classList.replace('none', 'inherit');
  document.getElementById('posting').classList.replace('none', 'inherit');   
}
const textPost = document.getElementById('postText');
const privacityPost = document.getElementById('selectPrivacy'); 
const btnEnviar = document.getElementById('publicButton');
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const currentUser = firebase.auth().currentUser;
    firebase.database().ref('users/' + currentUser.uid).set({
    username: currentUser.displayName,
    email: currentUser.email,
    photoURL: (currentUser.photoURL !== null) ? currentUser.photoURL : 'https://image.flaticon.com/icons/svg/1034/1034680.svg',
  });
 const btnEnviar = document.getElementById('publicButton');
  const sendPost = () => {
    postcontainer.innerHTML = '';    
    sendPostFirebase(addClass, currentUser,textPost,privacityPost)

  }
    btnEnviar.addEventListener('click',sendPost,false);
  /* do
  cument.getElementById('logout').addEventListener('click', logoutwall); */
  document.getElementById('posting').addEventListener('click', () =>{
    postcontainer.innerHTML = '';
    document.getElementById('post').classList.replace('none', 'inherit');
    document.getElementById('postcontainer').classList.replace('inherit', 'none');
    document.getElementById('posting').classList.replace('inherit', 'none');
  });
    showPost(addClass);
  } else {
  //NO ESTAMOS LOGUEADOS
  //aqui implementar para que al salir, aparezca nuevamente la interfaz del login
  }
}); 


  document.getElementById('logout').addEventListener('click', function (){
    logoutwall(redirectionLogin)
  });
  

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
/* 

  btnUpdate.addEventListener('click', () => {
    const newUpdate = document.getElementById(newPost);
    const nuevoPost = {
      body: newUpdate.value,
    };

    var updatesUser = {};
    var updatesPost = {};

    updatesUser['/user-posts/' + userId + '/' + newPost] = nuevoPost;
    updatesPost['/posts/' + newPost ] = nuevoPost;

    firebase.database().ref().update(updatesUser);
    firebase.database().ref().update(updatesPost);
    
  });
 */

