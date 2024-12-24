
function showPass(inputType) {
    viewPass.classList.add("hide");
    viewPassConf.classList.add("hide");
    obfuscatePass.classList.remove("hide");
    obfuscatePassConf.classList.remove("hide");
    password.type = "text";
    passwordConfirmation.type = "text";

    if (inputType == "choose") {
        password.focus();
    }
    else if (inputType == "conf") {
        passwordConfirmation.focus();
    }
}

function hidePass(inputType) {
    viewPass.classList.remove("hide");
    viewPassConf.classList.remove("hide");
    obfuscatePass.classList.add("hide");
    obfuscatePassConf.classList.add("hide");
    password.type = "password";
    passwordConfirmation.type = "password";

    if (inputType == "choose") {
        password.focus();
    }
    else if (inputType == "conf") {
        passwordConfirmation.focus();
    }
}

function checkPassValidity() {
    document.querySelector(".validation-info").classList.remove("hide");
    let pass = password.value;
    let count = 0;

    if (pass.length >= 10) {
        validList[0].classList.remove("hide");
        invalidList[0].classList.add("hide");
        count++;
    }
    else if (pass.length < 10) {
        invalidList[0].classList.remove("hide");
        validList[0].classList.add("hide");
    }

    if (/\d/.test(pass)) {
        validList[1].classList.remove("hide");
        invalidList[1].classList.add("hide");
        count++;
    }
    else if (!/\d/.test(pass)) {
        invalidList[1].classList.remove("hide");
        validList[1].classList.add("hide");
    }

    if (pass !== pass.toLowerCase()) {
        validList[2].classList.remove("hide");
        invalidList[2].classList.add("hide");
        count++;
    }
    else if (pass === pass.toLowerCase()) {
        invalidList[2].classList.remove("hide");
        validList[2].classList.add("hide");
    }

    if (count == 3) {
        document.querySelector(".validation-header-invalid").classList.add("hide");
        document.querySelector(".validation-header-info").classList.add("hide");
        document.querySelector(".validation-header-valid").classList.remove("hide");
        return true;

    }
    
    else {
        document.querySelector(".validation-header-invalid").classList.remove("hide");
        document.querySelector(".validation-header-info").classList.remove("hide");
        document.querySelector(".validation-header-valid").classList.add("hide");
        return false;
    }
}

function passwordsMatching() {
    if (password.value != passwordConfirmation.value) {
        document.querySelector(".password-error").classList.remove("hide");
        return false;
    }
    else {
        document.querySelector(".password-error").classList.add("hide");
        return true;
    }
}


let email = document.querySelector("#email");
let password = document.querySelector("#password");
let passwordConfirmation = document.querySelector("#conf-password");

let form = document.querySelector(".form-cont");
let submitButton = document.querySelector(".form-button");

let viewPass = document.querySelectorAll(".open")[0];
let viewPassConf = document.querySelectorAll(".open")[1];

let obfuscatePass = document.querySelectorAll(".close")[0];
let obfuscatePassConf = document.querySelectorAll(".close")[1];

let invalidList = document.querySelectorAll(".invalid");
let validList = document.querySelectorAll(".valid");

viewPass.addEventListener("click", () => {
    showPass("choose");
});

viewPassConf.addEventListener("click", () => {
    showPass("conf");
});

obfuscatePass.addEventListener("click", () => {
    hidePass("choose");
});

obfuscatePassConf.addEventListener("click", () => {
    hidePass("conf");
})

email.addEventListener("invalid", (e) => {
    e.preventDefault();
    document.querySelector(".email-error").classList.remove("hide");
    submitButton.classList.add("error-background");
});

password.addEventListener("invalid", (e) => {
    e.preventDefault();
    checkPassValidity();
    submitButton.classList.add("error-background");
});

password.addEventListener("keyup", () => {
    checkPassValidity();
});

passwordConfirmation.addEventListener("invalid", (e) => {
    e.preventDefault();
    passwordsMatching();
    submitButton.classList.add("error-background");
});

passwordConfirmation.addEventListener("keyup", () => {
    passwordsMatching();
});

form.addEventListener("submit", (e) => {
    if (!(checkPassValidity() && passwordsMatching())) {
        e.preventDefault();
        submitButton.classList.add("error-background");
    }
    hidePass();

});