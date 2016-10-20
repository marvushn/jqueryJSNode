/* *********************************************************************************************
different functions and libraries for main project and sub-html files
********************************************************************************************* */
//-----------------------------------------------------------------------------------------------------------
//simple function for sliding pagination
//-----------------------------------------------------------------------------------------------------------
/*$(window).load(function(){

	// Set general variables
	// ====================================================================
	var totalWidth = 0;

	// Total width is calculated by looping through each gallery item and
	// adding up each width and storing that in `totalWidth`
	$(".newsitem").each(function(){
		totalWidth = totalWidth + $(this).outerWidth(true);
	});

	// The maxScrollPosition is the furthest point the items should
	// ever scroll to. We always want the viewport to be full of images.
	var maxScrollPosition = totalWidth - $(".left").outerWidth();

	// This is the core function that animates to the target item
	// ====================================================================
	function toGalleryItem($targetItem){
		// Make sure the target item exists, otherwise do nothing
		if($targetItem.length){

			// The new position is just to the left of the targetItem
			var newPosition = $targetItem.position().left;

			// If the new position isn't greater than the maximum width
			if(newPosition <= maxScrollPosition){

				// Add active class to the target item
				$targetItem.addClass("newsitem--active");

				// Remove the Active class from all other items
				$targetItem.siblings().removeClass("newsitem--active");

				// Animate .gallery element to the correct left position.
				$(".newsbox").animate({
					left : - newPosition
				});
			} else {
				// Animate .gallery element to the correct left position.
				$(".newsbox").animate({
					left : - maxScrollPosition
				});
			};
		};
	};

	// Basic HTML manipulation
	// ====================================================================
	// Set the gallery width to the totalWidth. This allows all items to
	// be on one line.
	$(".newsbox").width(totalWidth);

	// Add active class to the first gallery item
	$(".newsitem:first").addClass("newsitem--active");

	// When the prev button is clicked
	// ====================================================================
	$(".pagination-prev").click(function(){
		// Set target item to the item before the active item
		var $targetItem = $(".newsitem--active").prev();
		toGalleryItem($targetItem);
	});

	// When the next button is clicked
	// ====================================================================
	$(".pagination-next").click(function(){
		// Set target item to the item after the active item
		var $targetItem = $(".newsitem--active").next();
		toGalleryItem($targetItem);
	});
});*/
//------------------------------------------------------------------------------------------------------------
//static slider function
//------------------------------------------------------------------------------------------------------------

//function for login
/*$(document).ready(function() {

	// Check if JavaScript is enabled
	$('body').addClass('js');

	// Make the checkbox checked on load
	$('.login-form span').addClass('checked').children('input').attr('checked', true);

	// Click function
	$('.login-form span').on('click', function() {

		if ($(this).children('input').attr('checked')) {
			$(this).children('input').attr('checked', false);
			$(this).removeClass('checked');
		}
			
		else {
			$(this).children('input').attr('checked', true);
			$(this).addClass('checked');
		}
	
	});

});*/
//----------------------------------------------------------------------------------------------------------
//function for sliding pagination
//----------------------------------------------------------------------------------------------------------
/*(function($){

	var methods = {
		init: function(options) {
			var o = $.extend({
				items: 1,
				itemsOnPage: 1,
				pages: 0,s
				displayedPages: 5,
				edges: 2,
				currentPage: 0,
				hrefTextPrefix: '#page-',
				hrefTextSuffix: '',
				prevText: 'Prev',
				nextText: 'Next',
				ellipseText: '&hellip;',
				cssStyle: 'dark-theme',
				labelMap: [],
				selectOnClick: true,
				nextAtFront: false,
				invertPageOrder: false,
				onPageClick: function(pageNumber, event) {
					// Callback triggered when a page is clicked
					// Page number is given as an optional parameter
				},
				onInit: function() {
					// Callback triggered immediately after initialization
				}
			}, options || {});

			var self = this;

			o.pages = o.pages ? o.pages : Math.ceil(o.items / o.itemsOnPage) ? Math.ceil(o.items / o.itemsOnPage) : 1;
			if (o.currentPage)
				o.currentPage = o.currentPage - 1;
			else
				o.currentPage = !o.invertPageOrder ? 0 : o.pages - 1;
			o.halfDisplayed = o.displayedPages / 2;

			this.each(function() {
				self.addClass(o.cssStyle + ' simple-pagination').data('pagination', o);
				methods._draw.call(self);
			});

			o.onInit();

			return this;
		},

		selectPage: function(page) {
			methods._selectPage.call(this, page - 1);
			return this;
		},

		prevPage: function() {
			var o = this.data('pagination');
			if (!o.invertPageOrder) {
				if (o.currentPage > 0) {
					methods._selectPage.call(this, o.currentPage - 1);
				}
			} else {
				if (o.currentPage < o.pages - 1) {
					methods._selectPage.call(this, o.currentPage + 1);
				}
			}
			return this;
		},

		nextPage: function() {
			var o = this.data('pagination');
			if (!o.invertPageOrder) {
				if (o.currentPage < o.pages - 1) {
					methods._selectPage.call(this, o.currentPage + 1);
				}
			} else {
				if (o.currentPage > 0) {
					methods._selectPage.call(this, o.currentPage - 1);
				}
			}
			return this;
		},

		getPagesCount: function() {
			return this.data('pagination').pages;
		},

		getCurrentPage: function () {
			return this.data('pagination').currentPage + 1;
		},

		destroy: function(){
			this.empty();
			return this;
		},

		drawPage: function (page) {
			var o = this.data('pagination');
			o.currentPage = page - 1;
			this.data('pagination', o);
			methods._draw.call(this);
			return this;
		},

		redraw: function(){
			methods._draw.call(this);
			return this;
		},

		disable: function(){
			var o = this.data('pagination');
			o.disabled = true;
			this.data('pagination', o);
			methods._draw.call(this);
			return this;
		},

		enable: function(){
			var o = this.data('pagination');
			o.disabled = false;
			this.data('pagination', o);
			methods._draw.call(this);
			return this;
		},

		updateItems: function (newItems) {
			var o = this.data('pagination');
			o.items = newItems;
			o.pages = methods._getPages(o);
			this.data('pagination', o);
			methods._draw.call(this);
		},

		updateItemsOnPage: function (itemsOnPage) {
			var o = this.data('pagination');
			o.itemsOnPage = itemsOnPage;
			o.pages = methods._getPages(o);
			this.data('pagination', o);
			methods._selectPage.call(this, 0);
			return this;
		},

		_draw: function() {
			var	o = this.data('pagination'),
				interval = methods._getInterval(o),
				i,
				tagName;

			methods.destroy.call(this);

			tagName = (typeof this.prop === 'function') ? this.prop('tagName') : this.attr('tagName');

			var $panel = tagName === 'UL' ? this : $('<ul></ul>').appendTo(this);

			// Generate Prev link
			if (o.prevText) {
				methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage - 1 : o.currentPage + 1, {text: o.prevText, classes: 'prev'});
			}

			// Generate Next link (if option set for at front)
			if (o.nextText && o.nextAtFront) {
				methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {text: o.nextText, classes: 'next'});
			}

			// Generate start edges
			if (!o.invertPageOrder) {
				if (interval.start > 0 && o.edges > 0) {
					var end = Math.min(o.edges, interval.start);
					for (i = 0; i < end; i++) {
						methods._appendItem.call(this, i);
					}
					if (o.edges < interval.start && (interval.start - o.edges != 1)) {
						$panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
					} else if (interval.start - o.edges == 1) {
						methods._appendItem.call(this, o.edges);
					}
				}
			} else {
				if (interval.end < o.pages && o.edges > 0) {
					var begin = Math.max(o.pages - o.edges, interval.end);
					for (i = o.pages - 1; i >= begin; i--) {
						methods._appendItem.call(this, i);
					}
					if (o.pages - o.edges > interval.end && (o.pages - o.edges - interval.end != 1)) {
						$panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
					} else if (o.pages - o.edges - interval.end == 1) {
						methods._appendItem.call(this, interval.end);
					}
				}
			}

			// Generate interval links
			if (!o.invertPageOrder) {
				for (i = interval.start; i < interval.end; i++) {
					methods._appendItem.call(this, i);
				}
			} else {
				for (i = interval.end - 1; i >= interval.start; i--) {
					methods._appendItem.call(this, i);
				}
			}

			// Generate end edges
			if (!o.invertPageOrder) {
				if (interval.end < o.pages && o.edges > 0) {
					if (o.pages - o.edges > interval.end && (o.pages - o.edges - interval.end != 1)) {
						$panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
					} else if (o.pages - o.edges - interval.end == 1) {
						methods._appendItem.call(this, interval.end);
					}
					var begin = Math.max(o.pages - o.edges, interval.end);
					for (i = begin; i < o.pages; i++) {
						methods._appendItem.call(this, i);
					}
				}
			} else {
				if (interval.start > 0 && o.edges > 0) {
					if (o.edges < interval.start && (interval.start - o.edges != 1)) {
						$panel.append('<li class="disabled"><span class="ellipse">' + o.ellipseText + '</span></li>');
					} else if (interval.start - o.edges == 1) {
						methods._appendItem.call(this, o.edges);
					}
					var end = Math.min(o.edges, interval.start);
					for (i = end - 1; i >= 0; i--) {
						methods._appendItem.call(this, i);
					}
				}
			}

			// Generate Next link (unless option is set for at front)
			if (o.nextText && !o.nextAtFront) {
				methods._appendItem.call(this, !o.invertPageOrder ? o.currentPage + 1 : o.currentPage - 1, {text: o.nextText, classes: 'next'});
			}
		},

		_getPages: function(o) {
			var pages = Math.ceil(o.items / o.itemsOnPage);
			return pages || 1;
		},

		_getInterval: function(o) {
			return {
				start: Math.ceil(o.currentPage > o.halfDisplayed ? Math.max(Math.min(o.currentPage - o.halfDisplayed, (o.pages - o.displayedPages)), 0) : 0),
				end: Math.ceil(o.currentPage > o.halfDisplayed ? Math.min(o.currentPage + o.halfDisplayed, o.pages) : Math.min(o.displayedPages, o.pages))
			};
		},

		_appendItem: function(pageIndex, opts) {
			var self = this, options, $link, o = self.data('pagination'), $linkWrapper = $('<li></li>'), $ul = self.find('ul');

			pageIndex = pageIndex < 0 ? 0 : (pageIndex < o.pages ? pageIndex : o.pages - 1);

			options = {
				text: pageIndex + 1,
				classes: ''
			};

			if (o.labelMap.length && o.labelMap[pageIndex]) {
				options.text = o.labelMap[pageIndex];
			}

			options = $.extend(options, opts || {});

			if (pageIndex == o.currentPage || o.disabled) {
				if (o.disabled) {
					$linkWrapper.addClass('disabled');
				} else {
					$linkWrapper.addClass('active');
				}
				$link = $('<span class="current">' + (options.text) + '</span>');
			} else {
				$link = $('<a href="' + o.hrefTextPrefix + (pageIndex + 1) + o.hrefTextSuffix + '" class="page-link">' + (options.text) + '</a>');
				$link.click(function(event){
					return methods._selectPage.call(self, pageIndex, event);
				});
			}

			if (options.classes) {
				$link.addClass(options.classes);
			}

			$linkWrapper.append($link);

			if ($ul.length) {
				$ul.append($linkWrapper);
			} else {
				self.append($linkWrapper);
			}
		},

		_selectPage: function(pageIndex, event) {
			var o = this.data('pagination');
			o.currentPage = pageIndex;
			if (o.selectOnClick) {
				methods._draw.call(this);
			}
			return o.onPageClick(pageIndex + 1, event);
		}

	};

	$.fn.pagination = function(method) {

		// Method calling logic
		if (methods[method] && method.charAt(0) != '_') {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.pagination');
		}

	};

})(jQuery);
//---------------------------------------------------------------------------------------------------------------
//function show sliding pages
$(function() {
	var items = $("#left");
	var numItems = items.length-1; //total items
	var perPage = 3; //per page
	var startindex = 0;
	totalPages = Math.floor(numItems / perPage);
	currentPage = Math.ceil(startindex / perPage);
	$('.pagination-info').text("from " + (startindex + 1) + " to " + (perPage * (startindex + 1)));


	items.slice(perPage + 1).hide();
	$(".pagination-page").pagination({
		items: numItems,
		itemsOnPage: perPage,
		//cssStyle: "light-theme",

		onPageClick: function(pageNumber) {

			var showFrom = ((pageNumber-1)  * perPage)+1;
			var showTo = (showFrom + perPage) ;

			$('.pagination-info').text("from " + (showFrom) + " to " + ((showTo-1)>numItems ? numItems :(showTo-1) ));

			items.hide().slice(showFrom, showTo).show();
		}
	});
});*/
//---------------------------------------------------------------------------------------------------------------
//function for search autocomplete
//---------------------------------------------------------------------------------------------------------------
$(function() {
	var defaultAutoCompleteVariants = [
		"Older News",
		"News for the day",
		"Tommorow News",
		"Breaking news",
	];
	$( "#pojam" ).autocomplete({
		minLength: 1,
		delay: 300,
		source: defaultAutoCompleteVariants,
		autoFocus: true
	});
});
//---------------------------------------------------------------------------------------------------------------
//function to Login/Register Form
//---------------------------------------------------------------------------------------------------------------
$(function() {

	$('.iframe_popup').click(function(e) {

		e.preventDefault();
		var $this = $(this);
		var horizontalPadding = 30;
		var verticalPadding = 30;

		var iframe_popup = $('<iframe id="externalSite" class="externalSite" frameborder="0" allowtransparency="true" src="' + this.href + '" />');

		var loginCheck=$("#greetLink").val();

		//here we will insert fields for adding or registring user
		iframe_popup.dialog(
			{
				title: ($this.attr('title')) ? $this.attr('title') : '',
				autoOpen: true,
				width: 600,
				height: 450,
				modal: true,
				autoResize: true,
				overlay: {
					opacity: 0.5,
					background: "black"
				},
				buttons: {
					'Close': function() {

						$(this).dialog('close');
					}
				},
				close : function(){
					//$("#login").replaceWith("<h2>Welcome user!</h2>");
					$("#greetLink").replaceWith("<p>Welcome user! You can Logout Here</p>");
					if ( loginCheck !=$("#greetLink").val() ) {
						alert("User has logged in!");
					}
					else {alert("User has cancaled logging in!")}
				}
			}).width(600 - horizontalPadding).height(450 - verticalPadding);
	});

});
//---------------------------------------------------------------------------------------------------------------
/*$(document)
	.on("click", "#openModal", function() {
		$("body").append('<div id="shadow" style="position:absolute; top:0; left:0; width:100%; height:100%; background:#000; opacity:.5;"></div>').append('<div id="modal"><button id="closeModal">Close Modal</button></div>');
		$("#modal").load("file.html");
	})
	.on("click", "#closeModal", function() {
		$("#modal").remove();
		$("#shadow").remove();
	})*/
//Almost work

$(document).ready(function(){              // по окончанию загрузки страницы
	$('#popup').click(function(){      // вешаем на клик по элементу с id = example-1
		//$(this).load('/templates/login/login-register-overlay.html'); // загрузку HTML кода из файла example.html
		$(this)
			.dialog({
				closeOnEscape: false,
				title: "Login or Register",
				autoOpen: true,
				height: "auto",
				width: 350,
				modal: true,
				buttons: {
					Cancel: function() {
						$( this ).dialog( "close" );
					}
				},
				zIndex: 500
			})
			.load('/templates/login/login-register-overlay.html');
	})
});

//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//==========Function parseJSON() begins...==========================================================================

//main function

/*$(function() {
	var ress = parseJSON();
	$("#left").append(ress);
});*/

//named function

//(function ($) {
//	function parseJSON() {
$(function () {
	//function() {
		//all variables
		var currentDIV = null;
		var currentH2;
		var currentP;

	$("#left").append(
		$.getJSON("/lava", function (data) {

			//now we have the source
			$.each(data, function (key, value) {
				$.each(value, function (parentkey, parentvalue) {
					if (parentkey != "subitems") {
						//add elements to our page
						if (parentkey === "id") {
							//set first DIV at first step of loop
							if (currentDIV == null) {
								currentDIV = "<div " + parentkey + "=" + '"' + parentvalue + '"' + " class=" + '"listofnews"' + " style=" + '"display: block;"' + ">";
							}
							//concatenate variables as this DIV is not the first
							else {
								currentDIV += "<div " + parentkey + "=" + '"' + parentvalue + '"' + " class=" + '"listofnews"' + " style=" + '"display: block;"' + ">";
							}
						}
						else if (parentkey === "title") {
							currentH2 = "<h2><a href=" + '"#"' + ">" + parentvalue + "</a></h2>";
							//concatenate variables to one variable
							currentDIV += currentH2;
						}
					}
					//check if the element is the array
					if ($.isArray(parentvalue)) {
						$.each(parentvalue, function (childkey, childvalue) {
							$.each(childvalue, function (subchildkey, subchildvalue) {
								if (subchildkey === "title") {
									currentP = "<h2><a href=" + '"#"' + ">" + subchildvalue + "</a></h2>";
									currentDIV += currentP;
								}
								else if (subchildkey === "description") {
									currentDIV += "<p>" + subchildvalue + "</p>";
								}
							});
						});
					}
				});
				currentDIV += "</div>";
			});
			//append new DIVs after DIV with id "#newsitem6"
			$("#newsitem6").append(currentDIV);
		})
		//return currentDIV
	)
});

//make function global
//	window.parseJSON=parseJSON
//})(jQuery);

//===End of parseJSON() Function====================================================================
//---------------------------------------------------------------------------------------------------------------
$(function() {
	$( "#dialog" ).dialog();
});
//---------------------------------------------------------------------------------------------------------------
//function for navigation bar
//---------------------------------------------------------------------------------------------------------------
$(function() {
	$( "#navaccordion" ).accordion({
		active: 1,
		heightStyle: "content"
	});
});
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//function login or register
//---------------------------------------------------------------------------------------------------------------
/*$(function() {
	$( "#dialog-confirm" ).dialog({
		resizable: false,
		height:140,
		modal: true,
		buttons: {
			"Login": function() {
				$( this ).dialog( "close" );
			},
			"Register": function() {
				$( this ).dialog( "close" );
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		}
	});
});*/
//---------------------------------------------------------------------------------------------------------------
//alternative function to register/login
//---------------------------------------------------------------------------------------------------------------
$(function() {
	var dialog, form,
		emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
		name = $( "#name" ),
		email = $( "#email" ),
		password = $( "#password" ),
		allFields = $( [] ).add( name ).add( email ).add( password ),
		tips = $( ".validateTips" );

	function updateTips( t ) {
		tips
			.text( t )
			.addClass( "ui-state-highlight" );
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	}

	function checkLength( o, n, min, max ) {
		if ( o.val().length > max || o.val().length < min ) {
			o.addClass( "ui-state-error" );
			updateTips( "Length of " + n + " must be between " +
				min + " and " + max + "." );
			return false;
		} else {
			return true;
		}
	}

	function checkRegexp( o, regexp, n ) {
		if ( !( regexp.test( o.val() ) ) ) {
			o.addClass( "ui-state-error" );
			updateTips( n );
			return false;
		} else {
			return true;
		}
	}

	function addUser() {
		var valid = true;
		allFields.removeClass( "ui-state-error" );

		valid = valid && checkLength( name, "username", 3, 16 );
		valid = valid && checkLength( email, "email", 6, 80 );
		valid = valid && checkLength( password, "password", 5, 16 );

		valid = valid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
		valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );
		valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );

		if ( valid ) {
			$( "#users tbody" ).append( "<tr>" +
				"<td>" + name.val() + "</td>" +
				"<td>" + email.val() + "</td>" +
				"<td>" + password.val() + "</td>" +
				"</tr>" );
			dialog.dialog( "close" );
		}
		//change title
		$("#login").replaceWith("<h2>Welcome "+ name.val() +"</h2>");

		return valid;
	}

	dialog = $( "#dialog-form" ).dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			"Create an account": addUser,
			Cancel: function() {
				dialog.dialog( "close" );
			}
		},
		close: function() {
			form[ 0 ].reset();
			allFields.removeClass( "ui-state-error" );
		}
	});

	form = dialog.find( "form" ).on( "submit", function( event ) {
		event.preventDefault();
		addUser();
	});

	$( "#create-user" ).button().on( "click", function() {
		dialog.dialog( "open" );
	});
});
//function to check elements
/*$(document).ready(function(){
	$("span").parentsUntil("div").css({"color": "red", "border": "2px solid red"});
});*/
/*$(document).ready(function(){
	$("div").find("*").css({"color": "red", "border": "2px solid red"});
});*/

//$(document).ready(function(){
//	$("div").eq(4).css("background-color", "yellow");
//	$("div").filter(".newsbox").css("background-color", "yellow");
//});




//$(document).ready(function(){
//	$("div").filter(".listofnews").css("background-color", "yellow");
//});




//$(document).ready(function(){
//	$("div").find("div").css({"color": "red", "border": "2px solid red"});
//});
//$(document).ready(function(){
//	$("p").parents("div").css({"color": "red", "border": "2px solid red"});
//});

//$(document).ready(function(){
//	$("div").children("p.first").css({"color": "red", "border": "2px solid red"});
//});

//-------------------------------------------

