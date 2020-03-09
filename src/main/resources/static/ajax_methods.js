$(document).ready(function(){
    //сюда внести имя функции на создание а не так внутри
    //из делита вызвать рид функцию чтоб обновить данные с базы
    // у кнопики етс ьайди на нее повесть не дефолтное поведение т епревентдефол мтеод
    //возможно удалился типа батон на крейте
    //почему привходит гет запрос и ка кбудто пост не отрабатывается в сейве а гет
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

//старое создание где работет создание без ролей
// function saveUser() {
//
//     // let userarr = {
//     //     var login = $('#newlogin').val();
//     //     var password = $('#newpassword').val();
//     //     roles: {
//     //         roleName: $('#newrole').val();
//     //     }
//     // }
//
//     var login = $('#newlogin').val();
//     var password = $('#newpassword').val();
//     var roles = [];
//
//     //var selectRoles = $('input:checked');
//     var selectRoles = $('#newrole').val();
//     for (var i = 0; i < selectRoles.length; i++) {
//         roles.push(JSON.parse('{"id":"' + parseInt(selectRoles[i].id) + '", "name":"' + String(selectRoles[i].value) + '"}'));
//     }
//
//     var user = JSON.stringify({
//         login: login,
//         password: password,
//         //roles: roles
//     })
//     $.ajax({
//         url: '/rest/admin/create',
//         type: 'POST',
//         contentType: "application/json",
//         dataType: 'json',
//         data: JSON.stringify(user)
//         // data: {
//         //     user: JSON.stringify(user),
//         //     role: selectRoles
//         // }
//
//     });
// }

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

// function saveUser() {
//     var login = $('#newlogin').val();
//     var password = $('#newpassword').val();
//     //var role = $('#newrole').val();
//     var role = [];
//     var selectRoles = $('#newrole').val();
//
//     //получит айди выбранного  $('#2').val();
//
//     // for (var i = 0; i < selectRoles.length; i++) {
//     //     role.push(JSON.parse('{"id":"' + parseInt(selectRoles[i].id) + '", "name":"' + String(selectRoles[i].value) + '"}'));
//     // }
//
//     var user = {
//         login: login,
//         password: password,
//         // roles: role
//         role: selectRoles
//     }
//     $.ajax({
//         url: '/rest/admin/create',
//         success: function(){
//             //$('#nav-home-tab').show;
//             $('#nav-home-tab').tab('show');
//         },
//         type: 'POST',
//         contentType: "application/json",
//         dataType: 'json',
//         data: JSON.stringify(user)
//         // data: {не работало изза этих строчек что был джсон в джсоне
//         //     user: JSON.stringify(user),
//         //     role: selectRoles
//         // }
//     });
//     //$('#nav-home-tab').tab('show');
//     //$('#nav-home-tab').show();
//     switchTab();
// }

function saveUser() {
    var login = $('#newlogin').val();
    var password = $('#newpassword').val();
    //var role = $('#newrole').val();
    //var id = $('#newrole').val();
    //получит айди выбранного  $('#2').val();
    var id =  $('#newrole' ).children(':selected').attr('id')//в скобках id селектора

//if if равно 1 или 2
    var user = {
        login: login,
        password: password,
         //roles: role
        id: id
    }

    $.ajax({
        url: '/rest/admin/create',
        success: function(){
            //$('#nav-home-tab').show;
            $('#nav-home-tab').tab('show');
        },
        type: 'POST',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(user),
        //processData: false
        // data: {не работало изза этих строчек что был джсон в джсоне
        //     user: JSON.stringify(user),
        //     role: selectRoles
        // }
    });
    //$('#nav-home-tab').tab('show');
    //$('#nav-home-tab').show();
    switchTab();
}

function switchTab() {
    $('#nav-home-tab').tab('show');
}

//update user
function updateUser() {
//preventdefault при нажатии on sent event prevent html form with js ajax
    //добавить юзера как в криэйте котрого стринглифайить
    //найти пример апдейта
    //$('#myModal #id').val(response.id);
    var id = $('#id').val();
    var login = $('#login').val();
    var password = $('#password').val();
    var role = [];
    var selectRoles = $('#role').val();
    for (var i = 0; i < selectRoles.length; i++) {
        role.push(JSON.parse('{"id":"' + parseInt(selectRoles[i].id) + '", "name":"' + String(selectRoles[i].value) + '"}'));
    }


    var user = {
        id: id,
        login: login,
        password: password,
        roles: role
    }
    $.ajax({
            url: '/rest/doUpdate',
            type: 'POST',
            contentType: "application/json",
            dataType: 'json',
            data: JSON.stringify(user)


        }
    )

}

