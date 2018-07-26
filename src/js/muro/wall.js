window.onload = () => {
    firebase.auth().onAuthStateChanged((user) =>{
       if(user){
        const currentUser = firebase.auth().currentUser;
        firebase.database().ref('users/' + currentUser.uid).set({
        username: currentUser.displayName,
        email: currentUser.email
        });
        //ESTAMOS LOGUEADOS
        //Aquí se implementa para que aparezca la pagina principal de la red social
        showPost();
        console.log(JSON.stringify(user));
       }else{
        //NO ESTAMOS LOGUEADOS
        //aqui implementar para que al salir, aparezca nuevamente la interfaz del login
       }
    }); 
}

   /*Se guardan los datos del usuario, nombre y correo*/
 

const logoutwall = () => {
    firebase.auth().signOut().then(function () {
        window.location.href = "index.html";
        // Sign-out successful.
        console.log('saliendo');

    }).catch(function (error) {
        // An error happened.
        console.log(error);

    });

}



const createPost  = () =>{ 
    const currentUser = firebase.auth().currentUser;
    const currentPost = postText.value;
    /* const currentTitle = titleText.value; */
    const d = new Date;
    const userId = currentUser.uid

    let postData = {
        idUser: userId,
        post: currentPost,
       /*  titlePost: currentTitle, */
        likes: 0,
        type: 'receta', 
        timeData: {
            date: d.getDate(),
            month: d.getMonth(),
            year: d.getFullYear(),
            hour: d.getHours(),
            minutes: d.getMinutes(), 
        },
    };

    //para tener una nueva llave en la colección posts
    const newpostKey = firebase.database().ref(`/posts`).push().key;
    let updates = {};
    updates['/posts/' + newpostKey] = postData;
    updates['/user-posts/' + currentUser.uid + '/' + newpostKey] = postData;
  
    firebase.database().ref().update(updates);
    showPost();
  //  return newPostKey;
}

const showPost  = () =>{
    const currentUser = firebase.auth().currentUser;
    /* postcontainer.innerHTML = ''; */
    //Acá comenzamos a escuchar por nuevos mensajes usando el evento
    //on child_added
    document.getElementById('post').classList.replace('inherit', 'none');
    document.getElementById('postcontainer').classList.replace('none', 'inherit');
    firebase.database().ref(`/posts`)
    .on('child_added', (newPost)=>{
        postcontainer.innerHTML += ` 
        <div class="col-11" id="postwall" >
        <div id="headerpost-container">
                <button id="initial" class="col-2">N</button>
                <div id="infoPost" class="col-6">
                        <h1 id="creatorName">Nombre</h1>
                        <p id="datePost">${newPost.val().timeData.date}/${newPost.val().timeData.month}/${newPost.val().timeData.year}</p>
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
            <p id="postTextSection" class="col-12">${newPost.val().post}</p>
            <p id="postImageSection" class="col-12">Foto</p>      
        </section> 
        <div id="like-container">
                <img src="img/cookie.png" alt="cookie like" id="likeIcon">
                <p id="likeText">${newPost.val().likes} Me gusta</p>
        </div> 
        
    </div> 
        `;
    }); 
}



document.getElementById('publicButton').addEventListener('click', createPost);
/* document.getElementById('logout').addEventListener('click', logoutwall); */
document.getElementById('posting').addEventListener('click', () =>{
    postcontainer.innerHTML = '';
    document.getElementById('post').classList.replace('none', 'inherit');
    document.getElementById('postcontainer').classList.replace('inherit', 'none');
    document.getElementById('posting').classList.replace('inherit', 'none');
});

document.getElementById('backIcon').addEventListener('click', () =>{
    postcontainer.innerHTML = '';
    document.getElementById('post').classList.replace('inherit', 'none');
    document.getElementById('postcontainer').classList.replace('none', 'inherit');
    document.getElementById('posting').classList.replace('none', 'inherit');
});

