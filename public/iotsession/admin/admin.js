var dbRef = firebase.database().ref('coordinates');

function handleSignOut() {
    if (firebase.auth().currentUser) {
        var user_signout = confirm("Sign Out ?")
        if (user_signout == true) {
            firebase.auth().signOut().then(function () {
            }).catch(function (error) {
                alert(error.Message);
            });
        } else {
            location.reload();
        }

    }
}

function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            if (firebase.auth().currentUser.uid == '1QGt1bVzikXLo1n3nDFZX45Qca42') {
                //TODO ADMIN
            }
            else if (firebase.auth().currentUser.uid == 'viJT4hfIDzMxfPlTO6UuZf48k9p1') {
                document.getElementsByTagName('body').hidden = true
                window.location.replace('../user/');
            }
            else {
                document.getElementsByTagName('body').hidden = true
                window.location.replace('../');
            }
        }
        else {
            document.getElementsByTagName('body').hidden = true
            window.location.replace('../');
        }
    });
    document.getElementById('signout').addEventListener('click', handleSignOut, false);
    document.getElementById('sw-1').addEventListener('click', sw_1, false);
    document.getElementById('sw-2').addEventListener('click', sw_2, false);
    document.getElementById('sw-3').addEventListener('click', sw_3, false);

    dbRef.on('value', (sw_update));
    var swS_do = [];
    function sw_update(obj){
        swS_do[0] = obj.val().sw_1
        swS_do[1] = obj.val().sw_2
        swS_do[2] = obj.val().sw_3
    }
    function sw_1() {
        dbRef.update({
            sw_1: 1-swS_do[0]
        })
    }
    function sw_2() {
        dbRef.update({
            sw_2: 1-swS_do[1]
        })
    }
    function sw_3() {
        dbRef.update({
            sw_3: 1-swS_do[2]
        })
    }
}

window.onload = function () {
    initApp();
};