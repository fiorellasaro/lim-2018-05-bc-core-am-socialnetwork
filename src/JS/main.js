document.getElementById("submitbutton").addEventListener('click', ()=>{

    document.getElementById("signUp").style.display = 'none';
    document.getElementById("signIn").style.display = 'initial';

});


document.getElementById("signInButton").addEventListener('click', ()=>{

    document.getElementById("signUp").style.display = 'initial';
    document.getElementById("signIn").style.display = 'none';

});


document.getElementById("signUpLink").addEventListener('click', ()=>{

    document.getElementById("signUp").style.display = 'none';
    document.getElementById("signIn").style.display = 'initial';

});

document.getElementById("signInLink").addEventListener('click', ()=>{

    document.getElementById("signUp").style.display = 'initial';
    document.getElementById("signIn").style.display = 'none';

});