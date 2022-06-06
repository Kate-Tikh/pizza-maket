$(document).ready(function () {
    new WOW().init();
    $('.magnific').magnificPopup({
        type: 'image'
    });

    $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true
    });

    let loader = $('#loader');
    $('#submit').click(function () {
        $('.error-input-name').hide();
        $('.error-input-phone').hide();
        $('.error-input-address').hide();
        let name = $('#name');
        let address = $('#address');
        let phone = $('#phone');

        let hasError = false;

        name.css('border-color', 'brown')
        address.css('border-color', 'brown')
        phone.css('border-color', 'brown')

        if (!name.val()) {
            name.siblings('.error-input-name').show();
            name.css('border-color', 'red')
            hasError = true;
        }
        if (!address.val()) {
            address.siblings('.error-input-address').show();
            address.css('border-color', 'red')
            hasError = true;
        }
        if (!phone.val()) {
            phone.siblings('.error-input-phone').show();
            phone.css('border-color', 'red')
            hasError = true;
        }
        if (!hasError) {
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: name.val(), address: address.val(), phone: phone.val()}
            })
                .done(function (message) {
                    loader.hide();
                    console.log(message);
                    if (message.success) {
                        loader.css('display', 'flex')
                        $('.popup-fade').show()
                        $('.popup-fade').click(function (e) {
                            if ($(e.target).closest('.popup').length == 0) {
                                $(this).fadeOut();
                            }
                        });
                    } else {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ")
                    }
                })
        }

    });

});