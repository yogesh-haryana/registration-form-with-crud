recordInTheTable();
const modalbox = document.getElementById("modal-box");
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
    modalbox.style.display = "none";
}
openTab(event, 'Registration');

const deleteMsg = document.getElementById("delete-success");
const usernameMsg = document.getElementById("usernameMsg");
const emailMsg = document.getElementById("emailMsg");
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
const preview = document.getElementById("preview");
const mobileNan = document.getElementById("mobileNan");


let username = document.studentForm.username;
let email = document.studentForm.email;
let mobileno = document.studentForm.mobileno;
let dob = document.studentForm.dob;
let gender = document.studentForm.gender;
let qualifications = document.studentForm.qualifications;
let profile = document.studentForm.profile;

function onFormSubmit(event) {

    if (Validate() === true) {
        let emailValidIndex = isEmailValid();
        if (emailValidIndex === false) {
            formData = readFormData();
            saveToLocalStorage();
            recordInTheTable();
            resetForm();
            successMsg.style.display = "block";
            updateMsg.style.display = "none";
            mobileNan.style.display = "none";

        }
        else {
            emailAlert.style.display = "block";
        }

    }
    event.preventDefault();
}
// --------------------form validation---------------------
function Validate() {
    let validationStatus = true;
    if (username.value === "") {
        usernameMsg.style.display = "block";
        validationStatus = false;
    }
    if (email.value === "") {
        emailMsg.style.display = "block";
        validationStatus = false;
    }
    if (mobileno.value === "") {
        mobileMsg.style.display = "block";
        validationStatus = false;
    }
    if (isNaN(mobileno.value)) {
        mobileNan.style.display = "block";
        validationStatus = false;
    }
    if (dob.value === "") {
        dobMsg.style.display = "block";
        validationStatus = false;
    }
    if (gender.value === "") {
        genderMsg.style.display = "block";
        validationStatus = false;
    }
    if (qualifications.value === "select") {
        qualificationsMsg.style.display = "block";
        validationStatus = false;
    }
    if (profile.value === "") {
        profileMsg.style.display = "block";
        validationStatus = false;
    }
    return validationStatus;
}
isEmailValid = () => {
    let emailValue = document.getElementById("email").value;

    userData = JSON.parse(localStorage.getItem('userdata'));
    let status = false;

    if (userData) {
        for (let i = 0; i < userData.length; i++) {

            if (emailValue === userData[i].email) {
                status = true;
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
    profileImage = (document.querySelector(`input[type="file"]`).files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', function () {
        document.getElementById("preview").setAttribute("src", this.result);
    });
    reader.readAsDataURL(profileImage);
    let profilePictureURL = document.getElementById("preview").getAttribute("src");
    preview.style.display = "block";
    return profilePictureURL;

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
    let index;
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
                        <td><a onClick="onEdit(${index})">Edit</a> 
                        <a onClick="onDelete(${index})">Delete</a> 
                        <a onClick="onView(${index})">View</a></td>
                 </tr>`

    });
    addDataToTable.innerHTML = html;
    $(document).ready(function () {
        $('#user-table').DataTable()
    });
}


//---------------clearing all input fields-----------------------

function resetForm() {
    username.value = "";
    email.value = "";
    mobileno.value = "";
    dob.value = "";
    genderValueReset();
    qualifications.value = 'select';
    profile.value = null;
    emailAlert.style.display = "none";
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
    preview.style.display="none";


}

//----------------edit button ------------------------------------

function onEdit(index) {
    updateMsg.style.display = "none";
    successMsg.style.display = "none";
    modalbox.style.display = "none";

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
    preview.setAttribute("src", userData[index].profile);
    preview.style.display = "block";
    submitbtn.style.display = "none";
    updatebtn.style.display = "block";
    openTab(event, 'Registration');


}

//--------------------updating data--------------------------

function updateRecord() {

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
    submitbtn.style.display = "block";
    updatebtn.style.display = "none";
    updateMsg.style.display= "block";
    // e.stopPropagation();
    // preventDefault();

}

//-----------------------delete button------------------------

function onDelete(index) {
    modalbox.style.display = "none";
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
    modalbox.style.display = "block";
    userData = JSON.parse(localStorage.getItem('userdata'));
    let showURL = userData[index].profile;

    let viewHtml = '';
    viewHtml += `<table id="view-table">
    <tr>
    <td><img src="${showURL}" alt="" id ="user-dp"></td>
</tr>
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
    modalbox.innerHTML = viewHtml;
}