var options = {
    facebook: "https:/www.facebook.com/Hỗ-Trợ-Khách-Hàng-520770804946417/",
    greeting_message: "Chào mừng bạn đến với SHOP !\nBạn cần hỗ trợ gì không ? Nhắn tin cho mình nhé !",
    call_to_action: "Chào bạn ! Bạn cần hỗ trợ gì không ?",
    position: "right",
};
var proto = document.location.protocol,
    host = "whatshelp.io",
    url = proto + "//static." + host;
var s = document.createElement('script');
s.type = 'text/javascript';
s.async = true;
s.src = url + '/widget-send-button/js/init.js';
s.onload = function() {
    WhWidgetSendButton.init(host, proto, options);
};
var x = document.getElementsByTagName('script')[0];
x.parentNode.insertBefore(s, x);
$('#mobile-menu').sidebar({
    transition: 'overlay',
    exclusive: true,
    scrollLock: 'true',
    duration: 2000,
}).sidebar('setting', 'transition', 'overlay').sidebar('attach events', 'a.toc.item', 'show')
/**
 * Register Variables
 */
$nav = $('#banner-menu');
// fix menu when passed
$('.masthead').visibility({
    once: false,
    refreshOnResize: true,
    checkOnRefresh: true,
    offset: -100,
    onTopPassed: function(calc) {
        NavAlt();
    },
    onTopPassedReverse: function(calc) {
        NavOrig();
    }
});
// create sidebar and attach to menu open
$('#navigation-mobile').sidebar('attach events', '#mobile-menu-open');
/**
 * Navigation styling when user is on top of page
 */
function NavOrig() {
    $nav
        //.removeClass('alternate')
        .velocity({
            //backgroundColor: "transparent",
            backgroundColorRed: 27,
            backgroundColorGreen: 28,
            backgroundColorBlue: 29,
            backgroundColorAlpha: 0.0,
            paddingTop: "2em",
            paddingBottom: "2em"
        }, 200);
    $nav.find('.ui.basic.button').addClass('inverted');;
}
/**
 * Navigation styling when user has scrolled page
 */
function NavAlt() {
    $nav
        //.addClass('alternate')
        .velocity({
            //backgroundColor: "#1B1C1D",
            backgroundColorRed: 27,
            backgroundColorGreen: 28,
            backgroundColorBlue: 29,
            backgroundColorAlpha: 1.0,
            paddingTop: ".25em",
            paddingBottom: ".25em"
        }, 200);
    $nav.find('.ui.basic.button').removeClass('inverted');;
}
// var mySwiper = new Swiper('.swiper-container', {
//     preventClicks: false,
//     paginationClickable: true,
//     pagination: '.sabner .swiper-pagination',
//     nextButton: '.sabner .swiper-button-next',
//     prevButton: '.sabner .swiper-button-prev',
//     height: '500',
//     spaceBetween: 5,
//     centeredSlides: true,
//     autoplay: 5000,
//     autoplayDisableOnInteraction: false
// });
$('#tab .item').tab();
$('.ui.dropdown').dropdown();
$('#send-message').click(function() {
    $(this).fadeOut();
    setTimeout(function() {
        $('#fa-message').css({
            bottom: '0px'
        });
    }, 500);
});
$('#fa-message .heading').click(function() {
    $('#fa-message').css({
        bottom: '-333px'
    });
    setTimeout(function() {
        $('#send-message').fadeIn();
    }, 1000);
});
$('button#charge').click(function() {
    let pin = $('#pin').val();
    let serial = $('#serial').val();
    let card_type = $('#card-type').val();
    let price_guest = $('#price-guest').val();
    if (pin.length < 6 || serial.length < 6 || card_type < 1 || price_guest < 1) {
        swal('Có lỗi xảy ra', 'Vui lòng kiểm tra lại dữ liệu nhập vào !', 'error');
    } else {
        $(this).html('<img width="40" height="40" src="public/img/loader.gif"> Nạp thẻ');
        $.post('/recharge/card_charging', {
            pin: pin,
            seri: serial,
            card_type: card_type,
            price: price_guest
        }, function(data) {
            let sTitle = 'Nạp thẻ thành công';
            let sType = 'success';
            if (data.code == 1) {
                sTitle = 'Có lỗi xảy ra';
                sType = 'error';
            }
            swal(sTitle, data.msg, sType);
            $('button#charge').html('Nạp thẻ');
        }, 'json');
    }
});


function showPopupAcc(acc) {
    swal({
        title: "Tài Khoản Số #" + acc,
        text: "Bạn có chắc chắn muốn giao dịch tài khoản này ?",
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Có",
        cancelButtonText: "Không",
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function() {
        $.get('account/buy/' + acc, function(data) {
            if (data.status == 0) {
              swal({
                    title: 'Giao dịch hoàn tất',
                    type: 'success',
                    text: 'Thuê thành công tài khoản #' + acc               }, function() {
                    if (data.redirect) window.location = data.redirect;
                    else window.location.reload();
                });
            } else {
                swal({
                    title: 'Có lỗi xảy ra',
                    type: 'error',
                    text: data.message
                }, function() {
                    if (data.redirect) window.location = data.redirect;
                    else window.location.reload();
                });
            }
        }, 'json');
    });
}