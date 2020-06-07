var firebaseConfig = {
    apiKey: "AIzaSyD3YaHKlMJT4iFIWtvVYrgjYk0ttJWdPdk",
    authDomain: "cs374-fp-community.firebaseapp.com",
    databaseURL: "https://cs374-fp-community.firebaseio.com",
    projectId: "cs374-fp-community",
    storageBucket: "cs374-fp-community.appspot.com",
    messagingSenderId: "113325026455",
    appId: "1:113325026455:web:1729c5097c5b2378d60dd2",
    measurementId: "G-ZXXL7QQ2Z4"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

function write(comment) {
    var newKey = firebase.database().ref('/entry/').push();
    newKey.set({
        comment: comment,
        like: 0
    });
}

function read() {
    return firebase.database().ref('/entry/').on('value', function(snapshot) {
        initializeTable();
        var myValue = snapshot.val();
        if (myValue != null) {
            var keyList = Object.keys(myValue);
            for(var i=0;i<keyList.length;i++) {
                var myKey = keyList[keyList.length-i-1];
                addRow(myValue[myKey].comment, myKey);
            }
        }
    });
}

function initializeTable() {
    var table = document.getElementById('community_table');
    var numRows = table.rows.length;
    for (var i=0;i<numRows-1;i++) {
        table.deleteRow(1);
    }
}

function addRow(comment, key) {
    var table = document.getElementById('community_table');
    var newRow = table.insertRow(table.rows.length);
    var commentCell = newRow.insertCell(0);
    var likeCell = newRow.insertCell(1);
    var comments = comment.replace(/\n/g, '<br>');
    commentCell.className = 'comment';
    commentCell.innerHTML = comments;
    likeCell.innerHTML = '<button id="like" onclick="like(\'' + key + '\')">Like</button><br>likes';
}

function bindEvent() {
    var comment = document.getElementById('comment');
    var post = document.getElementById('post');
    var like = document.getElementById('like');
    comment.focus();
    post.onclick = function() {
        var myValue = comment.value;
        if (myValue != '') {
            write(myValue);
            comment.value = '';
            comment.focus();
        }
    }
}

function like(key) {
    var comment;
    var numLike;
    firebase.database().ref('/entry/').once('value', function(snapshot) {
        var myValue = snapshot.val();
        if (myValue != null) {
            var keyList = Object.keys(myValue);
            for (var i = 0; i < keyList.length; i++) {
                var myKey = keyList[i];
                if (myKey == key) {
                    comment = myValue[myKey].comment;
                    numLike = myValue[myKey].like;
                }
            }
        }
    });
    firebase.database().ref('/entry/' + key).set({
        comment: comment,
        like: numLike + 1
    });
}


bindEvent();
read();