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

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("added_room_name");

function send() {
    msg = document.getElementById("message").value;
    console.log(msg);
    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("message").value = " ";
};

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("added_room_name");
    window.location.replace("index.html");
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start Code
                console.log(firebase_message_id);
                        console.log(message_data);
                        var name = message_data["name"];
                        var message = message_data["message"];
                        var like = message_data["like"];
                        var name_html = "<h4>" + name + "<img src='tick.png' class='user_tick'></h4>";
                        var message_html = "<h4>" + message + "<h4>";
                        var like_button_html = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='update_like(this.id)'>";
                        var span_html="<span class='glyphicon glyphicon-thumbs-up'>Like:"+like+"</span></button><hr>";
                        row=name_html+message_html+like_button_html+span_html;
                        document.getElementById("output").innerHTML+=row;
                //End Code
            }
        });
    });
}
getData();
function update_like(message_id){
    console.log("Clicked on like button"+message_id);
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    updated_likes=Number(likes)+1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({like:updated_likes});
}