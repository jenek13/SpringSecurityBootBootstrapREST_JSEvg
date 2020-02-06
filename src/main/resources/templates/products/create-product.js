jQuery(function($){

    // показать html форму при нажатии кнопки «создать товар»
    $(document).on('click', '.create-product-button', function(){
        // загрузка списка категорий
        $.getJSON("http://rest-api/api/category/read.php", function(data){

        });
    });

    // будет работать, если создана форма товара
    $(document).on('submit', '#create-product-form', function(){
        // получение данных формы
        var form_data=JSON.stringify($(this).serializeObject());

        // отправка данных формы в API
        $.ajax({
            url: "http://rest-api/api/product/create.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // продукт был создан, вернуться к списку продуктов
                showProducts();
            },
            error: function(xhr, resp, text) {
                // вывести ошибку в консоль
                console.log(xhr, resp, text);
            }
        });

        return false;
    });


});