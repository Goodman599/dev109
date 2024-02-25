// Array to store the validity of each field
var checks = [false, false, false, false, false, false, false, false, false];

function isValid() { // There is a evaluate parameter to prevent infinite loops caused by checks by blur events
    names(0);
    names(1);
    email();
    phone();
    username();
    password();
    addressOrCity("address");
    addressOrCity("city");
    zip();

    // check every item in checks
    var valid = true;
    for (var i in checks) {
        if (!checks[i]) {
            valid = false;
        }
    }

    if (valid) {
        document.getElementById("submitError").innerHTML = "";
        return true;
    }
    else {
        document.getElementById("submitError").innerHTML = "<p><strong>Error Submitting — See Above</strong></p>";
        event.preventDefault();
        return false;
    }
}

// Add event listeners that all have the CalledByBlur set to true
document.getElementById("firstName").addEventListener('blur', function () { names(0, true) }, false);
document.getElementById("lastName").addEventListener('blur', function () { names(1, true) }, false);
document.getElementById("email").addEventListener('blur', function () { email(true) }, false);
document.getElementById("phone").addEventListener('blur', function () { phone(true) }, false);
document.getElementById("username").addEventListener('blur', function () { username(true) }, false);
document.getElementById("password").addEventListener('blur', function () { password(true) }, false);
document.getElementById("address").addEventListener('blur', function () { addressOrCity("address", true) }, false);
document.getElementById("city").addEventListener('blur', function () { addressOrCity("city", true) }, false);
document.getElementById("zip").addEventListener('blur', function () { zip(true) }, false);


function names(nameType, calledByBlur = false) {
    // Make an array that converts 0s and 1s into first name/last name and their maximum lengths
    const nameData = [["first", 20], ["last", 50]];

    //1) Create variable
    var validName = false;

    // combine the nameType with the word "Name" for a html ID
    var nameId = nameData[nameType][0] + "Name";

    //2) read value from HTML
    var name = document.getElementById(nameId).value;
    var errorMessages = "";

    //3) Do validation
    if (name === "null" || name === "" || name.length > nameData[nameType][1]) {

        errorMessages += "<p>The " + nameData[nameType][0] + " name is required and cannot be greater than " + nameData[nameType][1] + " characters</p>";
        console.log(nameData[nameType][0] + " name invalid — length");

    } else if (name.match("^[a-zA-Z ,.'-]+$") === null) {
        errorMessages += "<p>Invalid caracter in" + nameData[nameType][0] + " name (accepts only A-Z, a-z, and ,.'-)</p>";
        console.log(nameData[nameType][0] + " name invalid — bad characters");

    } else {
        validName = true;
        console.log(nameData[nameType][0] + " name valid");

        if (calledByBlur) {
            // Run isValid again in case everything has been solved and thus the big error at the bottom should be removed
            isValid();
        }
    }

    //4) Send error message to HTML
    document.getElementById(nameData[nameType][0].charAt(0) + "nameError").innerHTML = errorMessages;

    //5) Updates the checks array
    checks[nameType] = validName;
}

function email(calledByBlur = false) {
    var userEmail = document.getElementById("email").value;
    var atpos = userEmail.indexOf("@");
    var dotpos = userEmail.lastIndexOf(".");

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= userEmail.length) {
        document.getElementById("emailError").innerHTML = "<p>Invalid email </p>";
        console.log("Invalid email");
        checks[2] = false;

    } else {
        document.getElementById("emailError").innerHTML = "";
        console.log("Email valid");

        checks[2] = true;

        if (calledByBlur) {
            // Run isValid again in case everything has been solved and thus the big error at the bottom should be removed
            isValid();
        }
    }
}

function phone(calledByBlur = false) {
    var phone = document.getElementById("phone").value;
    if (isNaN(phone) || phone.length > 15 || phone === null || phone === "") {
        document.getElementById("phoneError").innerHTML = "<p>Invalid phone number </p>";
        console.log("Invalid phone number")
        checks[3] = false;

    } else {
        document.getElementById("phoneError").innerHTML = "";
        console.log("Phone number valid");

        checks[3] = true;

        if (calledByBlur) {
            // Run isValid again in case everything has been solved and thus the big error at the bottom should be removed
            isValid();
        }
    }
}

function username(calledByBlur = false) {
    var username = document.getElementById("username").value;
    if (username === "null" || username === "" || username.length > 12) {
        document.getElementById("usernameError").innerHTML = "<p>The username is required and cannot be greater than 12 characters</p>";
        console.log("username invalid — length");
        checks[4] = false;

    } else {
        document.getElementById("usernameError").innerHTML = "";
        console.log("Username valid");

        checks[4] = true;

        if (calledByBlur) {
            // Run isValid again in case everything has been solved and thus the big error at the bottom should be removed
            isValid();
        }
    }
}

function password(calledByBlur = false) {
    var password = document.getElementById("password").value;
    if (password === "null" || password === "" || password.length > 17) {
        document.getElementById("passwordError").innerHTML = "<p>The password is required and cannot be greater than 17 characters</p>";
        console.log("password invalid — length");
        checks[5] = false;

    } else if (/[A-Z]/g.test(password) == false) { // test for capital letters
        document.getElementById("passwordError").innerHTML = "<p>The password requires at least 1 uppercase letter</p>";
        console.log("password invalid — uppercase");
        checks[5] = false;

    } else if (/[a-z]/g.test(password) == false) { // test for lowercase letters
        document.getElementById("passwordError").innerHTML = "<p>The password requires at least 1 lowercase letter</p>";
        console.log("password invalid — lowercase");
        checks[5] = false;

    } else if (/[1-9]/g.test(password) == false) { // test for number
        document.getElementById("passwordError").innerHTML = "<p>The password requires at least 1 number</p>";
        console.log("password invalid — number");
        checks[5] = false;

    } else if (/[!@#$%^&* ()_ +\-=\[\]{ }; ':\"\\|,.<>\/?]/g.test(password) == false) { // test for special characters
        document.getElementById("passwordError").innerHTML = "<p>The password requires at least 1 special character</p>";
        console.log("password invalid — special character");
        checks[5] = false;

    } else {
        document.getElementById("passwordError").innerHTML = "";
        console.log("Password valid");

        checks[5] = true;

        if (calledByBlur) {
            // Run isValid again in case everything has been solved and thus the big error at the bottom should be removed
            isValid();
        }
    }
}

function addressOrCity(locationType, calledByBlur = false) {
    var location = document.getElementById(locationType).value;
    // Store the position this has in the array based on which data point this is
    var checkPos = 6;
    if (locationType == "city") {
        checkPos = 7;
    }

    if (location === "null" || location === "") {
        document.getElementById(locationType + "Error").innerHTML = "<p>The " + locationType + " is required</p>";
        console.log(locationType + " invalid — length");
        checks[checkPos] = false;

    } else {
        document.getElementById(locationType + "Error").innerHTML = "";
        console.log(locationType + " valid");

        checks[checkPos] = true;

        if (calledByBlur) {
            // Run isValid again in case everything has been solved and thus the big error at the bottom should be removed
            isValid();
        }
    }
}

function zip(calledByBlur = false) {
    var zip = document.getElementById("zip").value;

    // Make sure the ZIP is shown
    if (document.getElementById("zip").className == "hide") {
        console.log("No zip needed");

        checks[8] = true;

        if (calledByBlur) {
            // Run isValid again in case everything has been solved and thus the big error at the bottom should be removed
            isValid();
        }

        return;
    }

    if (zip === "null" || zip === "") {
        document.getElementById("zipError").innerHTML = "<p>The zip is required</p>";
        console.log("zip invalid — length");
        checks[8] = false;

    }
    else {
        document.getElementById("zipError").innerHTML = "";
        console.log("Zip valid");

        checks[8] = true;

        if (calledByBlur) {
            // Run isValid again in case everything has been solved and thus the big error at the bottom should be removed
            isValid();
        }
    }
}


// Run showZip to hide the zip code
showZip();

function showZip() {
    var country = document.getElementById("logs").value;

    var country = document.getElementById("country").value;
    var zipLabel = document.getElementById("zipLabel");
    var zipCode = document.getElementById("zip");
    if (country == "United States") {
        console.log("Showing ZIP");
        zipLabel.className = "";
        zipCode.className = "";
        // Re-evaluate zip() after showing/hiding
        zip();
    } else {
        console.log("Hiding ZIP");
        zipLabel.className = "hide";
        zipCode.className = "hide";
        // Re-evaluate zip() after showing/hiding
        zip();
    }
}

