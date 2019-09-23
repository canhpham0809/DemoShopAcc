$.get('load/skin', function (data) {
	$('#skin-filter').typeahead({
		source: data,
	    updater:function (item) {
	    	page = 1;
	    	skin_str = item;
	    	load_account_list();
	        return item;
	    }
	});
}, "json");
$.get('load/champion', function (data) {
	$('#champ-filter').typeahead({
		source: data,
	    updater:function (item) {
	    	page = 1;
	    	champ_str = item;
	    	load_account_list();
	        return item;
	    }
	})
}, "json");