(function($) {
	$(document).ready(function() {
		$(window).on('resize', function() {
			priorityNav();
		});

		// append priority nav li to nav
		$('<li class="dropdown priority-nav"><a class="dropdown-toggle" data-toggle="dropdown"><i class="fas fa-ellipsis-v"></i></a><ul class="dropdown-menu closed">' + $('.navbar-nav').html() + '</ul></li>').appendTo('.navbar-nav');

		// NAV SEARCH
		$('<li class="nav-search"><a><i class="fas fa fa-search"></i></a></li>').appendTo('.navbar-nav');

		$('.quick-search').appendTo('.nav-search');

		$('.nav-search a').on('click', function() {
			var _this = $(this);

			_this.toggleClass('active');
			_this.find('i').toggleClass('fa-search fa-times');

			if($(_this).hasClass('active')) {
				_this.next('.quick-search').find('.search-text').focus();
			}
		});
		// NAV SEARCH

		// Call function after priority-nav and nav-search have been added to the navigation
		priorityNav();
	});

	function priorityNav() {
		var logo = $('.site-logo');

		// I'm using the float of the logo to detect if the device is mobile, since the logo is only floating on devices >= 768px
		if(logo.css('float') === 'left') {
			var nav = $('.navbar-nav'),
			areaWidth = nav.width() - logo.width() - 90;
			priority = $('.priority-nav > .dropdown-menu'),
			// for checking if the nav is too long
			lengthCheck = false,
			// remove nav-search from the following if nav-search isn't being used?
			navLinks = nav.find('> li').not('.priority-nav, .nav-search'),
			navWidth = 0;

			// show all primary nav links and hide all priority nav links
			nav.find('> li').removeClass('hide');
			priority.find('> li').addClass('hide');

			while(!lengthCheck) {
				// navWidth should start at 0, but since the priority-nav and potentially nav-search exist their widths have to be accounted for
				navWidth = $('.priority-nav').width() + $('.nav-search').outerWidth();

				// add each link's width to get the total width of the nav
				$(navLinks).each(function() {
					navWidth += $(this).outerWidth();
				});

				// if nav is too long
				if(navWidth >= areaWidth) {
					// hide one item from primary nav
					navLinks.last().addClass('hide');
					navLinks = navLinks.slice(0, -1);

					// show item in priority nav
					priority.find('> li.hide').last().removeClass('hide');
				} else {
					lengthCheck = true;
				}

				// if there are unhidden items in the priority-nav, show the li
				if(priority.find('> li').not('.hide').length) {
					$('.priority-nav').removeClass('hide');
				} else {
					$('.priority-nav').addClass('hide');
				}
			}
		}
	}
})(jQuery);
