//Cerrando sesion
window.logoutwall = (callback) => {
  firebase.auth().signOut().then(() => {
    // window.location.href = "index.html";
    // Sign-out successful.
    callback()
    console.log('saliendo');
  }).catch((error) => {
  });

}

window.showPostHtml = (userWithPost) => {
  postcontainer.innerHTML = '';
    for (const i in userWithPost) {
      if(userWithPost[i].privacy === 'publico')
      postcontainer.innerHTML += ` 
      <div class="col-11 postwall" id="${userWithPost[i].id}" >
      <div id="headerpost-container">
              <input type="button"  class="col-2" hidden/>
              <img src="${userWithPost[i].photoUser}" class="img-user" id="initial">
              <div id="infoPost" class="col-6">
                      <h1 id="creatorName">${userWithPost[i].name}</h1>
                      <p id="datePost">${userWithPost[i].timeData}</p>
                      <img src="img/icon.png" alt="private icon" id="privateIcon">
              </div>
      <div id="dropdown-container">
          <button type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="img/more.png" alt="more icon" id="moreIcon">
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="dropdownPost">
              <a class="dropdown-item dropdown-text" href="#" onclick="postEdit('${userWithPost[i].id}','${userWithPost[i].post}','${userWithPost[i].privacy}','${userWithPost[i].likes}')">Editar</a>
              <a class="dropdown-item dropdown-text" href="#" onclick="postDelete('${userWithPost[i].id}')">Eliminar</a>
              <a class="dropdown-item dropdown-text" href="#" >Guardar</a>
              <a class="dropdown-item dropdown-text" href="#" >Cancelar</a>
          </div>
      </div>          
      </div>
      <section id="postSection">
          <p id="postTextSection" class="col-12">${userWithPost[i].post}</p>
          <p id="postImageSection" class="col-12">Foto</p>      
      </section> 
      <div id="like-container">
              <img src="img/cookie.png" alt="cookie like" id="likeIcon">
              <p id="likeText"> ${userWithPost[i].likes} Me gusta</p>
      </div> 
    </div> 
      `;
    }
}
window.postDelete = (idpost) => {
  const userId = firebase.auth().currentUser.uid;
  firebase.database().ref().child('/user-posts/' + userId + '/' + idpost).remove();
  firebase.database().ref().child('posts/' + idpost).remove();
}
const create = 'Publicar';
const update = 'Guardar';
let modo = create;
let editPost = {
  idPost: '',
  post: '',
  privacyEdit: '',
  like: '',
}
window.postEdit = (idPost, post, privacyEdit, like) => {
  document.getElementById('post').classList.replace('none', 'inherit');
  document.getElementById('postcontainer').classList.replace('inherit', 'none');
  document.getElementById('posting').classList.replace('inherit', 'none');
  btnEnviar.value = update;
  modo = update;
  editPost.idPost = idPost;
  editPost.post = post;
  editPost.privacyEdit = privacyEdit;
  editPost.like = like;
  postEditNow(post,privacyEdit)
}

window.postEditNow = (post, privacy) => {
  textPost.value = post;
  privacityPost.value = privacy;
}

window.showPost  = (callback) => {
  /* postcontainer.innerHTML = ''; */
  //Acá comenzamos a escuchar por nuevos mensajes usando el evento
  callback();
  firebase.database().ref().child('users').on('value', snap => {
    const datos = snap.val();
    firebase.database().ref().child('posts').on('value', post => {
      const array = [];
      const posts = post.val();
      for (const i in posts) {
        for (const key in datos) {
          if(posts[i].idUser === key){
            const stats = {
              id: i,
              name: datos[key].username,
              photoUser: datos[key].photoURL, 
              post: posts[i].post,
              likes:posts[i].likes,
              timeData: posts[i].timeData,
              privacy: posts[i].privacy,
            }
            array.push(stats)
          }
        }
      }
      console.log(array)
      showPostHtml(array)
    })
  });
 
}

window.sendPostFirebase = (callback,currentUser,textPost,privacy) => {
  switch (modo) {
    case create:
    const userId = currentUser.uid
    let postDat = {
        idUser: userId,
        post: textPost.value,
        privacy: privacy.value,
        likes: 0,
        type: 'receta',
        timeData: new Date(),
    };
    //para tener una nueva llave en la colección posts
    const newpostKey = firebase.database().ref(`/posts`).push().key;
    let updates = {};
    updates['/posts/' + newpostKey] = postDat;
    updates['/user-posts/' + currentUser.uid + '/' + newpostKey] = postDat;
    firebase.database().ref().update(updates);
    showPost(callback);
    break;
    case update:
    let postData = {
      idUser: currentUser.uid,    
      post: textPost.value,
      privacy: privacityPost.value,
      likes: parseInt(editPost.like),
      type: 'receta',
      timeData: new Date(),
    };
    const updatesUser = {};
    const updatesPost = {};
    updatesUser['/user-posts/' + currentUser.uid + '/' + editPost.idPost] = postData;
    updatesPost['/posts/' + editPost.idPost ] = postData;
    firebase.database().ref().update(updatesUser);
    firebase.database().ref().update(updatesPost); 
    btnEnviar.value = create;
      modo = create;
      showPost(callback);
    break;
  }
}



































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
