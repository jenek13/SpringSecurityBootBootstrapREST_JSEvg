//read users
// $(document).ready(function(){
//     $.ajax({
//         url: '/rest/adminrest',
//         type: 'GET',
//         dataType: 'json',
//         success: function (response) {
//             var trHTML = '';
//             $.each(response, function (i, item) {
//                 trHTML += '<tr>' +
//                     '<td>' + item.id + '</td>' +
//                     '<td>' + item.login + '</td>' +
//                     '<td>' + item.password +'</td>' +
//                     '<td>' + item.roles[0].name + '</td>' +
//                     '</tr>';
//             });
//             $('#table').append(trHTML);
//         }
//     });
// });

$(document).ready(function(){
    $.ajax({
        url: '/rest/adminrest',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            var trHTML = '';
            $.each(response, function (i, item) {
                trHTML += '<tr>' +
                    '<td>' + item.id + '</td>' +
                    '<td>' + item.login + '</td>' +
                    '<td>' + item.password +'</td>' +
                    '<td>' + item.roles[0].name + '</td>' +
                    '<td> <button onclick="deleteUser('+ item.id +')" type="button" class="btn btn-info btn-lg">Delete</button></td>' +
                    '<td><button onclick="openEditForm('+ item.id +')" type="button" class="btn btn-info btn-lg"> Edit</button></td>' +
                    //'<td><button onclick="openEditForm('+ item.id +')" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal"> Edit</button></td>' +
                '</tr>';
            });
            $('#table').append(trHTML);
        }
    });
});


function saveUser() {

    // let userarr = {
    //     var login = $('#newlogin').val();
    //     var password = $('#newpassword').val();
    //     roles: {
    //         roleName: $('#newrole').val();
    //     }
    // }

    var login = $('#newlogin').val();
    var password = $('#newpassword').val();
    var roles = [];

    var selectRoles = $('#newrole').val();
    for (var i = 0; i < selectRoles.length; i++) {
        roles.push(JSON.parse('{"id":"' + parseInt(selectRoles[i].id) + '", "name":"' + String(selectRoles[i].value) + '"}'));
    }

    var user = {
        login: login,
        password: password,
        roles: roles
    }
    $.ajax({
        url: '/rest/admin/create',
        type: 'POST',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(user)

        // data: {не работало изза этих строчек что был джсон в джсоне
        //     user: JSON.stringify(user),
        //     role: selectRoles
        // }

    });
}





// function saveUser() {
//     var login = $('#newlogin').val();
//     var password = $('#newpassword').val();
//     //var roleName = $('#newrole').val();
//     let arr = []; // вот сюда надо сохранить данные
//     var t = this;
//
//     $.ajax({
//         url: '/rest/admin/create',
//         type: 'POST',
//         contentType: "application/json",
//         dataType: 'json',
//         data: JSON.stringify({
//             username: login,
//             password: password,
//             //roleName: roleName,
//             var recive = JSON.parse(data),
//
//         })
//
//     });
//
// }
//
// var obj = {
//     ar: [], // вот сюда надо сохранить данные
//     get: function (id) {
//         // var t = this.ar; // пробовал не помогает
//         var t = this;
//         $.ajax({
//             url: 'get.php',
//             type: 'post',
//             data: {num: id},
//             success: function (data) {
//                 var recive = JSON.parse(data); // <=== possible error
//                 // this.ar = recive.split(','); // this не правильный ...
//                 t.ar = recive.split(',');
//             }
//         });
//     }
// }






//openEditForm
function openEditForm(id) {
    $.ajax({
        url: '/rest/admin/edit/' + id,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            $('#myModal #id').val(response.id);
            $('#myModal #login').val(response.login);
            $('#myModal #password').val(response.password);
            $('#myModal #roles').val(response.roles[0].name);
            console.log();
            $('#myModal').modal('show');
        }
    })
}



//delete user
function deleteUser(id) {
    $.ajax({
        url: '/rest/admin/delete/' + id,
        //processData: false,
        type: 'DELETE',
        dataType: 'json',
        // data: {
        //     id: id,
        // },
        //data : JSON.stringify({ id: id }),
        //}
        var: id = $(this).data('id'),
        data: {
            id
        },}
    )
}
