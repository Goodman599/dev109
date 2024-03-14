var button = document.getElementById("musicButton");
var musicPlaying = false;

button.onclick = function () {
    console.log("detected click!");
    if (musicPlaying) {
        document.getElementById("playIcon").src = "../Images/playButton.jpg";
        document.getElementById("bgMusic").pause();
        musicPlaying = false;
    }
    else {
        document.getElementById("playIcon").src = "../Images/pauseButton.jpg";
        document.getElementById("bgMusic").play();
        musicPlaying = true;
    }
}