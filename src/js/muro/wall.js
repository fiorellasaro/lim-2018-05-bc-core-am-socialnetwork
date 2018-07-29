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
    // console.log(userWithPost)
    postcontainer.innerHTML = '';
    for (const i in userWithPost) {
      postcontainer.innerHTML += ` 
      <div id="postwall" >
          <div id="headerpost-container">
                  <button class="initial">N</button>
                  <div id="infoPost" class="col-8">
                  <div id="creatorNameContainer">
                      <h1 class="creatorName">${userWithPost[i].name}</h1>
                  </div>  
                      
                      <p id="datePost" class="col-7">${userWithPost[i].timeData}</p>
                      <img src="img/icon.png" alt="private icon" id="privateIcon">
                  </div>
                  <div id="dropdown-container" class="show">
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
    });
  });
}

window.showProfile  = (currentUser) =>{
    
    profilecontainer.innerHTML = `
        <div class="userInfo col-12">
                <button class="initial col-12" id="userButton">N</button>
                <h1 class="creatorName col-12" id="profileName">${currentUser.displayName}</h1>

                <table  class="col-7" id="tableInfo">
                        <thead id="tablever">
                          <tr>
                            <th scope="col">Post</th>
                            <th scope="col">Siguiendo</th>
                            <th scope="col">Seguidores</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>0</td>
                            <td>0</td>
                            <td>0</td>
                          </tr>
                        </tbody>
                </table>
        </div>
        <div class="none" id="postMenuContainer">
            <h3 class="none" id="titlePostMenu">Mis Posts</h3>
            <div class="col-12" role="group"  id="menuProfile">
                      <button type="button" class="dropdown-toggle col-6 menuButton" data-toggle="dropdown" >
                            <img class="iconsProfile" id="inspirationIconProfile" src="img/dust-on.png" alt="inspiration icon">
                        Inspiración
                      </button>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="#"> <img class="iconsProfile" id="marketIconProfile" src="img/cart-on.png" alt="sell/buy icon"> Market</a>
                        <a class="dropdown-item" href="#"> <img class="iconsProfile" id="menuIconProfile" src="img/menu-on.png" alt="recepy icon"> Recetas</a>
                        <a class="dropdown-item" href="#"> <img class="iconsProfile" id="questionIconProfile" src="img/question-on.png" alt="doubts icon"> Dudas</a>
                      </div>
                    <button type="button" class="col-5 menuButton"> <img class="iconsProfile" src="img/star.png" alt="fav icon">Favoritos</button>
            </div>
        </div>        
        `;


        firebase.database().ref().child('user-posts/'+currentUser.uid).on('value', snap => {
          const datos = snap.val();
          const datosKey = Object.keys(datos);
          userPostcontainer.innerHTML = '';
          for (const key of datosKey) {
            userPostcontainer.innerHTML += ` 
            <div id="postwall" >
                <div id="headerpost-container">
                        <button class="initial">N</button>
                        <div id="infoPost" class="col-8">
                            <h1 class="creatorName">${currentUser.displayName}</h1>
                            <p id="datePost" class="col-8">${datos[key].timeData}</p>
                            <img src="img/icon.png" alt="private icon" id="privateIcon">
                        </div>
                        <div id="dropdown-container" class="show">
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
                    <p id="postTextSection" class="col-12">${datos[key].post}</p>
                    <p id="postImageSection" class="col-12">Foto</p>      
                </section> 
                <div id="like-container">
                    <img src="img/cookie.png" alt="cookie like" id="likeIcon">
                    <p id="likeText"> ${datos[key].likes} Me gusta</p>
                </div> 
            </div> 
            `;
          }
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
