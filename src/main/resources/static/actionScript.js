function getFromAPI(url) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false); // false for synchronous request
    xmlHttp.send(null);
    if (xmlHttp.responseText) {
        return xmlHttp.responseText;
    }
    return false
}

function postToAPI(url) {

    var xmlHttp = new XMLHttpRequest();

    var formData = new FormData();
    formData.append("id", $('#editModal #modalEdit_id').val());
    formData.append("login", $('#editModal #modalEdit_username').val());
    formData.append("password", $('#editModal #modalEdit_password').val());
    formData.append("name", $('#editModal #modalEdit_name').val());
    formData.append("email", $('#editModal #modalEdit_email').val());
    formData.append("adress", $('#editModal #modalEdit_adress').val());
    formData.append("role", $('#editModal #modalEdit_role').val());
    console.log(formData.values());
    for (var value of formData.values()) {
        console.log(value);
    }

    xmlHttp.open("POST", url, false); // false for synchronous request
    xmlHttp.send(formData);
    if (xmlHttp.responseText) {
        return xmlHttp.responseText;
    }
    return false
}

var modalHTML = '';
var responseStatus = '';

$("#usersListTable").on("click", "button.btn-info ", function () {
    modalHTML = getFromAPI('/users/getUserModal/' + $(this).attr('value'));
    $("#modalEditBody form").remove();
    $("#modalEditBody").append(modalHTML);
});

$("#usersListTable").on("click", "button.btn-danger ", function () {
    modalHTML = getFromAPI('/users/deleteUserModal/' + $(this).attr('value'));
    $("#modalDeleteBody form").remove();
    $("#modalDeleteBody").append(modalHTML);
});

$("#editModal").on("click", "button.btn-primary", function () {
    console.log('button clicked')
    responseStatus = JSON.parse(postToAPI('/editUserAction/'));
    console.log(responseStatus);
    if (responseStatus.status == 'success') {
        $('#editModal').modal('dispose');
        location.reload();
        console.log('Edition complete');
    } else {
        console.log('Response status not success');
    }
});

$("#deleteModal").on("click", "button.btn-danger", function () {
    console.log('button clicked');
    responseStatus = JSON.parse(getFromAPI('/deleteUserAction/' + $('#deleteModal #modalDelete_id').attr('value')));
    console.log(responseStatus);
    if (responseStatus.status == 'success') {
        $('#modalDelete').modal('dispose');
        location.reload();
        console.log('Deletion complete');
    } else {
        console.log('Response status not success');
    }
});
