var firebaseConfig = {
    apiKey: "AIzaSyAI5Nev20INtv2O7X7kYWHDWGtCdnYar-0",
    authDomain: "ashank-s-twitter.firebaseapp.com",
    databaseURL: "https://ashank-s-twitter-default-rtdb.firebaseio.com",
    projectId: "ashank-s-twitter",
    storageBucket: "ashank-s-twitter.appspot.com",
    messagingSenderId: "750462265122",
    appId: "1:750462265122:web:21c4d8d0e369dcb320677b"
};
firebase.initializeApp(firebaseConfig);

var user_name = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!😊😊😊😊😊";

function logout() {
    localStorage.removeItem("user_name");
    window.location = "index.html";
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log(Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectoRoomName(this.id)'>#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}
getData();
function argr() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });
    localStorage.setItem("added_room_name", room_name);
    window.location = "twitter_chat_page.html";
}
function redirectoRoomName(name) {
    console.log(name);
    localStorage.setItem("added_room_name", name);
    window.location = "twitter_chat_page.html";
}