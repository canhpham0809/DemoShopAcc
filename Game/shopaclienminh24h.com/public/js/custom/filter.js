var page = 1;
var type = rank = price = order = champ_str = skin_str = '';

$(document).ready(function() {

    $('.menu .item[data-value]').click(function() {
        eval($($(this).parents('.item')[0]).attr('data-var')+'="'+$(this).attr('data-value')+'"');
        if (type == 'lien-quan') {
            $('.item.search-in').hide();
            window.location = 'https://aclienquan24h.com/';
        } else {
            $('.item.search-in').show();
            page = 1;
            load_account_list();
        }
    });

    $('#he-filter-submit').click(function () {
        type = rank = price = order = champ_str = skin_str = '';
        page = 1;
        $('.item.search-in').show();
        $('.ui.select-box.dropdown.selection').dropdown('restore defaults');
        $('#skin-filter, #champ-filter').val('');
        load_account_list();
    });

    $('#he-grid').on('click', '.body-pagging ul li.item a[href]', function() {
        page = $(this).attr('data-ci-pagination-page');
        load_account_list();
        return false;
    });
});


function load_account_list() {
    var data_post = {page : page, rank : rank, gia : price, sapxep : order, tuong : champ_str, trangphuc : skin_str, loai: type};
    $('#he-grid').empty();
    $('#loading').show();
    $.post('load/account_list', data_post, function(data) {
        if (data.url_filter) {
            history.pushState({}, null, data.url_filter);
        } else {
            history.pushState({}, null, location.pathname);
        }
        $('#he-grid').html(data.html);
        $('#loading').hide();
    }, 'json');
}