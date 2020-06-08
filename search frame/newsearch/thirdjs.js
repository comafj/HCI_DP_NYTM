// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$( document ).ready(function() {
  var btn = document.getElementById("CBTN");
  btn.onclick = function(){
    var option_val = $("#select_option option:selected").val();
    var input_var = document.getElementById("input_query");
    input_var.value="";

    if(option_val=="all"){
      console.log(option_val);
    }
    else if(option_val=="channel"){
      console.log(option_val);
    }
    else if(option_val=="song"){
      console.log(option_val);
    }
    else if(option_val=="singer"){
      console.log(option_val);
    }
    else if(option_val=="creator"){
      console.log(option_val);
    }
    else{
      console.log("error");
    }
  };
  $("#input_query").keydown(function(event) {
    if (event.keyCode == 13)
      document.getElementById("CBTN").click();
  });
  var div = document.getElementsByClassName("Rsingle");
  div[0].onclick = function(){
    var vID = 'SrVV73gTBpk';
    location.href="https://www.youtube.com/watch?v=SrVV73gTBpk";
  };
  div[1].onclick = function(){
    var vID = 'EqW_It2aPH4';
    location.href="https://www.youtube.com/watch?v=EqW_It2aPH4";
  };
  div[2].onclick = function(){
    var vID = 'd9HdIy0MM0U';
    location.href="https://www.youtube.com/watch?v=d9HdIy0MM0U";
  };
});