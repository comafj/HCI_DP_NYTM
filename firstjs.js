// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var username = "admin";
var joinedChannels = [];
var myChannels = [];
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyChhBMBrlFIaSgQk8IUFLITjmHDzJcryu8",
  authDomain: "cs374-b2a61.firebaseapp.com",
  databaseURL: "https://cs374-b2a61.firebaseio.com",
  projectId: "cs374-b2a61",
  storageBucket: "cs374-b2a61.appspot.com",
  messagingSenderId: "1002506494596",
  appId: "1:1002506494596:web:7797abee48cc662fc418d1",
  measurementId: "G-RV8SY11X47"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function link2videocode(url){
  if(url.includes("youtube.com")){
    var url = new URL(url);
    var videocode = url.searchParams.get("v");
    return videocode;
  }
  else if(url.includes("youtu.be")){
    var videocode = url.split("/").slice(-1)[0];
    return videocode;
  }
  else{
    return "";
  }
}

$( document ).ready(function() {
  var url = new URL(window.location.href);
  if (url.searchParams.get('username')) {
    username = url.searchParams.get('username');
    login(username);
  }
  else{
    var loginBtn = document.getElementById("LoginBtn");
    loginBtn.onclick = function(){
      // var loginform = document.getElementById("login-form");
      var inputId = document.getElementById("inputId");
      location.href=`index.html?username=${inputId}`;
      return;
    };
         
  }

  var btn = document.getElementById("CBTN");
  btn.onclick = function(){
    var option_val = $("#select_option option:selected").val();
    var input_var = document.getElementById("input_query");
    // input_var.value="";

    if(option_val=="all"){
      var Rcontent = document.getElementById("RContentFrame");
      Rcontent.src = "./search frame/newsearch/all.html";
      var InputQuery = document.getElementById("input_query");
      InputQuery.value = "COMAFJ";
    }
    else if(option_val=="channel"){
      var Rcontent = document.getElementById("RContentFrame");
      Rcontent.src = "./search frame/newsearch/channel.html";
      var InputQuery = document.getElementById("input_query");
      InputQuery.value = "beginner";
    }
    else if(option_val=="song"){
      var Rcontent = document.getElementById("RContentFrame");
      Rcontent.src = "./search frame/newsearch/song.html";
      var InputQuery = document.getElementById("input_query");
      InputQuery.value = "oh";
    }
    else if(option_val=="singer"){
      var Rcontent = document.getElementById("RContentFrame");
      Rcontent.src = "./search frame/newsearch/singer.html";
      var InputQuery = document.getElementById("input_query");
      InputQuery.value = "BTS";
    }
    else if(option_val=="creator"){
      var Rcontent = document.getElementById("RContentFrame");
      Rcontent.src = "./search frame/newsearch/creator.html";
      var InputQuery = document.getElementById("input_query");
      InputQuery.value = "COMAFJ";
    }
    else{
      var Rcontent = document.getElementById("RContentFrame");
      Rcontent.src = "./search frame/newsearch/all.html";
      var InputQuery = document.getElementById("input_query");
      InputQuery.value = "COMAFJ";
    }
  };
  var communityBtn = document.getElementById("CommunityBtn");
  communityBtn.onclick = function(){
    // location.href="community.html";
    var Rcontent = document.getElementById("RContentFrame");
    Rcontent.src = `community.html?username=${username}`;
  };  
  var createBtn = document.getElementById("MyChannelPreviewCreateBtn");
  createBtn.onclick = function(){
    var Rcontent = document.getElementById("RContentFrame");
    Rcontent.src = "./create_channel.html";
  };

  var MyPreviewBtn = document.getElementById("MyChannelCarousel");
  MyPreviewBtn.onclick = function(){
    var currentIndex = $('#MyChannelPreviewCarousel div.active').index();
    console.log(currentIndex);
    window.parent.postMessage({type: user_info['admin']['MyChannel'][currentIndex]['action'],
    title: user_info['admin']['MyChannel'][currentIndex]['title'], 
    videocode: user_info['admin']['MyChannel'][currentIndex]['videocode']}, "*");
  };

  var JoinedPreviewBtn = document.getElementById("JoinedChannelCarousel");
  JoinedPreviewBtn.onclick = function(){
    var currentIndex = $('#JoinedChannelPreviewCarousel div.active').index();
    window.parent.postMessage({type: user_info['admin']['JoinedChannel'][currentIndex]['action'],
    title: user_info['admin']['JoinedChannel'][currentIndex]['title'], 
    videocode: user_info['admin']['JoinedChannel'][currentIndex]['videocode']}, "*");
  };

  var logoBtn = document.getElementById("logo");
  logoBtn.onclick = function(){
    var Rcontent = document.getElementById("RContentFrame");
    Rcontent.src = "./recommended_channel.html";
    var InputQuery = document.getElementById("input_query");
    InputQuery.value = "";
  };  
  window.addEventListener('message', function(e) {
    console.log(e.data);
    if(e.data['type']=='EnterChannel'){
      location.href=`channels/channel.html?title=${e.data['title']}&videocode=${e.data['videocode']}&username=${username}`;
      return;
    }
    if(e.data['type']=='EnterLiveChannel'){
      location.href=`channels/livechannel.html?title=${e.data['title']}&videocode=${e.data['videocode']}&username=${username}`;
      return;
    }
    else{
      if(e.data['title'] == "" || e.data['inputLink'] == "" || e.data['inputSong'] == "" || e.data['inputSinger'] == ""){
        return;
      }
      var uid = link2videocode(e.data['inputLink']);
      var url = "https://img.youtube.com/vi/".concat(uid).concat("/0.jpg");
      e.data['url'] = url;
      e.data['videocode'] = uid;
      var new_channel = JSON.parse(JSON.stringify(e.data));
      firebase.database().ref(`/${username}/MyChannel/`).push(JSON.parse(JSON.stringify(e.data)));

      showMyChannelPreview();
      // var Rcontent = document.getElementById("RContentFrame");
      // Rcontent.src = "./recommended_channel.html";

      window.parent.postMessage({type: e.data['action'],
      title:  e.data['title'], 
      videocode:  e.data['videocode']}, "*");
    }
  }); 
});

function login(username){
  id = username;
  $("#login").html(`<form id="login-form" class='form-horizontal container'>
  <div class="form-row">
    <h5 style="display:block;width=100%;">Hello, ${username}</h5>
  </div>
  <div class="form-row col-sm-12">
    <button type="submit" id="LogoutBtn" class="btn btn-primary pull-right LogoutSubmit">Log out</button>
  </div>
</form>`);
  var logoutBtn = document.getElementById("LogoutBtn");
  logoutBtn.onclick = function(){
    $("#login").html(`<form id="login-form" class='form-horizontal'>
      <div class="form-group col-sm-6">
        <input type="text" id="inputId" class="form-control" name="username" placeholder="Username" autofocus>
      </div>
      <div class="form-group col-sm-6">
        <input type="password" id="inputPassword" class="form-control col-xs-6" name="password" placeholder="Password">
      </div>
      <div class="form-group col-sm-12">
          <button type="submit" id="LoginBtn" class="form-control btn btn-primary pull-right LoginSubmit">Log in</button>
      </div>
    </form>`)
    location.href = `index.html`;
  }
}

async function showMyChannelPreview() {
  // var channelList = user_info['admin']['MyChannel'];
  // var preview = document.getElementById("MyChannelPreview");
  // preview.src = channelList[0]['url'];
  // preview.value = 0;
  myChannels = [];
  var snapshot = await firebase.database().ref(`/${username}/MyChannel/`).orderByKey().once("value");
  if(snapshot.exists()){
    snapshot.forEach(function(childSnapshot) {
        var d = childSnapshot.val();
        d.key = childSnapshot.key;
        myChannels.push(d);
    });
  }

  var carousel = document.getElementById("MyChannelCarousel");
  carousel.innerHTML = '';
  var numRows = myChannels.length;
  if (numRows == 0){
    carousel.innerHTML = "No Channel";
  }
  for(var i=0;i<numRows;i++){
    var node = document.createElement("div");
    if (i == 0){
      node.className = "carousel-item active"
    }else{
      node.className = "carousel-item"
    }
    var img = document.createElement("img");
    img.className = "d-block w-100";
    img.style = "width: 25vw; height: 20vh;";
    img.src = "https://img.youtube.com/vi/".concat(myChannels[i]['videocode']).concat("/0.jpg");
    node.appendChild(img);
    carousel.appendChild(node);
  } 
  
  var MyPreviewBtn = document.getElementById("MyChannelCarousel");
  MyPreviewBtn.onclick = function(){
    var currentIndex = $('#MyChannelPreviewCarousel div.active').index();
    window.parent.postMessage({type: myChannels[currentIndex]['action'],
    title: myChannels[currentIndex]['title'], 
    videocode: myChannels[currentIndex]['videocode']}, "*");
  };

}

$('#MyChannelPreviewLeftBtn').on('click', function () {
  var channelList = myChannels;
  var preview = document.getElementById("MyChannelPreview");
  preview.value = (preview.value - 1 + channelList.length) % channelList.length;
  preview.src = channelList[preview.value]['url'];
})

$('#MyChannelPreviewRightBtn').on('click', function () {
  var channelList = myChannels;
  var preview = document.getElementById("MyChannelPreview");
  preview.value = (preview.value + 1 + channelList.length) % channelList.length;
  preview.src = channelList[preview.value]['url'];
})

async function showJoinedChannelPreview() {
  // var channelList = user_info['admin']['JoinedChannel'];
  // var preview = document.getElementById("JoinedChannelPreview");
  // preview.src = channelList[0]['url'];
  // preview.value = 0;
  joinedChannels = [];
  var snapshot = await firebase.database().ref(`/${username}/JoinedChannel/`).orderByKey().once("value");
  if(snapshot.exists()){
    snapshot.forEach(function(childSnapshot) {
        var d = childSnapshot.val();
        d.key = childSnapshot.key;
        joinedChannels.push(d);
    });
  }

  var carousel = document.getElementById("JoinedChannelCarousel");
  carousel.innerHTML = '';
  var numRows = joinedChannels.length;
  if (numRows == 0){
    carousel.innerHTML = "No Channel";
  }
  for(var i=0;i<numRows;i++){
    var node = document.createElement("div");
    if (i == 0){
      node.className = "carousel-item active"
    }else{
      node.className = "carousel-item"
    }
    var img = document.createElement("img");
    img.className = "img-fluid";
    img.style = "width: 25vw; height: 20vh;";
    // img.className = "d-block w-100"
    img.src = "https://img.youtube.com/vi/".concat(joinedChannels[i]['videocode']).concat("/0.jpg");
    node.appendChild(img);
    carousel.appendChild(node);
  }

  var JoinedPreviewBtn = document.getElementById("JoinedChannelCarousel");
  JoinedPreviewBtn.onclick = function(){
    var currentIndex = $('#JoinedChannelPreviewCarousel div.active').index();
    window.parent.postMessage({type: joinedChannels[currentIndex]['action'],
    title: joinedChannels[currentIndex]['title'], 
    videocode: joinedChannels[currentIndex]['videocode']}, "*");
  };
}

$('#JoinedChannelPreviewLeftBtn').on('click', function () {
  var channelList = joinedChannels;
  var preview = document.getElementById("JoinedChannelPreview");
  preview.value = (preview.value - 1 + channelList.length) % channelList.length;
  preview.src = channelList[preview.value]['url'];
})

$('#JoinedChannelPreviewRightBtn').on('click', function () {
  var channelList = joinedChannels;
  var preview = document.getElementById("JoinedChannelPreview");
  preview.value = (preview.value + 1 + channelList.length) % channelList.length;
  preview.src = channelList[preview.value]['url'];
})

showMyChannelPreview();
showJoinedChannelPreview();