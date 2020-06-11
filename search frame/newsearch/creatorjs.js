// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$( document ).ready(function() {
  var div = document.getElementsByClassName("Rsingle");
  div[0].onclick = function(){
    var vID = 'SrVV73gTBpk';
    window.parent.postMessage({type: "EnterChannel",
    title: "Fun dance with Dance Monkey!", 
    videocode: vID}, "*");
  };
  div[1].onclick = function(){
    var vID = 'TXYST-k0p_0';
    window.parent.postMessage({type: "EnterLiveChannel",
    title: "I like these guys song", 
    videocode: vID}, "*");
  };
  div[2].onclick = function(){
    var vID = 'ElGCb7o41tU';
    window.parent.postMessage({type: "EnterChannel",
    title: "I wanna be a DOLPHIN", 
    videocode: vID}, "*");
  };
});