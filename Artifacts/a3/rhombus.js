function createRhombus(rHeight, rColorEven, rColorOdd, rSymbol, cChangeInput) {
    // A X height rombus will be X wide, going 1, 3, 5 ... x, x-2 ... 1
    // Even height rhombuses will have flat tops

    var isEvenHeight = rHeight % 2 == 0;
    var rLine = "<p>";

    // Set the cChange string to a true or false bool
    var cChange = false;
    if (cChangeInput == "yes") {
        cChange = true;
    }

    for (row = 0; row < rHeight; row++) {

        // First calculate how many empty dots are needed
        var empty;
        if (!isEvenHeight) {
            // Odd heights are the absolute valeu of current row - height/2, rounded down.
            // For example, a 5 high rhombus will be 2, 1, 0, 1, 2, or 0-2, 1-2, 2-2, 3-2, 4-2
            empty = Math.abs(row - Math.floor(rHeight / 2))
        }
        else {
            // Even heights are weird :(
            // A height 4 rhombus needs 1, 0, 0, 1, which is row - (2- 0.x) rounded down.
            // 0-1.9 = -1.9, 1-1.9  = -0.9, 2-1.9 = 0.1, 3-1.9 = 1.1
            empty = Math.abs(row - rHeight / 2 + 0.1)
            empty = Math.floor(empty);
        }



        // Draw dots
        for (col = 0; col < rHeight; col++) {
            // Draw white dots first
            // white dots are for the first and last "empty" spaces
            if (col < empty || col >= (rHeight - empty)) {
                rLine += "<span style='color:white'>" + rSymbol + "</span>";
            }
            // Draw colored dots
            else if (col % 2 == 0) {
                rLine += "<span style='color:" + rColorEven + ";'>" + rSymbol + "</span>";
            }
            else {
                rLine += "<span style='color:" + rColorOdd + ";'>" + rSymbol + "</span>";
            }
        }

        // Change lines
        rLine += "<br>";

        // If enabled, alternate the odd and even colors
        if (cChange) {
            var temp = rColorEven;
            rColorEven = rColorOdd;
            rColorOdd = temp;
        }

    }

    rLine += "<p>";

    document.getElementById("rhombus").innerHTML = rLine;
}