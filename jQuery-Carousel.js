jQuery(document).ready(function() {
 
	var groupby = 1;
	var time = 800;
	var vidlist = jQuery('div.video-boxes > ul');
	var liwidth = vidlist.children('li').width();
	var lilength = vidlist.children('li').length;
	var ligroups = lilength / groupby;
console.log("liwidth: " + liwidth);
console.log("lilength: " + lilength);
console.log("ligroups: " + ligroups);
 
	vidlist.css({'position': 'relative', 'width': liwidth * lilength * (ligroups + 2) / ligroups, 'left': liwidth * -1*groupby})
		.append(vidlist.children('li').slice(0,groupby).clone())
		.prepend(vidlist.children('li').slice(-2*groupby,-1*groupby).clone());
	vidlist.children('li').css({'position': 'relative'});
 
	jQuery('div.video-pagination > a').click(function(e) {
		e.preventDefault();
		var target = jQuery(e.target);
		while (!target.is('a')) { target = target.parent(); }
		var elem = target;
		var elempos = elem.prevAll('a').length;
		var active = jQuery('a#video-active');
		var activepos = active.prevAll('a').length;
		rotate(elem, activepos - elempos);
	});
 
	jQuery('button.video-next').click(function(e) {
		e.preventDefault();
		var elem = jQuery('a#video-active');
		if (elem.next('a').length) {
			rotate(elem.next('a'), -1);
		} else {
			rotate(jQuery('div.video-pagination > a:first'), -1);
		}
	});
 
	jQuery('button.video-prev').click(function(e) {
		e.preventDefault();
		var elem = jQuery('a#video-active');
		if (elem.prev('a').length) {
			rotate(elem.prev('a'), 1);
		} else {
			rotate(jQuery('div.video-pagination > a:last'), 1);
		}
	});
 
	function rotate(elem, dir) {
		jQuery('div.video-pagination > a').removeAttr('id');
		elem.attr('id', 'video-active');
 
console.log("before: "+vidlist.css('left')+"+="+(liwidth * groupby * dir));
		vidlist.animate({'left': '+='+(liwidth * groupby * dir) }, time, function() {
console.log("after: "+vidlist.css('left'));
			if (vidlist.css('left').replace('px','') >= 0) {
				vidlist.css({'left': liwidth * lilength * -1});
			} else if (vidlist.css('left').replace('px','') <= liwidth * (lilength + groupby) * -1) {
				vidlist.css({'left': liwidth * -1*groupby});
			}
console.log("fixed: "+vidlist.css('left'));
		});
	}
 
});

