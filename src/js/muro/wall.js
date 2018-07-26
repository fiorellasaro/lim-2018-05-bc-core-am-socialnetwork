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

const showPostsHtml = (userWithPost) => {
  postcontainer.innerHTML = '';
  for (const i in userWithPost) {
    postcontainer.innerHTML += ` 
    <div class="col-11" id="postwall" >
    <div id="headerpost-container">
            <button id="initial" class="col-2">N</button>
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
            <a class="dropdown-item dropdown-text" href="#">Editar</a>
            <a class="dropdown-item dropdown-text" href="#">Eliminar</a>
            <a class="dropdown-item dropdown-text" href="#">Guardar</a>
            <a class="dropdown-item dropdown-text" href="#">Cancelar</a>
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

window.showPost  = (callback) =>{
  /* postcontainer.innerHTML = ''; */
  //Acá comenzamos a escuchar por nuevos mensajes usando el evento
  //on child_added
  callback();
  firebase.database().ref().child('users').on('value', snap => {
    const datos = snap.val();
    firebase.database().ref().child('posts').on('value', post => {
      const posts = Object.values(post.val());  
      const userWithPost = posts.map(postElement => {
        for (const key in datos) {
          if(postElement.idUser === key){
            const stats = {
              name: datos[key].username,
              post: postElement.post,
              likes: postElement.likes,
              timeData: postElement.timeData,
            }
            return stats;
          }
        }
      });
    showPostsHtml(userWithPost)
    // console.log(userWithPost)
    });
  });
}
window.createPost  = (callback,currentUser) => { 
  const currentPost = postText.value;
  /* const currentTitle = titleText.value; */
  const datePost = new Date();
  const userId = currentUser.uid
  let postData = {
      idUser: userId,
      post: currentPost,
      // titlePost: currentTitle,
      likes: 0,
      type: 'receta',
      timeData: datePost,
  };

  //para tener una nueva llave en la colección posts
  const newpostKey = firebase.database().ref(`/posts`).push().key;
  let updates = {};
  updates['/posts/' + newpostKey] = postData;
  updates['/user-posts/' + currentUser.uid + '/' + newpostKey] = postData;

  firebase.database().ref().update(updates);
  showPost(callback);
//  return newPostKey;
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
