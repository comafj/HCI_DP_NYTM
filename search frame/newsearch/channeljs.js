// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$( document ).ready(function() {
  var div = document.getElementsByClassName("Rsingle");
  div[0].onclick = function(){
    var vID = 'EqW_It2aPH4';
    window.parent.postMessage({type: "EnterChannel",
    title: "Let's dance with me, BEGINNERs", 
    videocode: vID}, "*");
  };
  div[1].onclick = function(){
    var vID = 'SrVV73gTBpk';
    window.parent.postMessage({type: "EnterChannel",
    title: "Beginner's fun dance", 
    videocode: vID}, "*");
  };
  div[2].onclick = function(){
    var vID = 'd9HdIy0MM0U';
    window.parent.postMessage({type: "EnterLiveChannel",
    title: "No Beginner here!", 
    videocode: vID}, "*");
  };
});