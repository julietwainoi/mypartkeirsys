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
<div class="button edit" id="editData" onclick="editData(${code})">EDIT</div>

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

    document.getElementById("FullName").value = document.getElementById(c).querySelector(".data").querySelector(".fullName").innerHTML

    document.getElementById("PassportNumber").value = document.getElementById(c).querySelector(".data").querySelector(".passportNumber").innerHTML
    document.getElementById("Location").value = document.getElementById(c).querySelector(".data").querySelector(".location").innerHTML
    document.getElementById("Emailaddress").value = document.getElementById(c).querySelector(".data").querySelector(".Emailaddress").innerHTML

    if (document.getElementById("addpersonalDetails") !== null) {
        document.getElementById("addpersonalDetails").remove()


    }

    document.getElementById("form-btns").innerHTML = `
    <button class="button update" id = "updateDetails" onclick = "updateData('${c}')">󠀫󠀫<i class="fas fa-sync-alt"></i> UPDATE TASK</button>
    <button class="button cancel" id = "cancelDetails" onclick = "cancelupdation()"><i class="fas fa-ban"></i> CANCEL</button>
    `;


}
function updateData(c) {
    var updateFullName = Document.getElementById("FullName").value
    var updatePassportNumber = Document.getElementById("PassportNumber").value
    var updateLocation = Document.getElementById("Location").value
    var updateEmailaddress = Document.getElementById("Emailaddress").value

    firebase.database().ref(`personaldetails/${c}`).update({
        FullName: updateFullName,
        passportNumber: updatePassportNumber,
        location: updateLocation,
        Emailaddress: updateEmailaddress,

    }
    );
    Document.getElementById("FullName").value = ""
    Document.getElementById("PassportNumber").value = ""
    Document.getElementById("Location").value = ""
    Document.getElementById("Emailaddress").value = ""
    Document.getElementById("updateDetails").remove();
    Document.getElementById("cancelDetails").remove();

    document.getElementById("form-btns").innerHTML = `
    <button type="submit" class="button submit" id="addpersonalDetails" >󠀫󠀫SUBMIT</button>
    `;

    document.getElementById(c).querySelector(".data").querySelector(".fullName").innerHTML = updateFullName;
    document.getElementById(c).querySelector(".data").querySelector(".passportNumber").innerHTML = updatePassportNumber;
    document.getElementById(c).querySelector(".data").querySelector(".location").innerHTML = updateLocation;
    document.getElementById(c).querySelector(".data").querySelector(".Emailaddress").innerHTML = updateEmailaddress; s



}
function cancelupdation() {
    Document.getElementById("FullName").value = ""
    Document.getElementById("PassportNumber").value = ""
    Document.getElementById("Location").value = ""
    Document.getElementById("Emailaddress").value = ""
    Document.getElementById("updateDetails").remove();
    Document.getElementById("cancelDetails").remove();

    document.getElementById("form-btns").innerHTML = `
    <button type="submit" class="button submit" id="addpersonalDetails">󠀫󠀫SUBMIT</button>
    `;
}




