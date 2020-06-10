// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var username = "admin"
$( document ).ready(function() {
  var div1 = document.getElementById("Channel1");
  div1.onclick = function(){
    window.parent.postMessage({type: "EnterChannel",
                               title: "Let's dance with BTS!",
                               videocode: "H_qkMHGmSq4"}, "*");
  };
  var div2 = document.getElementById("Channel2");
  div2.onclick = function(){
    window.parent.postMessage({type: "EnterChannel",
                               title: "Let's dance with Red Velvet's",
                               videocode: "Z7yNvMzz2zg"}, "*");
  };
  var div3 = document.getElementById("Channel3");
  div3.onclick = function(){
    window.parent.postMessage({type: "EnterChannel",
                               title: "Dance together Any Song!", 
                               videocode: "FLEqAO7OvvQ"}, "*");
  };
});
