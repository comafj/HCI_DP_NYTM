// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$( document ).ready(function() {
  var div = document.getElementsByClassName("Rsingle");
  div[0].onclick = function(){
    var vID = 'YjiVrcBsbDI';
    // location.href="https://www.youtube.com/watch?v=YjiVrcBsbDI";
    window.parent.postMessage({type: "EnterChannel",
    title: "Fall in love with this dance", 
    videocode: vID}, "*");
  };
  div[1].onclick = function(){
    var vID = 'VkuEzN8IS_o';
    // location.href="https://www.youtube.com/watch?v=VkuEzN8IS_o";
    window.parent.postMessage({type: "EnterChannel",
    title: "PERFECT dance ON", 
    videocode: vID}, "*");
  };
  div[2].onclick = function(){
    var vID = 'YwtL6zS3wAY';
    // location.href="https://www.youtube.com/watch?v=YwtL6zS3wAY";
    window.parent.postMessage({type: "EnterChannel",
    title: "FAKE LOVE dance practice", 
    videocode: vID}, "*");
  };
});