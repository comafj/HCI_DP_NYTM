// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var username = "admin"
$( document ).ready(function() {
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
    Rcontent.src = "community.html";
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
      location.href=`channels/channel.html?title=${e.data['title']}&videocode=${e.data['videocode']}`;
      return;
    }
    if(e.data['type']=='EnterLiveChannel'){
      location.href=`channels/livechannel.html?title=${e.data['title']}&videocode=${e.data['videocode']}`;
      return;
    }
    else{
      var uid = e.data['inputLink'].split("=").slice(-1)[0];
      var url = "https://img.youtube.com/vi/".concat(uid).concat("/0.jpg");
      e.data['url'] = url;
      e.data['videocode'] = uid;
      var new_channel = JSON.parse(JSON.stringify(e.data));
      user_info['admin']['MyChannel'].unshift(new_channel);
      showMyChannelPreview();
      var Rcontent = document.getElementById("RContentFrame");
      Rcontent.src = "./recommended_channel.html";
    }
  });
  var loginBtn = document.getElementById("LoginBtn");
  LoginBtn.onclick = function(){
    var loginform = document.getElementById("login-form");
    var inputId = document.getElementById("inputId");
    var inputPassword = document.getElementById("inputPassword");
    pwd = inputPassword.value;
    id = inputId.value;
    username = id;
    // loginform.parentNode.removeChild(loginform);
    // $("#login").html(`<div><h4 style="display:block;width=100%;">Hello, ${username}</h4></div><br>
    // <div><button type="submit" id="LogoutBtn" class="btn btn-primary LogoutSubmit" style="display:block;width=100%;">Log out</button></div>`);
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
      location.reload(true);
    }
  };  
});

function login(){
  var loginform = document.getElementById("login-form");
  var inputId = document.getElementById("inputId");
  var inputPassword = document.getElementById("inputPassword");
  pwd = inputPassword.value;
  id = inputId.value;
  username = id;
  // loginform.parentNode.removeChild(loginform);
  // $("#login").append(`<h4 style="display:block;width=100%;">Hello, ${username}</h4>
  // <button type="submit" id="LogoutBtn" class="btn btn-primary pull-right LogoutSubmit">Log out</button>`);
  $("#login").append(`<form id="login-form" class='form-horizontal container'>
  <div class="form-row">
    <h4 style="display:block;width=100%;">Hello, ${username}</h4>
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
  }
}

function showMyChannelPreview() {
  // var channelList = user_info['admin']['MyChannel'];
  // var preview = document.getElementById("MyChannelPreview");
  // preview.src = channelList[0]['url'];
  // preview.value = 0;

  var carousel = document.getElementById("MyChannelCarousel");
  carousel.innerHTML = '';
  var numRows = user_info['admin']['MyChannel'].length;
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
    img.src = "https://img.youtube.com/vi/".concat(user_info['admin']['MyChannel'][i]['videocode']).concat("/0.jpg");
    node.appendChild(img);
    carousel.appendChild(node);
  } 
  
  var MyPreviewBtn = document.getElementById("MyChannelCarousel");
  MyPreviewBtn.onclick = function(){
    var currentIndex = $('#MyChannelPreviewCarousel div.active').index();
    window.parent.postMessage({type: user_info['admin']['MyChannel'][currentIndex]['action'],
    title: user_info['admin']['MyChannel'][currentIndex]['title'], 
    videocode: user_info['admin']['MyChannel'][currentIndex]['videocode']}, "*");
  };

}

$('#MyChannelPreviewLeftBtn').on('click', function () {
  var channelList = user_info['admin']['MyChannel'];
  var preview = document.getElementById("MyChannelPreview");
  preview.value = (preview.value - 1 + channelList.length) % channelList.length;
  preview.src = channelList[preview.value]['url'];
})

$('#MyChannelPreviewRightBtn').on('click', function () {
  var channelList = user_info['admin']['MyChannel'];
  var preview = document.getElementById("MyChannelPreview");
  preview.value = (preview.value + 1 + channelList.length) % channelList.length;
  preview.src = channelList[preview.value]['url'];
})

function showJoinedChannelPreview() {
  // var channelList = user_info['admin']['JoinedChannel'];
  // var preview = document.getElementById("JoinedChannelPreview");
  // preview.src = channelList[0]['url'];
  // preview.value = 0;

  var carousel = document.getElementById("JoinedChannelCarousel");
  carousel.innerHTML = '';
  var numRows = user_info['admin']['JoinedChannel'].length;
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
    img.src = "https://img.youtube.com/vi/".concat(user_info['admin']['JoinedChannel'][i]['videocode']).concat("/0.jpg");
    node.appendChild(img);
    carousel.appendChild(node);
  }

  var JoinedPreviewBtn = document.getElementById("JoinedChannelCarousel");
  JoinedPreviewBtn.onclick = function(){
    var currentIndex = $('#JoinedChannelPreviewCarousel div.active').index();
    window.parent.postMessage({type: user_info['admin']['JoinedChannel'][currentIndex]['action'],
    title: user_info['admin']['JoinedChannel'][currentIndex]['title'], 
    videocode: user_info['admin']['JoinedChannel'][currentIndex]['videocode']}, "*");
  };
}

$('#JoinedChannelPreviewLeftBtn').on('click', function () {
  var channelList = user_info['admin']['JoinedChannel'];
  var preview = document.getElementById("JoinedChannelPreview");
  preview.value = (preview.value - 1 + channelList.length) % channelList.length;
  preview.src = channelList[preview.value]['url'];
})

$('#JoinedChannelPreviewRightBtn').on('click', function () {
  var channelList = user_info['admin']['JoinedChannel'];
  var preview = document.getElementById("JoinedChannelPreview");
  preview.value = (preview.value + 1 + channelList.length) % channelList.length;
  preview.src = channelList[preview.value]['url'];
})

showMyChannelPreview();
showJoinedChannelPreview();