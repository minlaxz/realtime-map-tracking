function handleSignIn() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    }
    else {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            location.reload();
            return;
        }
        if (Notification.permission === 'granted') {
            firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
                console.log(result)
                //location.reload(); //TODO
                //setTimeout(handleSignOut, 3000);
            }).catch((error) => {
                if (error.code === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else {
                    alert(error.message);
                }
                document.getElementById('signin').disabled = false;
            });
        }else{
            alert('piracy ? ')
            location.reload();
        }

    }
}

function handleSignOut() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();

    }
}


function initApp() {
    firebase.auth().onAuthStateChanged((user) => {
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