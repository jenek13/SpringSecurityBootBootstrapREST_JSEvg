$(document).ready(function(){
    alert("1");
    var data = $("#user").val();
    alert("2");
    console.log();
    $.ajax({
        url: '/rest/adminrest',
        type: 'GET',
        dataType: 'JSON',

        success: function(data){
            alert("3");
            for (var i in data) {
                $("#tableBody").append(
                    "<tr>" +
                    "<td>" + data[i].id + "</td>" +
                    "<td>" + data[i].name + "</td>" +
                    "<td>" + data[i].login + "</td>" +
                    "<td>" + data[i].password + "</td>" +
                    "<td>" + getRoles(data[i].roles) + "</td>" +
                    "</tr>"
                );
            }

        },
        error: function(data){
            alert("4");
        }

    });
});







jQuery(function($){

    // показать список юзеров при первой загрузке
    showProducts();

});

// функция для показа списка юзеров
function showProducts(){
    // функция для отображения списка юзеров


}