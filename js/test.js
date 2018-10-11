$(function () {

    $('#reg').validate({
        rules : {
            user : {
                required : true,
                minlength : 2,
            },
        },
        messages : {
            user : {
                required : '帐号不得为空！',
                minlength : '帐号不得小于2位！',
            },
        }
    });

});
