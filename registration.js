const firebaseConfig = {
    apiKey: "AIzaSyB2sKntIdOUuRCZDyQmWQwR7ipVCWNULe0",
    authDomain: "keir-system.firebaseapp.com",
    databaseURL: "https://keir-system-default-rtdb.firebaseio.com",
    projectId: "keir-system",
    storageBucket: "keir-system.appspot.com",
    messagingSenderId: "1024894883197",
    appId: "1:1024894883197:web:6278b53d7bc470d8346814",
    measurementId: "G-M7GX4YMQCK"
};

firebase.initializeApp(firebaseConfig);


var totalItem;
var maxCode;
var code;

function storeData(event) {
    event.preventDefault()

    var fullName = document.getElementById("FullName").value;
    var PassportNumber = document.getElementById("PassportNumber").value;
    var location = document.getElementById("Location").value;
    var Emailaddress = document.getElementById("Emailaddress").value;

    document.getElementById("FullName").value = ""
    document.getElementById("PassportNumber").value = ""
    document.getElementById("Location").value = ""
    document.getElementById("Emailaddress").value = ""

    //storing data into the database
    firebase
        .database()
        .ref(`personaldetails/${code}`)
        .set({
            FullName: fullName,
            passportNumber: PassportNumber,
            location: location,
            Emailaddress: Emailaddress,

        })
    document.getElementById("data-header").insertAdjacentHTML(
        "afterend",
        `
<div class="personal-details-item" id="${code}">
<div class="data" id="${fullName}">
<button class="done" id="done" onclick="changeStatus(${code})"><i class="fa fa-check-circle"></i></button>
<h2 class="fullName">${fullName}</h2>
<p class="passportNumber">${PassportNumber}</p>
<p class="location">${location}</p>
<p class="Emailaddress">${Emailaddress}</p>
<p id="status"></p> 

</div>
<hr>

<div class="buttons" >
<div class="button edit" id="editData">EDIT</div>

<div class="button delete" id="deleteData" onclick="deleteData(${code})">DELETE</div>
</div>
</div>



`
    );


}


function deleteData(code) {
    firebase.database().ref(`personaldetails/${code}`).remove();
    document.getElementById(code).remove();
    firebase.database().ref(`personaldetails/${code}`).update({
        totalItem: totalItem - 1,
    })

}
function editData(c) {

    document.getElementById("fullName").value = document.getElementById(c).querySelector(".data").querySelector(".fullName").innerHTML

    document.getElementById("passportNumber").value = document.getElementById(c).querySelector(".data").querySelector(".passpportNumber").innerHTML
    document.getElementById("location").value = document.getElementById(c).querySelector(".data").querySelector(".location").innerHTML
    document.getElementById("Emailaddress").value = document.getElementById(c).querySelector(".data").querySelector(".Emailaddress").innerHTML

    if (document.getElementById("submit" !== null)) {
        document.getElementById("submit").remove()


    }




}



