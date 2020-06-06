// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var username = "admin"
$( document ).ready(function() {
  var btn = document.getElementById("CBTN");
  btn.onclick = function(){
    location.href="second.html";
  };
  var communityBtn = document.getElementById("CommunityBtn");
  communityBtn.onclick = function(){
    location.href="community.html";
  };  
  var createBtn = document.getElementById("MyChannelPreviewCreateBtn");
  createBtn.onclick = function(){
    var Rcontent = document.getElementById("RContentFrame");
    Rcontent.src = "./create_channel.html";
  };  
  var logoBtn = document.getElementById("logo");
  logoBtn.onclick = function(){
    var Rcontent = document.getElementById("RContentFrame");
    Rcontent.src = "./recommended_channel.html";
  };  
  window.addEventListener('message', function(e) {
    console.log(e.data);
    var uid = e.data['inputLink'].split("=").slice(-1)[0];
    var url = "https://img.youtube.com/vi/".concat(uid).concat("/0.jpg");
    e.data['url'] = url;
    var new_channel = JSON.parse(JSON.stringify(e.data));
    user_info['admin']['MyChannel'].unshift(new_channel);
    showMyChannelPreview();
    var Rcontent = document.getElementById("RContentFrame");
    Rcontent.src = "./recommended_channel.html";
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
    $("#login").html(`<h4 style="display:block;width=100%;">Hello, ${username}</h4>
    <button type="submit" id="LogoutBtn" class="btn btn-primary pull-right LogoutSubmit">Log out</button>`);
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
  $("#login").html(`<h4 style="display:block;width=100%;">Hello, ${username}</h4>
  <button type="submit" id="LogoutBtn" class="btn btn-primary pull-right LogoutSubmit">Log out</button>`);
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
  var channelList = user_info['admin']['MyChannel'];
  var preview = document.getElementById("MyChannelPreview");
  preview.src = channelList[0]['url'];
  preview.value = 0;
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
  var channelList = user_info['admin']['JoinedChannel'];
  var preview = document.getElementById("JoinedChannelPreview");
  preview.src = channelList[0]['url'];
  preview.value = 0;
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