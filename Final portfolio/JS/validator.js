// Array to store the validity of each field
var checks = [false, false, false];

function isValid() { // There is a evaluate parameter to prevent infinite loops caused by checks by blur events
    message();
    email();
    name(); 

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

document.getElementById("msg").addEventListener('blur', function () { msg(true) }, false);
document.getElementById("email").addEventListener('blur', function () { email(true) }, false);
document.getElementById("name").addEventListener('blur', function () { name(true) }, false);

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