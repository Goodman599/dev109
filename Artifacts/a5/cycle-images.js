var current = 1;

// Change Images
function cycleImage(amount = 1) {

    current += amount;
    // Loop
    if (current < 1) current = 5;
    else if (current > 5) current = 1;

    document.getElementsByTagName("img")[0].src = "images/" + current + ".jpg";
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

