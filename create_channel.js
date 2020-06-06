// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var username = "admin"
$( document ).ready(function() {
  console.log(document.getElementById("inputChannelName"));
  var btn = document.getElementById("CreateChannelSubmit");

  btn.onclick = function(){
    console.log(document.getElementById("inputChannelName"));
    var inputChannelName = document.getElementById("inputChannelName");
    var inputLink = document.getElementById("inputLink");
    var inputSong = document.getElementById("inputSong");
    var inputSinger = document.getElementById("inputSinger");
    window.parent.postMessage({Live: $('input[name=Live]:checked').val(),
                               Private: $('input[name=Private]:checked').val(),
                               inputChannelName: inputChannelName.value,
                               inputLink: inputLink.value,
                               inputSong: inputSong.value,
                               inputSinger: inputSinger.value}, "*");
  };
  var json = $('#json');
  var form = $('#CreateChannelForm');
  var group = $('.form-group inputChannelName'); // specify which group u d like to serialize;
  var submit = $('button[type="submit"]');
  form.submit(function(e){
    e.preventDefault(); // prevebt form submition if u done ur work remove this line;
    var user = group.serializeArray();
    var loginFormObject = {};
    for (var i = user.length - 1; i >= 0; i--) {
      var name = user[i].name;
      var value = user[i].value;
      loginFormObject[name] = value;
    }
    loginFormObject = JSON.stringify(loginFormObject);
    console.log(loginFormObject);
    json.text(loginFormObject);
  });
});
// (function(window, document, undefined){

//   // code that should be taken care of right away
  
//   window.onload = init;
  
//     function init(){
//       // the code to be called when the dom has loaded
//       // #document has its nodes
//       var btn = document.getElementById("CreateChannelSubmit");
//       var inputChannelName = document.getElementById("inputChannelName");
//       var inputLink = document.getElementById("inputLink");
//       var inputSong = document.getElementById("inputSong");
//       var inputSinger = document.getElementById("inputSinger");
//       btn.onclick = function(){
//         window.parent.postMessage({inputChannelName: inputChannelName.nodeValue}, '*');
//       };
//     }
  
//   })(window, document, undefined);