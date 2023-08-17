// require('dotenv').config();
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyB8Pyl0oG86mB5J-tYndPfydCPu6WsrWDc",
    authDomain: "phone-keired.firebaseapp.com",
    projectId: "phone-keired",
    storageBucket: "phone-keired.appspot.com",
    messagingSenderId: "334878868451",
    appId: "1:334878868451:web:4d3975218ad170d5d2d6d6",
    measurementId: "G-CYCD9F048C"
};




const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
const auth = getAuth();


const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const main = document.getElementById("main");
const createacct = document.getElementById("create-acct");

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById(
    "confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");

const returnBtn = document.getElementById("return-btn");

var email,
    password,
    signupEmail,
    signupPassword,
    confirmSignupEmail,
    confirmSignUpPassword;

createacctbtn.addEventListener("click", function () {
    var isVerified = true;

    signupEmail = signupEmailIn.value;
    confirmSignupEmail = confirmSignupEmailIn.value;
    if (signupEmail != confirmSignupEmail) {
        window.alert("Email fields do not match. Try again.");
        isVerified = false;
    }

    signupPassword = signupPasswordIn.value;
    confirmSignUpPassword = confirmSignUpPasswordIn.value;
    if (signupPassword != confirmSignUpPassword) {
        window.alert("Password fields do not match. Try again.");
        isVerified = false;
    }

    if (
        signupEmail == null ||
        confirmSignupEmail == null ||
        signupPassword == null ||
        confirmSignUpPassword == null
    ) {
        window.alert("Please fill out all required fields.");
        isVerified = false;
    }

    if (isVerified) {
        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            .then((userCredential) => {
                // Signed in
                // const user = userCredential.user;
                // ...
                window.alert("Success! Account created.");
                window.location = "./registration.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                window.alert("Error occurred. Try again.");
                window.alert(errorMessage);
            });
    }
});

submitButton.addEventListener("click", function () {
    email = emailInput.value;
    // console.log(email);
    password = passwordInput.value;
    // console.log(password);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            window.alert("Success! Welcome back!");
            window.location = "./registration.html";

            // ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            window.alert("Error occurred. Try again.");
        });
});

signupButton.addEventListener("click", () => {
    main.style.display = "none";
    createacct.style.display = "block";
});

returnBtn.addEventListener("click", function () {
    main.style.display = "block";
    createacct.style.display = "none";
});  
