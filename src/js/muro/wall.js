   //Cerrando sesion
window.logoutwall = (callback) => {
  firebase.auth().signOut().then(function () {
    // window.location.href = "index.html";
    // Sign-out successful.
    console.log('saliendo');
  }).catch(function (error) {
    // An error happened.
    console.log(error);
  });

}
window.showPost  = (callback) =>{
    const currentUser = firebase.auth().currentUser;
    /* postcontainer.innerHTML = ''; */
    //Acá comenzamos a escuchar por nuevos mensajes usando el evento
    //on child_added
    firebase.database().ref(`/posts`)
    .on('child_added', (newPost)=>{
        postcontainer.innerHTML += `
        <p>likes:  ${newPost.val().likes}</p>
        <p>${newPost.val().post}</p> 
        `;
    }); 
}
window.createPost  = (callback) =>{ 
  const currentUser = firebase.auth().currentUser;
  console.log(currentUser);
  
  const currentPost = postText.value;
  /* const currentTitle = titleText.value; */
  const userId = currentUser.uid
  let postData = {
      idUser: userId,
      post: currentPost,
      /*  titlePost: currentTitle, */
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




