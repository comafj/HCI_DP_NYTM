// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$( document ).ready(function() {
  var div = document.getElementsByClassName("Rsingle");
  div[0].onclick = function(){
    var vID = 'kDGc8zZ9HhY';
    window.parent.postMessage({type: "EnterLiveChannel",
    title: "Dance class on (G)I-DLE Oh my god", 
    videocode: vID}, "*");
  };
  div[1].onclick = function(){
    var vID = 'l6IxCYp-pw4';
    window.parent.postMessage({type: "EnterChannel",
    title: "Who can teach me this dance?", 
    videocode: vID}, "*");
  };
  div[2].onclick = function(){
    var vID = 'xeg31UhG3DY';
    window.parent.postMessage({type: "EnterChannel",
    title: "Intermediate DANCE class of WannabeC", 
    videocode: vID}, "*");
  };
});