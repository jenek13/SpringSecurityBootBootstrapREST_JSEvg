$(document).ready( function () {
    read();
});

function read(){
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
            $('#table').find('tbody').html(trHTML);
        }
    });
}

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
        type: 'DELETE',
        dataType: 'json',
        var: id = $(this).data('id'),
        data: {
            id
        },
        complete: function () {
            read();
            console.log(5);
        }
        })

}

//  .click( function(event) {
// ….
// })

$("savebutton").click(function (event) {
console.log(78)
//function saveUser() {
event.preventDefault();

    var login = $('#newlogin').val();
    var password = $('#newpassword').val();
    var role = $('#newrole').val();

    var user = {
        login: login,
        password: password,
         role: role
    }

    $.ajax({
        url: '/rest/admin/create',
        success: function(){
            $('#nav-home-tab').tab('show');
        },
        complete: function () {
            read();
            console.log(5);
        },
        type: 'POST',
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(user),
    });
    switchTab();
})








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
    //var role = [];
    var role =  $('#role' ).children(':selected').attr('value')//в скобках id селектора

    var user = {
        id: id,
        login: login,
        password: password,
        role: role
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

