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
  var videoBtn = document.getElementById("VideoCommentInputBtn");
  videoBtn.onclick = function(){
    insertVideoComment();
  };  
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

function insertVideoComment(){
  var inputStr = document.getElementById("VideoCommentInputText").value;
  var videoComments = document.getElementById("VideoComments");
  var videoComment = document.createElement("div");
  videoComment.id = "VideoComment";
  var videoCommentVideo = document.createElement("div");
  videoCommentVideo.id = "VideoCommentVideo";
  var iframe = document.createElement("iframe");
  iframe.style="display:block; width:100%; height: 100%;";
  iframe.allow="autoplay; encrypted-media";
  iframe.src="https://www.youtube.com/embed/xJfWyQqJuag?start=150&autoplay=1&mute=1&enablejsapi=1";
  var videoCommentText = document.createElement("div");
  videoCommentText.id="VideoCommentText";
  var timeLink = document.createElement("p");
  timeLink.id = "TimeLink";
  timeLink.innerHTML = "2:32";
  var comment = document.createElement("p");
  comment.innerHTML = inputStr;
  videoComments.appendChild(videoComment);
  videoComment.appendChild(videoCommentVideo);
  videoComment.appendChild(videoCommentText);
  videoCommentVideo.appendChild(iframe);
  videoCommentText.appendChild(timeLink);
  videoCommentText.appendChild(comment);
  VideoComments.scrollLeft = VideoComments.scrollWidth;
}

function enterkey() {
  if (window.event.keyCode == 13) {
    insertChat();
  }
}