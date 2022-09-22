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

// -------------form starts here----------------
const emailAlert = document.getElementById("emailAlert");
const successMsg = document.getElementById("success");
const updateMsg = document.getElementById("update-success");
const deleteMsg = document.getElementById("delete-success");
const modalbox = document.getElementById("modal-box");

function onFormSubmit(event) {
    let emailValidIndex = isEmailValid();
    if (emailValidIndex === false) {
        formData = readFormData();
        saveToLocalStorage();
        recordInTheTable();
        resetForm();
        successMsg.style.display = "block";
        updateMsg.style.display = "none";

    }
    else {
        emailAlert.style.display = "block";
    }
    event.preventDefault();

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
    let gender = document.getElementsByName("gender");

    for (let i = 0; i < gender.length; i++) {
        if ((gender[i].checked) == true) {
            return gender[i].value;
        }
    }
}
let genderValueReset = () => {
    let gender = document.getElementsByName("gender");

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
        document.getElementById("demo-image").setAttribute("src", this.result);
    });
    reader.readAsDataURL(profileImage);
    let profilePictureURL = document.getElementById("demo-image").getAttribute("src");
    return profilePictureURL;

}
//--------binding formdata in objects ------------------------
function readFormData() {
    var formData = {};
    formData["username"] = document.getElementById("username").value;
    formData["email"] = document.getElementById("email").value;
    formData["phno"] = document.getElementById("phno").value;
    formData["dob"] = document.getElementById("dob").value;
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
                        <td><a onClick="onEdit(${index})">Edit</a> | 
                        <a onClick="onDelete(${index})">Delete</a> | 
                        <a onClick="onView(${index})">View</a></td>
                 </tr>`

    });
    addDataToTable.innerHTML = html;

}

//---------------clearing all input fields-----------------------

function resetForm() {
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phno").value = "";
    document.getElementById("dob").value = "";
    genderValueReset();
    document.getElementById("qualifications").value = '';
    document.getElementById("profile").value = null;
    emailAlert.style.display = "none";
    successMsg.style.display = "none";
    updateMsg.style.display = "none";
}

//----------------edit button ------------------------------------

function onEdit(index) {
    updateMsg.style.display = "none";
    successMsg.style.display = "none";
    modalbox.style.display = "none";

    let saveIndex = document.getElementById("saveIndex");
    const submitbtn = document.getElementById("submitbtn");
    const updatebtn = document.getElementById("update");
    let genderHere = document.getElementsByName("gender");
    saveIndex.value = index;
    userData = JSON.parse(localStorage.getItem('userdata'));

    document.getElementById("username").value = userData[index].username;
    document.getElementById("email").value = userData[index].email;
    document.getElementById("phno").value = userData[index].phno;
    document.getElementById("dob").value = userData[index].dob;
    for (let j = 0; j <= genderHere.length; j++) {
        if (genderHere[j].value === userData[index].gender) {
            genderHere[j].checked = true;
            break;
        }
    }
    document.getElementById("qualifications").value = userData[index].qualifications;

    submitbtn.style.display = "none";
    updatebtn.style.display = "block";
    openTab(event, 'Registration');


}

//--------------------updating data--------------------------

function updateRecord() {

    const submitbtn = document.getElementById("submitbtn");
    const updatebtn = document.getElementById("update");
    let genderHere = document.getElementsByName("gender");

    userData = JSON.parse(localStorage.getItem('userdata'));
    var saveIndex = document.getElementById("saveIndex").value;

    userData[saveIndex].username = document.getElementById("username").value;
    userData[saveIndex].email = document.getElementById("email").value;
    userData[saveIndex].phno = document.getElementById("phno").value;
    userData[saveIndex].dob = document.getElementById("dob").value;
    for (let j = 0; j <= genderHere.length; j++) {
        if (genderHere[j].checked === true) {
            userData[saveIndex].gender = genderHere[j].value;
            break;
        }
    }
    document.getElementById("qualifications").value = userData[saveIndex].qualifications;
    localStorage.setItem('userdata', JSON.stringify(userData));
    recordInTheTable();
    resetForm();
    submitbtn.style.display = "block";
    updatebtn.style.display = "none";
    updateMsg.style.display = "block";
    successMsg.style.display = "none";

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
    <td>${userData[index].phno}</td>
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