recordInTheTable();
function openTab(event, buttonName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(buttonName).style.display = "block";
    // event.target.className += " active";
}
openTab(event, 'Registration');
const deleteMsg = document.getElementById("delete-success");
const usernameMsg = document.getElementById("usernameMsg");
const emailMsg = document.getElementById("emailMsg");
const emailFormatMsg = document.getElementById("emailFormat");
const mobileMsg = document.getElementById("mobileMsg");
const dobMsg = document.getElementById("dobMsg");
const genderMsg = document.getElementById("genderMsg");
const qualificationsMsg = document.getElementById("qualificationsMsg");
const profileMsg = document.getElementById("profileMsg");
const emailAlert = document.getElementById("emailalert");
const successMsg = document.getElementById("successmsg");
const updateMsg = document.getElementById("updatemsg");
const saveIndex = document.getElementById("saveIndex");
const submitbtn = document.getElementById("submitbtn");
const updatebtn = document.getElementById("updatebtn");
const previewprofile = document.getElementById("preview-profile");
const previewdiv = document.getElementById("preview-div")
const mobileNan = document.getElementById("mobileNan");
const mobilelengthmsg = document.getElementById("mobilelengthmsg");
const popupContent = document.getElementsByClassName("content")[0];
const userdp = document.getElementById("user-dp")

let username = document.studentForm.username;
let email = document.studentForm.email;
let mobileno = document.studentForm.mobileno;
let dob = document.studentForm.dob;
let gender = document.studentForm.gender;
let qualifications = document.studentForm.qualifications;
let profile = document.studentForm.profile;


function onFormSubmit(event) {
    event.preventDefault();

    if (formValidation() === true) {
        formData = readFormData();
        saveToLocalStorage();
        recordInTheTable();
        resetForm();
        successMsg.style.display = "block";
        updateMsg.style.display = "none";
        mobileNan.style.display = "none";
    }
    else {
        // validationMessages();
    }
    event.preventDefault();
}

// --------------------form validation---------------------
function formValidation() {
    let validationstatus = true
    if (usernameValidation() === false) {
        validationstatus = false
    }
    if (EmailFunction() === false) {
        validationstatus = false
    }
    if (isEmailValid() === false) {
        validationstatus = false
    }
    if (mobileValidation() === false) {
        validationstatus = false
    }
    if (genderValidation() === false) {
        validationstatus = false
    }
    if (dobValidation() === false) {
        validationstatus = false
    }
    if (qualificationValidation() === false) {
        validationstatus = false
    }
    if (imageValidation() === false) {
        uploadImage();
        validationstatus = false
    }
    return validationstatus
}

function usernameValidation() {
    if (username.value === "") {
        usernameMsg.style.display = "block";
        return false;
    }
    else {
        usernameMsg.style.display = "none";
        return true;
    }
}
function EmailFunction() {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value === "") {
        emailMsg.style.display = "block";
        emailFormatMsg.style.display = "none";
        emailAlert.style.display = "none";
        return false;
    }
    else if (isEmailValid() === false) {
        emailAlert.style.display = "block";
        emailFormatMsg.style.display = "none";
        emailMsg.style.display = "none";
        return false;
    }
    else if (!email.value.match(mailformat)) {
        emailAlert.style.display = "none";
        emailFormatMsg.style.display = "block";
        emailMsg.style.display = "none";

        return false;
    }
    else {
        emailAlert.style.display = "none";
        emailMsg.style.display = "none";
        emailFormatMsg.style.display = "none";
        return true;
    }
}
function mobileValidation() {
    if (mobileno.value === "") {
        mobileMsg.style.display = "block";
        return false;
    }
    else if (isNaN(mobileno.value)) {
        mobileMsg.style.display = "none";
        mobilelengthmsg.style.display = "none"
        mobileNan.style.display = "block";
        return false;
    }
    else if (mobileno.value.length < 10) {
        mobilelengthmsg.style.display = "block"
        mobileMsg.style.display = "none";
        mobileNan.style.display = "none"
    }
    else {
        mobilelengthmsg.style.display = "none"
        mobileMsg.style.display = "none";
        mobileNan.style.display = "none"
    }

}
function genderValidation() {
    if (genderValue() === null) {
        genderMsg.style.display = "block";
        return false;
    }
    else {
        genderMsg.style.display = "none";
        return true;
    }
}

function dobValidation() {
    if (dob.value === "") {
        dobMsg.style.display = "block";
        return false;
    }
    else {
        dobMsg.style.display = "none"
        return true;
    }
}

function qualificationValidation() {
    if (qualifications.value === "select") {
        qualificationsMsg.style.display = "block";
        return false;
    }
    else {
        qualificationsMsg.style.display = "none";
        return true
    }
}
function imageValidation() {
    if (uploadImage() === null || uploadImage() === undefined) {
        previewdiv.style.display = "none"
        profileMsg.style.display = "block";
        return false;
    }
    else {
        previewdiv.style.display = "block"
        profileMsg.style.display = "none";
        return true;
    }
}

function isEmailValid() {
    let emailValue = document.getElementById("email").value;
    userData = JSON.parse(localStorage.getItem('userdata'));
    let status = true;
    if (userData) {
        for (let i = 0; i < userData.length; i++) {
            if (emailValue === userData[i].email) {
                status = false;
            }
        }
    }
    return status;
}

let genderValue = () => {

    for (let i = 0; i < gender.length; i++) {
        if ((gender[i].checked) == true) {
            return gender[i].value;
        }
    }
}
$(document).ready(function () {
    var currentDate = new Date();
    $('#dob').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        endDate: "currentDate",
        maxDate: currentDate
    }).on('changeDate', function () {
        $(this).datepicker('hide');
    });
    $('#dob').keyup(function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9^-]/g, '');
        }
    });
});
let genderValueReset = () => {

    for (let i = 0; i < gender.length; i++) {
        gender[i].checked = false;
    }
}

let getSelectValue = () => {
    let selectValue = document.getElementById("qualifications").value;
    return selectValue;
}
var uploadImage = () => {
    var profileImage = document.getElementById("profile").files[0];
    if (profileImage != null && profileImage != undefined) {
        const reader = new FileReader();
        reader.addEventListener('load', function () {
            previewprofile.setAttribute("src", this.result);
        });
        reader.readAsDataURL(profileImage);
        let profilePictureURL = previewprofile.getAttribute("src");
        return profilePictureURL;
    }
    else{
        profileMsg.style.display = "block";
        previewdiv.style.display = "none";
        profilePictureURL = null;
        return profilePictureURL;

    }
}
//--------binding formdata in objects ------------------------
function readFormData() {
    var formData = {};
    formData["username"] = username.value;
    formData["email"] = email.value;
    formData["mobileno"] = mobileno.value;
    formData["dob"] = dob.value;
    formData["gender"] = genderValue();
    formData["qualifications"] = getSelectValue();
    formData["profile"] = uploadImage();
    return formData;
}

//---------saving data as array of objects in local storage-------

function saveToLocalStorage() {
    let userData;
    if (localStorage.getItem('userdata')) {
        userData = JSON.parse(localStorage.getItem('userdata'));
    }
    else {
        userData = [];
    }
    userData.push(formData)
    localStorage.setItem('userdata', JSON.stringify(userData));
    recordInTheTable();
}

//---------showing essential information in tabular form with the data in localstorage

function recordInTheTable() {
    let oldRecords = localStorage.getItem('userdata');
    if (oldRecords == null) {
        userData = [];
    }
    else {
        userData = JSON.parse(oldRecords);
    }
    let html = '';
    let addDataToTable = document.getElementById("user-table-body");
    userData.forEach((formData, index) => {
        html += `<tr>
                        <td>${index + 1}</td>
                        <td>${formData.username}</td>
                        <td>${formData.email}</td>
                        <td><a onClick="onEdit(${index})"> <i class="fa fa-pencil" aria-hidden="true"></i> </a> 
                        <a onClick="onDelete(${index})"> <i class="fa fa-trash-o" aria-hidden="true"></i> </a> 
                        <a href="#modal" onClick="onView(${index})"> <i class="fa fa-eye" aria-hidden="true"></i> </a></td>
                 </tr>`

    });
    addDataToTable.innerHTML = html;

}
$(document).ready(function () {
    $('.user-table').DataTable()
});

function validationMessages() {
    successMsg.style.display = "none";
    updateMsg.style.display = "none";
    profileMsg.style.display = "none";
    genderMsg.style.display = "none";
    qualificationsMsg.style.display = "none";
    mobileMsg.style.display = "none";
    mobileNan.style.display = "none";
    dobMsg.style.display = "none";
    emailMsg.style.display = "none";
    usernameMsg.style.display = "none";
    emailAlert.style.display = "none"
    emailFormatMsg.style.display = "none"
}

//---------------clearing all input fields-----------------------

function resetForm() {
    username.value = "";
    email.value = "";
    mobileno.value = "";
    dob.value = "";
    genderValueReset();
    qualifications.value = 'select';
    validationMessages();
    previewprofile.value = null;
    previewdiv.style.display = "none";
}
//----------------edit button ------------------------------------
function onEdit(index) {
    updateMsg.style.display = "none";
    successMsg.style.display = "none";
    let genderHere = document.getElementsByName("gender");
    saveIndex.value = index;
    userData = JSON.parse(localStorage.getItem('userdata'));
    username.value = userData[index].username;
    email.value = userData[index].email;
    mobileno.value = userData[index].mobileno;
    dob.value = userData[index].dob;
    for (let j = 0; j <= genderHere.length; j++) {
        if (genderHere[j].value === userData[index].gender) {
            genderHere[j].checked = true;
            break;
        }
    }
    qualifications.value = userData[index].qualifications;
    previewprofile.setAttribute("src", userData[index].profile);
    previewdiv.style.display = "block";
    previewprofile.style.display = "block";
    submitbtn.style.display = "none";
    updatebtn.style.display = "inline-block";
    openTab(event, 'Registration');

}

//--------------------updating data--------------------------

function updateRecord() {
    formValidation();
    let genderHere = document.getElementsByName("gender");
    userData = JSON.parse(localStorage.getItem('userdata'));
    let savedIndex = document.getElementById("saveIndex").value;
    userData[savedIndex].username = username.value;
    userData[savedIndex].email = email.value;
    userData[savedIndex].mobileno = mobileno.value;
    userData[savedIndex].dob = dob.value;
    for (let j = 0; j <= genderHere.length; j++) {
        if (genderHere[j].checked === true) {
            userData[savedIndex].gender = genderHere[j].value;
            break;
        }
    }
    userData[savedIndex].qualifications = qualifications.value;
    userData[savedIndex].profile = uploadImage();
    localStorage.setItem('userdata', JSON.stringify(userData));
    recordInTheTable();
    resetForm();
    validationMessages();
    submitbtn.style.display = "inline-block";
    updatebtn.style.display = "none";
    updateMsg.style.display = "block";
    previewdiv.style.display = "none";


}

//-----------------------delete button------------------------

function onDelete(index) {
    updateMsg.style.display = "none";
    successMsg.style.display = "none";

    if (confirm("Are you sure to delete!") == true) {
        userData = JSON.parse(localStorage.getItem('userdata'));
        userData.splice(index, 1);
        if (userData.length === 0) {
            localStorage.clear();
        }
        localStorage.setItem('userdata', JSON.stringify(userData));
        deleteMsg.style.display = "block";
    }

    recordInTheTable();
}

//--------------------------view button ----------------------

function onView(index) {
    updateMsg.style.display = "none";
    successMsg.style.display = "none";
    deleteMsg.style.display = "none";

    userData = JSON.parse(localStorage.getItem('userdata'));
    let showURL = userData[index].profile;

    let viewHtml = '';
    viewHtml += `<div class="dp-holder"><img src="${showURL}" id ="user-dp"></div>
    <table id="view-table">
    <tr>
        <td>UserName : </td>
        <td>${userData[index].username}</td>
    </tr>
    <tr>
        <td>Email : </td>
        <td>${userData[index].email}</td>
    </tr>
    <tr>
        <td>Mobile Number : </td>
        <td>${userData[index].mobileno}</td>
    </tr>
    <tr>
        <td>Date Of birth : </td>
        <td>${userData[index].dob}</td>
    </tr>
    <tr>
        <td>Gender : </td>
        <td>${userData[index].gender}</td>
    </tr>
    <tr>
        <td>Highest Qualifications : </td>
        <td>${userData[index].qualifications}</td>
    </tr>
    </table>
    `
    popupContent.innerHTML = viewHtml;
    recordInTheTable();
}