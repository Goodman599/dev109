var current = 1;
var descriptions = [
    "This is the first random image I found. Its got some cool bubbles.",
    "Fun fact:<br>This was the smallest image out of the five, so the other four were shrunk to match this one. Not only that, they are then enlarged again to fit the website. Not my proudest idea...",
    "This was originally a cool background but it got cropped so much it's just a normal pattern now.",
    "This is image 4. I think it's supposed to be a cool data/code-y thing. I think I cropped it quite well.",
    "This image is my personal favorite. The metallic patterns look really nice."
];



// Change Images
function cycleImage(amount = 1) {

    current += amount;
    // Loop
    if (current < 1) current = 5;
    else if (current > 5) current = 1;

    document.getElementsByTagName("img")[0].src = "images/" + current + ".jpg";
    document.getElementsByTagName("p")[0].innerHTML = descriptions[current - 1];
}

// Add event listeners to buttons
document.getElementById("prev").onclick = function () { cycleImage(-1); }
document.getElementById("next").onclick = function () { cycleImage(); }

// Cycle Images automatically
var interval;
document.getElementById("cycle").onchange = function () {
    
    if (document.getElementById("cycle").checked == true) {
        interval = setInterval(cycleImage, 5000);
        console.log("interval created");
    }
    else {
        clearInterval(interval);
        console.log("interval cleared");
    }
}

