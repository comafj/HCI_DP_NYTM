// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var username = "admin"
$( document ).ready(function() {
  var createBtn = document.getElementById("ChatBtn");
  createBtn.onclick = function(){
    insertChat();
  };  
  var logoBtn = document.getElementById("logo");
  logoBtn.onclick = function(){
    location.href = "../index.html";
  };  
  var url = new URL(window.location.href);
  var title = url.searchParams.get("title");
  var videocode = url.searchParams.get("videocode");
  document.getElementById("ChannelTitle").innerHTML = title;
  document.getElementById("DanceVideoFrame").src = `https://www.youtube.com/embed/${videocode}?mute=1&enablejsapi=1`;
});

function insertChat(){
  var inputStr = document.getElementById("ChatInput").value;
  var newMessage = document.createElement("div");
  newMessage.id = "MyChatText";
  document.getElementById("ChatRoomContents").appendChild(newMessage);
  var newName = document.createElement("p");
  newName.innerHTML = inputStr;
  newMessage.appendChild(newName);
  var newName = document.createElement("span");
  newName.id = "ChatName";
  newName.innerHTML = "You";
  newMessage.appendChild(newName);
  document.getElementById("ChatInput").value ="";
  var ChatRoomContents = document.getElementById("ChatRoomContents");
  ChatRoomContents.scrollTop = ChatRoomContents.scrollHeight;
};  

function enterkey() {
  if (window.event.keyCode == 13) {
    insertChat();
  }
}