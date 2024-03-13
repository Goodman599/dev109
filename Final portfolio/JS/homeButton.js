// Play sound effect when clicking on the home button on the Thank you page

var button = document.getElementById("yayButton");
button.onclick = function () {
    document.getElementsByTagName('audio')[0].play();
}