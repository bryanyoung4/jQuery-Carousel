/**
 * jQuery-Carousel
 *
 * a simple image carousel
 *
 * <div>
 *   <ul>
 *     <li>
 *       <img>
 *     </li>
 *     <li>
 *       <img>
 *     </li>
 *   ....
 *   </ul>
 * </div>
 *
 * @author Bryan Young
 */
(function($) {
	$.fn.jqc = function(o) {
		o = $.extend({
			'groupby': 3,           // images to show at once
			'time': 800,            // duration of animation
			'height': 100,          // height of images
			'width': 100,           // width of images
			'loop': true,           // loop around when end is reached
			'title': 'Images',      // title of box
			'auto': false,          // auto-rotate the images
			'auto_inc': 15000,      // rate to auto-rotate
			'padding': 10,          // pixels between images
			'paginate': 'paginate', // class to give page button div
			'listid': 'carousel',   // id on the div containing the ul element
			'activeid': 'active',   // id of the active button
			'next': 'next',         // id of 'next' button
			'prev': 'prev',         // id of 'prev' button
			'nextimg': 'http://images.ientrymail.com/webpronews/wp/newsletter-next.gif', // image for 'next' button
			'previmg': 'http://images.ientrymail.com/webpronews/wp/newsletter-prev.gif'  // image for 'prev' button
		}, o || {});

		return this.each(function() {

			var topdiv = $(this);

			var list = $('ul:first', topdiv);
			var liwidth = (o.width + o.padding);
			var lilength = $('li', list).length;
			var pages = lilength / o.groupby;
			var paginator = $('<a href=""><img src="http://images.ientrymail.com/webpronews/wp/video-pagination.gif" width="15" height="25" alt="" border="0"></a>');

			var style = $('<style>' +
			'div#' + o.listid + ' {width:'+liwidth*o.groupby+';overflow:hidden;}' +
			'div#' + o.listid + ' ul {margin:10px 0;padding:0px;}' +
			'div#' + o.listid + ' li {float:left;padding:10px '+o.padding+'px 10px 0;position:relative;width:'+o.width+'px;}' +
			'div#' + o.paginate + ' {margin:0px;float:right;width:'+(pages*15)+'px;height:25px;border:none;cursor:pointer;position:relative;background-color:none;}' +
			'button#' + o.next + ',button#' + o.prev + ' {margin:0px;float:right;width:25px;height:25px;border:none;cursor:pointer;position:relative;background-color:none;}' +
			'#' + o.activeid + ' {background-color: #003366;}' +
			'</style>');
			$('html > head').append(style);
 
			topdiv.css({
				'position': 'relative',
				'width': liwidth * o.groupby
			})
				.prepend('<div><strong>'+o.title+'</strong><div style="clear:both;"></div></div>');

			topdiv.prepend($('<div id="'+o.paginate+'" style="float:right;"></div><button id="'+o.prev+'"></button>'));
			for (i=0; i<pages; i++) {
				$('div#'+o.paginate).append(paginator.clone());
			}
			topdiv.prepend($('<button id="'+o.next+'"></button>'));
			$('div#'+o.paginate+' > a:first').attr('id', o.activeid);

			list.css({
				'position': 'relative', 
				'list-style': 'none',
				'width': liwidth * lilength * (pages + 2) / pages, 
				'left': liwidth * -1*o.groupby
			})
				.append(list.children('li').slice(0,o.groupby).clone())
				.prepend(list.children('li').slice(-2*o.groupby,-1*o.groupby).clone())
				.wrap($('<div id="'+o.listid+'"></div>'));


			$('button#'+o.next).css({
				'background': 'url('+o.nextimg+') no-repeat left top'
			});
			$('button#'+o.prev).css({
				'background': 'url('+o.previmg+') no-repeat left top'
			});
 
			$('div#'+o.paginate+' > a').click(function(e) {
				e.preventDefault();
				var target = $(e.target);
				while (!target.is('a')) { target = target.parent(); }
				var elem = target;
				var elempos = elem.prevAll('a').length;
				var active = $('a#'+o.activeid);
				var activepos = active.prevAll('a').length;
				rotate(elem, activepos - elempos);
			});
 
			$('button#'+o.next).click(function(e) {
				e.preventDefault();
				var elem = $('a#'+o.activeid);
				if (elem.next('a').length) {
					rotate(elem.next('a'), -1);
				} else if (o.loop) {
					rotate($('div#'+o.paginate+' > a:first'), -1);
				}
			});
 
			$('button#'+o.prev).click(function(e) {
				e.preventDefault();
				var elem = $('a#'+o.activeid);
				if (elem.prev('a').length) {
					rotate(elem.prev('a'), 1);
				} else if (o.loop) {
					rotate($('div#'+o.paginate+' > a:last'), 1);
				}
			});
 
			function rotate(elem, dir) {
				$('div#'+o.paginate+' > a').removeAttr('id');
				elem.attr('id', o.activeid);
				$('button', topdiv).attr('disabled', 'disabled');
 
				list.animate({'left': '+='+(liwidth * o.groupby * dir) }, o.time, function() {
					if (list.css('left').replace('px','') >= 0) {
						list.css({'left': liwidth * lilength * -1});
					} else if (list.css('left').replace('px','') <= liwidth * (lilength + o.groupby) * -1) {
						list.css({'left': liwidth * -1*o.groupby});
					}
					$('button', topdiv).removeAttr('disabled');
				});
			}

			if (o.auto) {
				setInterval(function() {$('button#'+o.next).click();}, o.auto_inc);
			}
 
		});
	}
})(jQuery);

