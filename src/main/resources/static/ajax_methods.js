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
    var login = $('#login').val();
    var password = $('#password').val();

    $.ajax({
        url: '/rest/admin/create',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            username: login,
            password: password,

        })

    });
    
}

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
