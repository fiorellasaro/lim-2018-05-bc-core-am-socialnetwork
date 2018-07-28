const textPost = document.getElementById('postText');
const privacityPost = document.getElementById('selectPrivacy'); 
const btnEnviar = document.getElementById('publicButton');

const redirectionLogin = () => {
    window.location.href = "index.html";
}
const addClass = () => {
  postcontainer.innerHTML = '';
  document.getElementById('post').classList.replace('inherit', 'none');
  document.getElementById('postcontainer').classList.replace('none', 'inherit');
  document.getElementById('posting').classList.replace('none', 'inherit');   
}

firebase.auth().onAuthStateChanged((user) =>{
  if (user) {
    const currentUser = firebase.auth().currentUser;
    firebase.database().ref('users/' + currentUser.uid).set({
      username: currentUser.displayName,
      email: currentUser.email,
      photoURL: (currentUser.photoURL !== null) ? currentUser.photoURL : 'https://image.flaticon.com/icons/svg/1034/1034680.svg',
    });
    const sendPost = () => {
      postcontainer.innerHTML = '';    
      sendPostFirebase(addClass, currentUser,textPost,privacityPost);
    }
    btnEnviar.addEventListener('click', sendPost, false);
    document.getElementById('posting').addEventListener('click', () =>{
      postcontainer.innerHTML = '';
      document.getElementById('post').classList.replace('none', 'inherit');
      document.getElementById('postcontainer').classList.replace('inherit', 'none');
      document.getElementById('posting').classList.replace('inherit', 'none');
    });
    showPost(addClass);
    showProfile(currentUser);
  } else {
  //NO ESTAMOS LOGUEADOS
  //aqui implementar para que al salir, aparezca nuevamente la interfaz del login
  }
}); 

document.getElementById('logout').addEventListener('click', () =>{
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


document.getElementById('backIcon').addEventListener('click',  () =>{
  document.getElementById('post').classList.replace('inherit', 'none');
  document.getElementById('postcontainer').classList.replace('none', 'inherit');
  document.getElementById('posting').classList.replace('none', 'inherit');   
});

document.getElementById('backButton').addEventListener('click', () =>{
  document.getElementById('postcontainer').classList.replace('none', 'inherit');
  document.getElementById('posting').classList.replace('none', 'inherit');   

  document.getElementById('logoPrincipal').classList.replace('none', 'inherit');
  document.getElementById('search').classList.remove('none');

  document.getElementById('settingsText').classList.replace('inherit', 'none');
  document.getElementById('settingsOptions').classList.replace('inherit', 'none');
});


document.getElementById('settingsIcon').addEventListener('click', () =>{
  document.getElementById('logoPrincipal').classList.replace('inherit', 'none');
  document.getElementById('search').classList.add( 'none');
  document.getElementById('settingsIcon').classList.add('left');
  document.getElementById('settingsText').classList.replace('none', 'inherit');
  document.getElementById('postcontainer').classList.replace('inherit', 'none');
  document.getElementById('settingsOptions').classList.replace('none', 'inherit');
  document.getElementById('posting').classList.replace('inherit', 'none');   
});


document.getElementById("posting").addEventListener('mouseover', () =>{
  document.getElementById('posting').src = "img/pencil-color.png"; 
});

document.getElementById("posting").addEventListener('mouseout', () =>{
  document.getElementById('posting').src = "img/pencil.png"; 
});


document.getElementById("profileIcon").addEventListener('click', () =>{
  profileIcon.src = "img/chef-on.png"; 
  postcontainer.classList.replace('inherit', 'none');
  profilecontainer.classList.replace('none', 'inherit');
  userPostcontainer.classList.replace('none', 'inherit');
  inspirationIcon.src = "img/dust.png";  
});

document.getElementById("inspirationIcon").addEventListener('click', () =>{
  inspirationIcon.src = "img/dust-on.png";
  profileIcon.src = "img/chef.png"; 
  postcontainer.classList.replace('none', 'inherit');
  profilecontainer.classList.replace('inherit', 'none'); 
  userPostcontainer.classList.replace('inherit', 'none');
});


