//Cerrando sesion
window.logoutwall = (callback) => {
  firebase.auth().signOut().then(function () {
    // window.location.href = "index.html";
    // Sign-out successful.
    callback()
    console.log('saliendo');
  }).catch(function (error) {
    // An error happened.
    console.log(error);
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
              }
              return stats;
            }
          }
      });
      console.log(userWithPost)
      // postcontainer.innerHTML = '';
      for (const i in userWithPost) {
        postcontainer.innerHTML += `
        <p>name: ${userWithPost[i].name}</p>
        <p>likes:  ${userWithPost[i].likes}</p>
        <p>${userWithPost[i].post}</p> 
        `;
      }
      });
    });
    /* firebase.database().ref(`/posts`)
    .on('child_added', (newPost)=>{
        postcontainer.innerHTML += `
        <p>name: ${newPost}
        <p>likes:  ${newPost.val().likes}</p>
        <p>${newPost.val().post}</p> 
        `;
    });  */
}
window.createPost  = (callback,currentUser) =>{ 
  const currentPost = postText.value;
  /* const currentTitle = titleText.value; */
  const userId = currentUser.uid
  let postData = {
      idUser: userId,
      post: currentPost,
      // titlePost: currentTitle,
      likes: 0,
      type: 'receta',
      timeData: firebase.database.ServerValue.TIMESTAMP,
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




