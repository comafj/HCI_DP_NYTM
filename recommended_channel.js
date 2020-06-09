// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var username = "admin"
$( document ).ready(function() {
  var div = document.getElementById("Channel1");
  div.onclick = function(){
    window.parent.postMessage("Channel1", "*");
  };
});
