function store(){
    var user_name=document.getElementById("user_name").value;
    localStorage.setItem("user_name",user_name);
    var user_password=document.getElementById("password").value;
    localStorage.setItem("user_password",user_password);
    document.getElementById("user_name").value=" ";
    document.getElementById("password").value=" ";
    window.location="twitter_room.html"
}