

$(function () {

	$('#search_button').button();
/*show and hide dialog============================================
	// $('#reg').dialog({
    //     buttons:{
    //         'submit':function () {
    //             alert('')
    //         },
    //         'cancel':function(){
    //             $(this).dialog('close')
    //         }
    //     },
    //     //width:500,
    //     //height:400,
    //     show:'blind',
    //     hide:'blind',
    //     autoOpen: false,
    //     closeText:'close',
    // });
	// $('#reg_a').click(function () {
	//     $('#reg').dialog('open');
    //
    // })

    //$('#login').dialog();

====================================================================*/
    /*$('#search_button').button({
        icons:{
            primary:'ui-icon-search',
        }
    });
    $('search_button').click(function () {

    })*/

    $('#member,#logout').hide();
    if($.cookie('user')){
        $('#member,#logout').show();
        $('#reg_a,#login_a').hide();
        $('#member').html($.cookie('user'));
    }
    else{
        $('#member,#logout').hide();
        $('#reg_a,#login_a').show();
    };
    $('#logout').click(function () {
        $.removeCookie('user');
        window.location.href='index.html';
    })
    $('#reg_a').click(function () {
        $('#reg').dialog('open');

    });
    $('#loading').dialog({
        autoOpen: false,
        modal:true,
        resizable: false,
        draggable:false,
        width: 180,
        height: 60,
    }).parent().parent().find('.ui-widget-header').hide();
    $('#reg').dialog({
        autoOpen : false,
        modal : true,
        resizable : false,
        width : 400,
        height : 400,
        buttons : {
            'submit' : function () {
                $(this).submit();
            },
            'cancel':function(){
                $(this).dialog('close')
            },
        }
    }).buttonset().validate({

        submitHandler : function (form) {
            $(form).ajaxSubmit({
                url : 'add.php',
                type : 'POST',
                beforeSubmit : function (formData, jqForm, options) {
                    $('#loading').dialog('open');
                    $('#reg').dialog('widget').find('button').eq(1).button('disable');
                },
                success : function (responseText, statusText) {
                    if (responseText) {
                        $('#reg').dialog('widget').find('button').eq(1).button('enable');
                        $('#loading').css('background', 'url(img/success.gif) no-repeat 20px center');
                        $('#loading p').html('OK');
                        $.cookie('user', $('#user').val());
                        setTimeout(function () {
                            $('#loading').dialog('close');
                            $('#reg').dialog('close');
                            $('#reg').resetForm();
                            $('#reg span.star').html('*').removeClass('succ');
                            $('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('processing...');
                            $('#member, #logout').show();
                            $('#reg_a, #login_a').hide();
                            $('#member').html($.cookie('user'));
                        }, 1000);
                    }
                },
            });
        },

        showErrors : function (errorMap, errorList) {
            var errors = this.numberOfInvalids();

            if (errors > 0) {
                $('#reg').dialog('option', 'height', errors * 20 + 340);
            } else {
                $('#reg').dialog('option', 'height', 340);
            }

            this.defaultShowErrors();
        },

        highlight : function (element, errorClass) {
            $(element).css('border', '1px solid #630');
            $(element).parent().find('span').html('*').removeClass('succ');
        },

        unhighlight : function (element, errorClass) {
            $(element).css('border', '1px solid #ccc');
            $(element).parent().find('span').html('&nbsp;').addClass('succ');
        },

        errorLabelContainer : 'ol.reg_error',
        wrapper : 'li',

        rules : {
            user : {
                required : true,
                minlength : 2,
                remote : {
                    url : 'is_user.php',
                    type : 'POST',
                },
            },
            pass : {
                required : true,
                minlength : 6,
            },
            email : {
                required : true,
                email : true
            },
            date : {
                date : true,
            },
        },
        messages : {
            user : {
                required : 'no empty！',
                minlength : jQuery.format('no less 2！'),
                remote : 'exist',
            },
            pass : {
                required : 'no empty！',
                minlength : jQuery.format('no less 6！'),
            },
            email : {
                required : 'no empty！',
                minlength : 'wrong email！',
            },
        }
    });


    $('#date').datepicker(
        {
            changeMonth:true,
            changeYear: true,
            dateFormat : 'yy-mm-dd',
        }
    );

    // $('#reg input[title]').tooltip({
    //     show:false,
    //     hide:false,
    //     position:{
    //      my:'left+5 center',
    //      at:'right center'
    //     },
    // });

    $('#email').autocomplete({
        autoFocus:true,
        delay:0,
        source:function (request,response) {
        var hosts=['qq.com','163','gmail'],
            term=request.term,//get user input
            name=term,
            host='',
            ix=term.indexOf('@'),
            result=[];
        result.push(term);
        if(ix>-1){
            name=term.slice(0,ix);
            host=term.slice(ix+1);
        }
        if(name){
            var foundHosts=[];
            if(host){
                foundHosts=$.grep(hosts,function(value,index){
                    //alert(value);
                   return value.indexOf(host)>-1;

                });

            }else{
                foundHosts=hosts;
            }
           // result=foundHosts;
            var foundResult=$.map(foundHosts,function (value,index) {
                return name + '@' + value;
            }),
            result=result.concat(foundResult);
        }
        response(result);


        }
    });




    /*====点击打开
    // $('#reg_a').click(function () {
    //         $('#reg').dialog('open');
    //
    //     })
    ===========*/
    //Dom $('#reg').parent().find('button').eq(1).html()
    //$('#reg').dialog('widget').parent().find('button').eq(1).html()

    $('#login_a').click(function () {
        $('#login').dialog('open');

    });

    $('#login').dialog({
        autoOpen : false,
        modal : true,
        resizable : false,
        width : 400,
        height : 240,
        buttons : {
            'login' : function () {

                $(this).submit();
            }
        }
    }).validate({

        submitHandler : function (form) {
            $(form).ajaxSubmit({
                url : 'login.php',
                type : 'POST',
                beforeSubmit : function (formData, jqForm, options) {
                    $('#loading').dialog('open');
                    $('#login').dialog('widget').find('button').eq(1).button('disable');
                },
                success : function (responseText, statusText) {
                    if (responseText) {
                        $('#login').dialog('widget').find('button').eq(1).button('enable');
                        $('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('ok...');
                       

                        if ($('#expires').is(':checked')) {
                            $.cookie('user', $('#login_user').val(), {
                                expires : 7,
                            });
                        } else {
                            $.cookie('user', $('#login_user').val());
                        }
                        setTimeout(function () {
                            $('#loading').dialog('close');
                            $('#login').dialog('close');
                            $('#login').resetForm();
                            $('#login span.star').html('*').removeClass('succ');
                            $('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('processing...');
                            $('#member, #logout').show();
                            $('#reg_a, #login_a').hide();
                            $('#member').html($.cookie('user'));
                        }, 1000);
                    }
                },
            });
        },

        showErrors : function (errorMap, errorList) {
            var errors = this.numberOfInvalids();

            if (errors > 0) {
                $('#login').dialog('option', 'height', errors * 20 + 240);
            } else {
                $('#login').dialog('option', 'height', 240);
            }

            this.defaultShowErrors();
        },

        highlight : function (element, errorClass) {
            $(element).css('border', '1px solid #630');
            $(element).parent().find('span').html('*').removeClass('succ');
        },

        unhighlight : function (element, errorClass) {
            $(element).css('border', '1px solid #ccc');
            $(element).parent().find('span').html('&nbsp;').addClass('succ');
        },

        errorLabelContainer : 'ol.login_error',
        wrapper : 'li',

        rules : {
            login_user : {
                required : true,
                minlength : 2,
            },
            login_pass : {
                required : true,
                minlength : 6,
                remote : {
                    url : 'login.php',
                    type : 'POST',
                    data : {
                        login_user : function () {
                            return $('#login_user').val();
                        },
                    },
                },
            },
        },
        messages : {
            login_user : {
                required : 'no empty！',
                minlength : jQuery.format('no less！'),
            },
            login_pass : {
                required : 'no empty！',
                minlength : jQuery.format('no less！'),
                remote : 'incorrect！',
            }
        }
    });






















});