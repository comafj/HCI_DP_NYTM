// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var username = "admin";
var title;
var entries;
var videoentries;
var videocode;
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

$( document ).ready(function() {
  var createBtn = document.getElementById("ChatBtn");
  createBtn.onclick = function(){
    insertChat();
  };  
  var logoBtn = document.getElementById("logo");
  logoBtn.onclick = function(){
    location.href = `../index.html?username=${username}`;
  };  
  var videoBtn = document.getElementById("VideoCommentInputBtn");
  videoBtn.onclick = function(){
    insertVideoComment();
  };
  var url = new URL(window.location.href);
  title = url.searchParams.get("title");
  videocode = url.searchParams.get("videocode");
  username = url.searchParams.get("username");
  document.getElementById("ChannelTitle").innerHTML = title;
  document.getElementById("DanceVideoFrame").src = `https://www.youtube.com/embed/${videocode}?mute=1&enablejsapi=1`;

  // firebase.database().ref(`/${title}/chat/`).onWrite = showChats;

  // showChats();
  // showVideoComments();

  firebase.database().ref(`/${title}/chat/`).on('value', showChats);
  firebase.database().ref(`/${title}/videocomment/`).on('value', showVideoComments);

  var videoBtn = document.getElementById("like");
  isJoined(true);
  videoBtn.onclick = function (){isJoined(false);};
});

async function isJoined(b){
  var ret = b;
  var snapshot = await firebase.database().ref(`/${username}/JoinedChannel/`).orderByKey().once("value");
  if(snapshot.exists()){
    snapshot.forEach(function(childSnapshot) {
        var d = childSnapshot.val();
        console.log(d['title']);
        console.log(title);
        if (d['title'] == title){
          if (b){ret = false;}
          else{ret = true;}
        }
    });
  }
  if(ret){
    console.log("delete JoinedChannel");
    var snapshot = await firebase.database().ref(`/${username}/JoinedChannel/`).orderByKey().once("value");
    if(snapshot.exists()){
      snapshot.forEach(function(childSnapshot) {
          var d = childSnapshot.val();
          if (d['title'] == title){
            firebase.database().ref(`/${username}/JoinedChannel/`).child(childSnapshot.key).remove();
            return;
          }
      });
    }
    var videoBtn = document.getElementById("like");
    videoBtn.innerHTML = `<path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>`;
    return;
  }
  else{
    console.log("insert JoinedChannel");
    if(!b){
      firebase.database().ref(`/${username}/JoinedChannel/`).push({videocode: videocode,
                                                              title: title,
                                                              action: "EnterChannel"});
      }
    var videoBtn = document.getElementById("like");
    videoBtn.innerHTML=`<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>`;
    return true;
  }
}

async function deleteEntry(i, key) {
  console.log(event);
  entries.splice(i, 1);

  firebase.database().ref(`/${title}/chat/`).child(key).remove();
  
  // showChats();
}

async function showChats(){
  document.getElementById("ChatRoomContents").innerHTML="";

  entries = [];
  var snapshot = await firebase.database().ref(`/${title}/chat/`).orderByKey().once("value");
  
  if(snapshot.exists()){
    snapshot.forEach(function(childSnapshot) {
        var d = childSnapshot.val();
        d.key = childSnapshot.key;
        entries.push(d);
    });
  }
  
  for(var i=0;i<entries.length;i++) {
    if (entries[i].user == username){
      inputStr = entries[i].value;
      var newMessage = document.createElement("div");
      newMessage.id = "MyChatText";
      document.getElementById("ChatRoomContents").appendChild(newMessage);
      newMessage.innerHTML = `<button type="button" class="close" aria-label="Close">
      <span aria-hidden="true" id="close${i}">&times;</span>
    </button>`;
      b = document.getElementById(`close${i}`);           // Create a <p> element
      b.value = i;
      b.firebasekey = entries[i].key;
      b.onclick = function(event){deleteEntry(event.target.value, event.target.firebasekey);};

      var newName = document.createElement("p");
      newName.innerHTML = inputStr;
      newMessage.appendChild(newName);
      var newName = document.createElement("span");
      newName.id = "ChatName";
      newName.innerHTML = "You";
      newMessage.appendChild(newName);
      document.getElementById("ChatInput").value ="";
    }else{
      inputStr = entries[i].value;
      var newMessage = document.createElement("div");
      newMessage.id = "ChatText";
      document.getElementById("ChatRoomContents").appendChild(newMessage);
      var newName = document.createElement("p");
      newName.innerHTML = inputStr;
      newMessage.appendChild(newName);
      var newName = document.createElement("span");
      newName.id = "ChatName";
      newName.innerHTML = entries[i].user;
      newMessage.appendChild(newName);
      document.getElementById("ChatInput").value ="";
    }
  }
  var ChatRoomContents = document.getElementById("ChatRoomContents");
  ChatRoomContents.scrollTop = ChatRoomContents.scrollHeight;
}

function insertChat(){
  var inputStr = document.getElementById("ChatInput").value;

  firebase.database().ref(`/${title}/chat/`).push({user: username,
                                                  value: inputStr});

  // showChats();
  return;
}

async function deleteVideoEntry(i, key) {
  console.log(event);
  videoentries.splice(i, 1);

  firebase.database().ref(`/${title}/videocomment/`).child(key).remove();
  
  // showVideoComments();
}

async function showVideoComments(){
  document.getElementById("VideoComments").innerHTML="";

  videoentries = [];
  var snapshot = await firebase.database().ref(`/${title}/videocomment/`).orderByChild("sec").once("value");
  
  if(snapshot.exists()){
    snapshot.forEach(function(childSnapshot) {
        var d = childSnapshot.val();
        d.key = childSnapshot.key;
        videoentries.push(d);
    });
  }

  var videoComments = document.getElementById("VideoComments");
  
  for(var i=0;i<videoentries.length;i++) {
    if (username == videoentries[i].user){
      videoComments.innerHTML = videoComments.innerHTML.concat(`          
    <div id = "VideoComment">
      <div id = "VideoCommentVideo">
        <iframe style="display:block; width:100%; height: 100%;" allow="autoplay; encrypted-media"
          src="https://www.youtube.com/embed/${videoentries[i].videocode}?start=${videoentries[i].sec}&autoplay=1&mute=1&enablejsapi=1">
        </iframe>
      </div>
      <div id = "VideoCommentText"><button type="button" class="close videoclose" aria-label="Close">
      <span aria-hidden="true" id="videoclose${i}">&times;</span>
    </button><p id="TimeLink">${Math.floor(videoentries[i].sec/60)}:${videoentries[i].sec%60}</p><p>${videoentries[i].value}</p>
    <span>-${videoentries[i].user}-</span>
    </div>
    </div>`);
      // var b = document.getElementById(`videoclose${i}`);           // Create a <p> element
      // b.value = i;
      // b.firebasekey = videoentries[i].key;
      // console.log(b);
      // b.onclick = function(event){deleteVideoEntry(event.target.value, event.target.firebasekey);};
    }
    else{
      videoComments.innerHTML = videoComments.innerHTML.concat(`          
    <div id = "VideoComment">
      <div id = "VideoCommentVideo">
        <iframe style="display:block; width:100%; height: 100%;" allow="autoplay; encrypted-media"
          src="https://www.youtube.com/embed/${videoentries[i].videocode}?start=${videoentries[i].sec}&autoplay=1&mute=1&enablejsapi=1">
        </iframe>
      </div>
      <div id = "VideoCommentText"><p id="TimeLink">${Math.floor(videoentries[i].sec/60)}:${videoentries[i].sec%60}</p><p>${videoentries[i].value}</p>
    <span>-${videoentries[i].user}-</span>
    </div>
    </div>`);
    }
  }
  for(var i=0;i<videoentries.length;i++){
    if (username == videoentries[i].user){
      var b = document.getElementById(`videoclose${i}`);           // Create a <p> element
      b.value = i;
      b.firebasekey = videoentries[i].key;
      console.log(b);
      b.onclick = function(event){deleteVideoEntry(event.target.value, event.target.firebasekey);};      
    }
  }
  var videoComments = document.getElementById("VideoComments");
  videoComments.scrollLeft = VideoComments.scrollWidth;
}

function insertVideoComment(){
  var inputStr = document.getElementById("VideoCommentInputText").value;
  var min = Number(document.getElementById("VideoCommentMin").value);
  var sec = Number(document.getElementById("VideoCommentSec").value);
  sec = min*60 + sec;

  firebase.database().ref(`/${title}/videocomment/`).push({user: username,
                                                          sec: sec,
                                                          value: inputStr,
                                                          videocode: "xJfWyQqJuag"});

  // showVideoComments();
  return;
}

function enterkey() {
  if (window.event.keyCode == 13) {
    insertChat();
  }
}

function enterkeyvideo() {
  if (window.event.keyCode == 13) {
    insertVideoComment();
  }
}

// showChats();