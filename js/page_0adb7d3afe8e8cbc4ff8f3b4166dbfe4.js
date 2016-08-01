
; /* Start:/js/sec.js*/
$(document).ready(function() {
	/* additional scripts for filter */
	if ($('#filter_form').size() > 0) {
	
		$('div.search_button.dosubmit, a.dosubmit').click(function(){
			$(this).parents('form').submit();
			return false;
		});
		
		/* pop_name */
		if (typeof(data_name) != 'undefined') {
			pop_name.init();
		}
		/* /pop_name */

		var form = $('#filter_form');
		form.find('.check input').unbind('change').bind('change', function() {
			$(this).parents('.check').toggleClass('check_off', !$(this).is(':checked')).toggleClass('check_on', $(this).is(':checked'));
			filter.tip_show($(this).closest('.check').position().top - 4, $(this).closest('.check').find('label'), $(this).is(':checked'));
		});
		form.find('.select select').bind('change', function() {
			filter.tip_show($(this).closest('.select').position().top - 4, $(this).closest('.filter_field').find('.f14.comp'), $(this).val() != 0);
		});
		$('.popup_name input[type=checkbox]').bind('change', function() {
			filter.tip_show(form.find('.filter_field[rel=name] .f14.comp').position().top - 4, form.find('.filter_field[rel=name] .f14.comp'), $('.name_selected input[type=hidden]').size() > 0);
			
		});
	}
	/* /additional scripts for filter */

	/* news_page */
	if ($('.news_page').size() > 0) {
		news.init();
	}
	/* /news_page */

	/* special_elite */
	if ($('.special_elite').size() > 0) {
		special.init();
	}
	/* /special_elite */

	/* toggle details */
	$('.details_lnk').bind('click', function() {
		toggle_details($(this).attr('did'));
		return false;
	});
	/* /toggle details */

	/* data_table */
	$('.all_data_tr_lnk').bind('click', function() {
		toggle_data_tr($(this).attr('tid'));
		return false;
	});

	$('.data_table .rated').bind('mouseover', function(e) {
		show_data_tip($(this), e);
	}).bind('mouseout', function() {
		hide_data_tip();
	});
	/* /data_table */

	/* hpanel */
	if ($('.hpanel').size() > 0) {
		hpanel.init();
	}
	/* /hpanel */

	$('.popup_print_but').bind('click', function() {
		popup.p_print($(this).closest('.popup'));
	});
});

var pop_name = {
	count: 0,
	avails: 0,
	init: function() {
		pop_name.build();
		
		$('.popup_name .but_map_choose').bind('click', function() { pop_name.choose(); });
		$('.popup_name .but_map_reset').bind('click', function() { pop_name.clear(); });
		$('.popup_name .but_map_search').bind('click', function() { popup.p_hide(); });

		$('.add_name').bind('click', function() { popup.p_show('name'); });
		$('.clear_name').bind('click', function() { pop_name.clear(true); });
	},
	build: function() {
		for(var i in data_name) {
			var name = data_name[i].name;
			var avail = data_name[i].avail;
			
			if (avail) {
				// add checks
				$('.name_checks').append('<span class="name_check"><span class="check"><input type="checkbox" id="n_ch' + i + '" /><label for="n_ch' + i + '">' + name + '</label></span></span>');
				check_init($('input#n_ch' + i));
			}
		}

		$('.name_checks input[type=checkbox]').bind('change', function() {
			var id = $(this).attr('id').replace('n_ch', '');
			pop_name.toggle_param(id, $(this).is(':checked'));
		});

		$('.name_selected input[type=hidden]').each(function() {
			var id = $(this).val();
			pop_name.check_toggle(id);
		});
	},
	check_toggle: function(id) {
		var ch = $('#n_ch' + id);
		ch.prop('checked', !ch.is(':checked')).change();
	},
	toggle_param: function(id, add) {
		var ns = $('.name_selected');
		var data = data_name;
		if (add && ns.find('.name_param[rel=' + id + ']').size() == 0) {
			ns.prepend('<span class="name_param" rel="' + id + '">' + data[id].name + '</span>');
			if (ns.find('input[value=' + id + ']').size() == 0) {
				ns.append('<input type="hidden" name="name[]" value="' + id + '" />');
			}
			ns.find('.name_param[rel=' + id + ']').bind('click', function() {
				var id = $(this).attr('rel');
				pop_name.check_toggle(id);
				pop_name.toggle_param(id, false);
			});
		}
		else {
			ns.find('.name_param[rel=' + id + ']').remove();
			ns.find('input[value=' + id + ']').remove();
		}

		ns.toggleClass('hidden', (ns.find('.name_param').size() == 0));
	},
	clear: function() {
		$('.name_checks input[type=checkbox]:checked').each(function() {
			var id = $(this).attr('id').replace('n_ch', '');
			pop_name.check_toggle(id);
		});
	},
	choose: function() {
		$('.name_checks input[type=checkbox]:not(":checked")').each(function() {
			var id = $(this).attr('id').replace('n_ch', '');
			pop_name.check_toggle(id);
		});
	}
};

var news = {
	init: function() {
		if ($('.news_page').size() > 1) {
			$('.news_arrows .prev').show().bind('click', function(){
				var ind_cur = $('.news_page').index($('.news_page:not(.hidden)'));
				if (ind_cur > 0) {
					news.set_page(ind_cur - 1);
				}
			});
			$('.news_arrows .next').show().bind('click', function(){
				var ind_cur = $('.news_page').index($('.news_page:not(.hidden)'));
				if (ind_cur < $('.news_page').size() - 1) {
					news.set_page(ind_cur* 1 + 1);
				}
			});
		}
	},
	set_page: function(ind) {
		$('.news_page').addClass('hidden');
		$('.news_page:eq(' + ind + ')').removeClass('hidden');
		news.order_arrows();
	},
	order_arrows: function() {
		var ind_cur = $('.news_page').index($('.news_page:not(.hidden)'));
		$('.news_arrows .prev').toggleClass('disable', ind_cur == 0);
		$('.news_arrows .next').toggleClass('disable', ind_cur == $('.news_page').size() - 1);
	}
};

var special = {
	blocks: '',
	lines: '',
	nums: [],
	cur: 0,
	is_move: true,
	is_anim: false,
	speed: 150,
	init: function () {
		special.blocks = $('.special_elite .spec_block');
		special.blocks.each(function(index) {
			$(this).css({'z-index': 10 - index});
			var item = $(this).find('.spec_item').eq(0);
			$(this).find('.spec_title').html(item.attr('title')).attr('href', item.attr('url'));
			$(this).find('.spec_text').html(item.attr('text'));
			special.nums[index] = $(this).find('.spec_item').size();
		});

		special.lines = $('.special_elite .spec_line');
		special.lines.each(function(index) {
			$(this).width(special.nums[index] * 200);
		});

		for (var i=0; i<special.nums.length; i++) {
			if (special.nums[i] < 2 || (i > 0 && special.nums[i] != special.nums[i - 1])) {
				special.is_move = false;
			}
		}

		if (special.is_move) {
			special.nums = special.nums[0];
			$('.special_elite .prev').show().bind('click', function(){
				if (special.cur > 0) {
					special.set_item_prev();
				}
			});
			$('.special_elite .next').show().bind('click', function(){
				if (special.cur < special.nums - 1) {
					special.set_item_next();
				}
			});
		}
	},
	set_item_prev: function () {
		if (!special.is_anim) {
			special.is_anim = true;
			special.lines.each(function(index) {
				$(this).css({'left': '-200px'}).find('.spec_item').eq(special.nums - 1).prependTo($(this));
				$(this).animate({'left': 0}, special.speed, function() {
					var item = $(this).find('.spec_item').eq(0);
					special.blocks.eq(index).find('.spec_title').html(item.attr('title')).attr('href', item.attr('url'));
					special.blocks.eq(index).find('.spec_text').html(item.attr('text'));
					if (index == special.lines.size() - 1) {
						special.cur --;
						special.order_arrows();
						special.is_anim = false;
					}
				});
			});
		}
	},
	set_item_next: function () {
		if (!special.is_anim) {
			special.is_anim = true;
			special.lines.each(function(index) {
				$(this).animate({'left': '-200px'}, special.speed, function() {
					$(this).css({'left': 0}).find('.spec_item').eq(0).appendTo($(this));
					var item = $(this).find('.spec_item').eq(0);
					special.blocks.eq(index).find('.spec_title').html(item.attr('title')).attr('href', item.attr('url'));
					special.blocks.eq(index).find('.spec_text').html(item.attr('text'));
					if (index == special.lines.size() - 1) {
						special.cur ++;
						special.order_arrows();
						special.is_anim = false;
					}
				});
			});
		}
	},
	order_arrows: function() {
		$('.special_elite .prev').toggleClass('disable', special.cur == 0);
		$('.special_elite .next').toggleClass('disable', special.cur == special.nums - 1);
	}
};

function toggle_details(id) {
	$('.details_lnk[did=' + id + ']').toggleClass('hide').text($('.details_lnk[did=' + id + ']').hasClass('hide') ? 'Скрыть подробности' : 'Подробнее');
	$('.details[did=' + id + ']').toggleClass('hidden');
}

function toggle_data_tr(id) {
	$('.all_data_tr_lnk[tid=' + id + ']').toggleClass('hide');
	$('.data_table[tid=' + id + '] .all_data_tr').toggleClass('tr_hidden');
}

function show_data_tip(tr, e) {
	var pos = mousePageXY(e);
	var tip = $('<div class="tr_rated_tip">рекомендуем</div>').insertAfter(tr.closest('.data_table'));
	tip.css({
		'top': pos.y - tr.closest('.center_col').offset().top + 'px',
		'left': pos.x - tr.closest('.center_col').offset().left + 15 + 'px'
	});
}
function hide_data_tip() {
	$('.tr_rated_tip').remove();
}

var hpanel = {
	init: function() {
		$('.hpanel').each(function() { hpanel.init_panel($(this)); });
	},
	init_panel: function(p) {
		var tb = p.find('.data_table');
		if (tb.size() > 0) {
			var w = 0;
			tb.find('tr:eq(0) td').each(function() {
				w += parseInt($(this).attr('width')) + 20;
			});
			tb.width(w);
		}

		var wr = p.find('.hpanel_wrap');
		wr.css({'position': 'absolute'}).width(wr.width() + 1).css({'position': 'relative'});

		var l = $('<div class="hpanel_line"></div>').appendTo(p);
		var d = $('<div class="hpanel_drag"></div>').appendTo(l);
		d.width(Math.floor(p.width() / wr.width() * 100) + '%');

		var c = (wr.width() - p.width()) / (p.width() - d.width());

		d.draggable({
			axis: 'x',
			containment: '.hpanel_line',
			drag: function(event, ui) {
				hpanel.move_panel(wr, c, ui.position.left);
			}
		});
	},
	move_panel: function(wr, c, pos) {
		wr.css('left', - Math.ceil(pos * c) + 'px');
	}
};

popup.p_print = function(p) {
	var head = '';
	head += '<link href="css/all.css" rel="stylesheet" type="text/css" media="all" />';
	head += '<link href="css/elite.css" rel="stylesheet" type="text/css" media="all" />';
	head += '<link href="css/print.css" rel="stylesheet" type="text/css" media="all" />';
	var content = '<html><head>' + head + '</head><body>';
	content += '<div class="popup_content">' + p.find('.popup_content').html() + '</div>';
	content += '</body></html>';

	var prwin = window.open('', 'printWin', 'width=960,height=640,toolbar=no,Scrollbars=1');
	if (typeof prwin == 'object') {
		prwin.window.focus();
		prwin.document.open();
		prwin.document.write(content);
		prwin.document.close();
		prwin.window.print();
	}
}

function room_filter_clear() {
	$('.room_filter').html('').addClass('hidden');
}
function room_filter_fill(txt, lnk, url) {
	$('.room_filter').html('<table cellpadding="0" cellspacing="0" width="100%"><tr><td>' + txt + ' <a href="' + url + '">' + lnk + '</a></td><td align="right"><a href="javascript:void(0)" onclick="javascript:room_filter_clear()" class="cbut cbut_white"><i></i><b class="comp">отменить</b><u></u></a></td></tr></table>').removeClass('hidden');
}

/* End */
;; /* /js/sec.js*/
