/* *********************************************************************************************
different functions and libraries for main project and sub-html files
********************************************************************************************* */
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
//Almost work
$(function(){
	$('#logb').click(function(){
		$("#dialogLink").replaceWith("<p id="+'"'+"dialogLink"+'"'+">"+"Welcome, stranger !" +"</p>");
	});
});

$(function(){
	$('#popup').click(function(){
		//$(this).load('/templates/login/login-register-overlay.html');
		//event.preventDefault();
		var loginRegisterCheck;
		$(this)
			.dialog({
				closeOnEscape: false,
				title: "Login or Register",
				//autoOpen: true,
				height: "auto",
				width: "auto",//350,
				modal: true,
				buttons: {
					Login: function() {
						$( this ).load('/templates/login/login-register-overlay.html #login');
					},
					Register: function() {
						$( this ).load('/templates/login/login-register-overlay.html #register');
					},
					Cancel: function() {
						//<a id="popup" href="#">Register or Login here</a>
						var originHTML = "<a id="+'"'+"popup"+'"'+" href="+'"'+"#"+'"'+">Register or Login here</a>";
						$("#dialogLink").replaceWith("<p id="+'"'+"dialogLink"+'"'+">"+"Hello, you can" + originHTML+"</p>");
						//$("##popup").replaceWith("<h2>Welcome "+ name.val() +"</h2>");
						$( this ).dialog( "close" );

						//check if user has signed in
						if ( loginRegisterCheck !=$("#greetLink").val() ) {
							alert("User has logged in!");
						}
						else {
							alert("User has cancaled logging in!")
						}

					}
				}//,
				//zIndex: 500
			});
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
	var myact = false;
	$( "#navaccordion" ).accordion({
		active: 1,
		heightStyle: "content",

		/*clearStyle: true,
		collapsible: true,      // allow to close completely
		create: function (event, ui) {
			//get index in cookie on accordion create event
			if (($.cookie('saved_index') != null) && ($.cookie('saved_index') != 'false')) {
				myact = parseInt($.cookie('saved_index'));
			}
		},
		change: function (event, ui) {
			//set cookie for current index on change event
			myact = ui.options.active;
			$.cookie('saved_index', null, { expires: 2, path: '/' });   // session cookie
			$.cookie('saved_index', myact, { expires: 2, path: '/' });
		},
		active: ($.cookie('saved_index') == null) ? 0 : ($.cookie('saved_index') == 'false') ? false : parseInt($.cookie('saved_index'))
		*/
		activate: function(event, ui) {
			localStorage.setItem("accIndex", $(this).accordion("option", "active"));
		},
		active: parseInt(localStorage.getItem("accIndex"))
	});
});


/*$(function(){
 var myact = false;
 $( "#myaccordion" ).accordion({
 clearStyle: true,
 collapsible: true,      // allow to close completely
 create: function (event, ui) {
 //get index in cookie on accordion create event
 if (($.cookie('saved_index') != null) && ($.cookie('saved_index') != 'false')) {
 myact = parseInt($.cookie('saved_index'));
 }
 },
 change: function (event, ui) {
 //set cookie for current index on change event
 myact = ui.options.active;
 $.cookie('saved_index', null, { expires: 2, path: '/' });   // session cookie
 $.cookie('saved_index', myact, { expires: 2, path: '/' });
 },
 active: ($.cookie('saved_index') == null) ? 0 : ($.cookie('saved_index') == 'false') ? false : parseInt($.cookie('saved_index'))
 });
});*/

//---------------------------------------------------------------------------------------------------------------
//example from Internet function to register/login - not in use
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