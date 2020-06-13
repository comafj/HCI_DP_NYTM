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
    // if($('input[name=Live]:checked').val() )
    window.parent.postMessage({action: $('input[name=Live]:checked').val(),
                               Live: $('input[name=Live]:checked').val(),
                               Private: $('input[name=Private]:checked').val(),
                               inputChannelName: inputChannelName.value,
                               title: inputChannelName.value,
                               inputLink: inputLink.value,
                               inputSong: inputSong.value,
                               inputSinger: inputSinger.value,
                               type: "CreateChannel"}, "*");
  };
});

(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();