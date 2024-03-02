var mybutton = document.querySelector("button");
var dotColor = "#0000ff";
var dotSize = 4;

mybutton.addEventListener("click", function (event) {
    var element = document.getElementsByTagName("div");
    for (index = element.length - 1; index >= 0; index--) {
        element[index].parentNode.removeChild(element[index]);
    }

    // Let us stop the propagation of events

    event.stopPropagation();
});
 
// Stop drawing dots on the form
document.getElementById("chooseDot").addEventListener("click", function (event) {
    event.stopPropagation();
});

// Set the dot color
document.getElementById("color").addEventListener("change", function (event) {
    dotColor = document.getElementById("color").value;
})

// Set the dot size
document.getElementById("size").addEventListener("change", function (event) {
    dotSize = document.getElementById("size").value;
});



document.addEventListener("click", function (event) {
    var dot = document.createElement("div");
    dot.className = "dot";
    // Set dot position
    dot.style.left = (event.pageX - dotSize) + "px";
    dot.style.top = (event.pageY - dotSize) + "px";
    // Set dot size
    dot.style.borderRadius = dotSize + "px";
    dot.style.height = 2 * dotSize + "px";
    dot.style.width = 2 * dotSize + "px";
    // Set dot color
    dot.style.backgroundColor = dotColor;

    document.body.appendChild(dot);
});