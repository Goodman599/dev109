function isValid() {

    event.preventDefault();

    // I am not putting all of them in a single if statement with &&
    // This is because it stops evaluating the rest of the checks if one fails
    var valid = true;
    if (!names(0)) { valid = false; }
    if (!names(1)) { valid = false; }
    if (!email()) { valid = false; }
    if (!phone()) { valid = false; }
    if (!username()) { valid = false; }
    if (!password()) { valid = false; }

    console.log(/^[A-Z]+$/.test("asdAasd"))

    if (valid) {
        return true;
    }
    else {
        document.getElementById("submitError").innerHTML = "<p><strong>Error Submitting — See Above</strong></p>";
        event.preventDefault();
        return false;
    }
}

document.getElementById("firstName").addEventListener('blur', function () { names(0) }, false);
document.getElementById("lastName").addEventListener('blur', function () { names(1) }, false);
document.getElementById("email").addEventListener('blur', function () { email() }, false);
document.getElementById("phone").addEventListener('blur', function () { phone() }, false);
document.getElementById("username").addEventListener('blur', function () { username() }, false);
document.getElementById("password").addEventListener('blur', function () { password() }, false);


function names(nameType) {
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
    }

    //4) Send error message to HTML
    document.getElementById(nameData[nameType][0].charAt(0) + "nameError").innerHTML = errorMessages;

    //5) return status of each field
    return (validName);
}

function email() {
    var userEmail = document.getElementById("email").value;
    var atpos = userEmail.indexOf("@");
    var dotpos = userEmail.lastIndexOf(".");

    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= userEmail.length) {
        document.getElementById("emailError").innerHTML = "<p>Invalid email </p>";
        console.log("Invalid email");
    } else {
        document.getElementById("emailError").innerHTML = "";
        console.log("Email valid");
        return true;
    }
}

function phone() {
    var phone = document.getElementById("phone").value;
    if (isNaN(phone) || phone.length > 15 || phone === null || phone === "") {
        document.getElementById("phoneError").innerHTML = "<p>Invalid phone number </p>";
    } else {
        document.getElementById("phoneError").innerHTML = "";
        console.log("Phone number valid");
        return true;
    }
}

function username() {
    var username = document.getElementById("username").value;
    if (username === "null" || username === "" || username.length > 12) {
        document.getElementById("usernameError").innerHTML = "<p>The username is required and cannot be greater than 12 characters</p>";
        console.log("username invalid — length");
    }
    else {
        document.getElementById("usernameError").innerHTML = "";
        console.log("Username valid");
        return true;
    }
}

function password() {
    var password = document.getElementById("password").value;
    if (password === "null" || password === "" || password.length > 17) {
        document.getElementById("passwordError").innerHTML = "<p>The password is required and cannot be greater than 17 characters</p>";
        console.log("password invalid — length");

    } else if (/[A-Z]/g.test(password) == false) { // test for capital letters
        document.getElementById("passwordError").innerHTML = "<p>The password requires at least 1 uppercase letter</p>";
        console.log("password invalid — uppercase");

    } else if (/[a-z]/g.test(password) == false) { // test for lowercase letters
        document.getElementById("passwordError").innerHTML = "<p>The password requires at least 1 lowercase letter</p>";
        console.log("password invalid — lowercase");

    } else if (/[1-9]/g.test(password) == false) { // test for number
        document.getElementById("passwordError").innerHTML = "<p>The password requires at least 1 number</p>";
        console.log("password invalid — number");

    } else if (/[!@#$%^&* ()_ +\-=\[\]{ }; ':\"\\|,.<>\/?]/g.test(password) == false) { // test for special characters
        document.getElementById("passwordError").innerHTML = "<p>The password requires at least 1 special character</p>";
        console.log("password invalid — special character");

    } else {
        document.getElementById("passwordError").innerHTML = "";
        console.log("Password valid");
        return true;
    }
}

// Run showZip to hide the zip code
showZip();

function showZip() {
    var country = document.getElementById("logs").value;

    var country = document.getElementById("country").value;
    var zipLabel = document.getElementById("zipLabel");
    var zip = document.getElementById("zip");
    if (country == "United States") {
        console.log("Showing ZIP");
        zipLabel.className = "";
        zip.className = "";
    } else {
        console.log("Hiding ZIP");
        zipLabel.className = "hide";
        zip.className = "hide";
    }
}