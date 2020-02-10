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

                // '<td><button onclick="openEditForm(item[i].id)" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal"> Edit</button></td>'
                '</tr>';
            });
            $('#table').append(trHTML);
        }
    });
});

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
};








// function deleteUser() {
//     var idd = idd.id;
//
//     $.ajax({
//         url: '/admin/delete',
//         type: 'DELETE',
//         dataType: 'json',
//         data: "{'id':'" + idd + "'}",
//         success: function (response) {
//             if (response.d == "1") {
//                 alert("Delete succssfully !!!");
//                 $("[id*=bind] tr").remove();
//                 bind();
//                 clear();
//             }
//         }, error: function (response) {
//         }
//         }
//
//
//     )
// }

// function delete(idd) {
//
//     var idd = idd.id;
//
//     $.ajax({
//         type: "POST",
//         contentType: "application/json; charset=utf-8",
//         url: "category.aspx/delete",
//         data: "{'id':'" + idd + "'}",
//         dataType: "json",
//         success: function (response) {
//             if (response.d == "1") {
//                 alert("Delete succssfully !!!");
//                 $("[id*=bind] tr").remove();
//                 bind();
//                 clear();
//             }
//         }, error: function (response) {
//         }
//     });
// }











// function deleteUser(id) {
//     var i = r.parentNode.parentNode.rowIndex;
//     document.getElementById("table").deleteRow(i);
// }



//openEditForm
function openEditForm() {
    $.ajax({

    })

}
