function handleSignIn() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    }
    else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            location.reload();
            return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
            //location.reload(); //TODO
            //setTimeout(handleSignOut, 3000);

        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('signin').disabled = false;
        });
    }
}

function handleSignOut() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();

    }
}


function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.replace('iotsession/');
            document.getElementById('status').textContent = 'Signed in';
            document.getElementById('details').textContent = firebase.auth().currentUser.uid;
        } else {

            document.getElementById('status').textContent = 'Signed out';
            document.getElementById('details').textContent = 'null';
            document.getElementById('signin').hidden = false;

        }
    });

    document.getElementById('signin').addEventListener('click', handleSignIn, false);
}

window.onload = function () {
    initApp();
};