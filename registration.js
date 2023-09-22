const firebaseConfig = {
    apiKey: "AIzaSyB8Pyl0oG86mB5J-tYndPfydCPu6WsrWDc",
    authDomain: "phone-keired.firebaseapp.com",
    projectId: "phone-keired",
    storageBucket: "phone-keired.appspot.com",
    messagingSenderId: "334878868451",
    appId: "1:334878868451:web:4d3975218ad170d5d2d6d6",
    measurementId: "G-CYCD9F048C"
};
firebase.initializeApp(firebaseConfig);

function validateEmail() {
    var emailID = document.form.Emailaddress.value;
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".");

    if (atpos < 1 || (dotpos - atpos < 2)) {
        alert("Please enter correct email ID")
        document.form.Emailaddress.focus();
        return false;
    }
    return (true);
}
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
        .ref("personaldetails/" + code)
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
    firebase.database().ref("personaldetails/" + code).remove();
    document.getElementById(code).remove();
    firebase.database().ref("personaldetails/" + code).update({
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

    //update data and remove update and cancel button
}
function updateData(c) {
    var updateFullName = document.getElementById("FullName").value
    var updatePassportNumber = document.getElementById("PassportNumber").value
    var updateLocation = document.getElementById("Location").value
    var updateEmailaddress = document.getElementById("Emailaddress").value

    firebase.database().ref("personaldetails/" + c).update({
        FullName: updateFullName,
        passportNumber: updatePassportNumber,
        location: updateLocation,
        Emailaddress: updateEmailaddress,

    }
    );
    document.getElementById("FullName").value = "";
    document.getElementById("PassportNumber").value = "";
    document.getElementById("Location").value = "";
    document.getElementById("Emailaddress").value = "";
    document.getElementById("updateDetails").remove();
    document.getElementById("cancelDetails").remove();

    document.getElementById("form-btns").innerHTML = `
    <button type="submit" class="button submit" id="addpersonalDetails">󠀫󠀫SUBMIT</button>
    `;

    document.getElementById(c).querySelector(".data").querySelector(".fullName").innerHTML = updateFullName;
    document.getElementById(c).querySelector(".data").querySelector(".passportNumber").innerHTML = updatePassportNumber;
    document.getElementById(c).querySelector(".data").querySelector(".location").innerHTML = updateLocation;
    document.getElementById(c).querySelector(".data").querySelector(".Emailaddress").innerHTML = updateEmailaddress;



}
function cancelupdation() {
    document.getElementById("FullName").value = ""
    document.getElementById("PassportNumber").value = ""
    document.getElementById("Location").value = ""
    document.getElementById("Emailaddress").value = ""
    document.getElementById("updateDetails").remove();
    document.getElementById("cancelDetails").remove();

    document.getElementById("form-btns").innerHTML = `
    <button type="submit" class="button submit" id="addpersonalDetails">󠀫󠀫SUBMIT</button>
    `;
}
var data;
firebase
    .database()
    .ref("personaldetails")
    .on("value", function (snapshot) {
        data = snapshot.val();
    });
function showAll() {
    if (data === null && document.getElementById("info") == null) {
        document.getElementById("data-header").insertAdjacentHTML(
            "afterend",
            `<div class="no-task-info" id = "info">
                  <i class="fas fa-info-circle"></i>
                  No pending tasks
              </div>`
        );
    }

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

function deleteAll() {
    var option = false
    if

        (totalItem === 0 && document.getElementById("info") === null) {
        document.getElementById("data-header").insertAdjacentHTML(
            "afterend",
            `<div class="no-task-info" id = "info">
        <i class="fas fa-info-circle"></i>
        No pending tasks
    </div>`
        )
    }

    if (totalItem !== 0) {
        option = confirm(
            "The tasks will be permanently deleted. Do you want to continue?"
        );
        if (option === true) {
            firebase.database().ref("personaldetails").remove();
            document.querySelectorAll(".personal-details-item").forEach((element) => {
                element.remove();
            });
            firebase.database().ref("Totalpersonaldetails").update({
                totalItems: 0,
                maxCode: 0,
            });
            document.getElementById("data-header").insertAdjacentHTML(
                "afterend",
                `<div class="no-task-info" id = "info">
                <i class="fas fa-info-circle"></i>
                All items deleted
            </div>`
            );
        }
    }
}
