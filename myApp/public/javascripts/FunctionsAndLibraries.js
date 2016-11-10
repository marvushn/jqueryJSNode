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
//---------------------------------------------------------------------------------------------------------------
//local storage function
function store (elementName, valueToPut) {
	//try to find element in storage
	if (valueToPut != null) {
		localStorage.setItem(elementName, valueToPut);
	}
	//we put null if we want to delete record item
	else {
		localStorage.removeItem(elementName);
	}
}
//---------------------------------------------------------------------------------------------------------------
//check login function
function login(elementName) {
	var inputUsername = localStorage.getItem(elementName);
	//var inputPassword = localStorage.getItem("password");
	//if (inputUsername != "undefined" || inputUsername != null)
	if (inputUsername != null || inputUsername != undefined)
	{
		writeGreeting(inputUsername);

	}
}
//---------------------------------------------------------------------------------------------------------------
//function to check if  error exist in dom element, in local storage
function checkErrorsinLocalStorage (elementName) {
	var checkingElement = localStorage.getItem(elementName);
	//var inputPassword = localStorage.getItem("password");
	//if (inputUsername != "undefined" || inputUsername != null)
	if (checkingElement != null || checkingElement != undefined)
	{
		return checkingElement;//true or false
		//document.getElementByID('welcomeMessage').innerHTML = "Welcome " + username + "!";
	}
}
//---------------------------------------------------------------------------------------------------------------
//write greetings to logged or registered user
function writeGreeting(inputUser,formType) {
	var originHTML = "<a id="+'"'+"popupout"+'"'+" href="+'"'+"#"+'"'+">Logout</a>";
	var incomeUser;

	if (inputUser != undefined || inputUser != null) {
		incomeUser = inputUser;
	}
	//else
	//	incomeUser = $("#flogin").val();
	var greetingText = (formType == "login") ? "You are logged in as ":"Thanks for registration. You are logged in as ";
	var replaceHTML = "<p id="+'"'+"dialogLink"+'"'+">"+greetingText+incomeUser+" "+originHTML+"!"+"</p>";
	$("#dialogLink").replaceWith(replaceHTML);
	//set green text for logged user
	document.getElementById("dialogLink").style.color = "green";
	//put login to local storage
	store("#dialogLink",incomeUser);
	//document.getElementById("dialogLink").innerHTML = replaceHTML;
}
//---------------------------------------------------------------------------------------------------------------
//function logout
//---------------------------------------------------------------------------------------------------------------
 function logout(logoutCommand) {
	//replace text with default value
	if (logoutCommand != null) {
		var originHTML = "<a id=" + '"' + "popup" + '"' + " href=" + '"' + "#" + '"' + ">Register or Login here</a>";
		$("#dialogLink").replaceWith("<p id=" + '"' + "dialogLink" + '"' + ">" + "Hello, you can" + originHTML + "</p>");
		document.getElementById("dialogLink").style.color = "black";
		store("#dialogLink", null);//delete record from local storage
		logoutCommand = null;
	}
}
//---------------------------------------------------------------------------------------------------------------
//load logged user
$(function () {
	login("#dialogLink");
});
//---------------------------------------------------------------------------------------------------------------
//login or register form
function loginOrRegister(loginregister,checkingChildElement) {
	var checkingInputs;
	if (loginregister == "#login") {
		checkingInputs = (checkingChildElement == "flogin") ? "login" : "password";
	}
	else {
		checkingInputs = (checkingChildElement == "femail") ? "email" : "login";
	}
	return checkingInputs;
}
//---------------------------------------------------------------------------------------------------------------
//error warnings
function errorWarning(parentElement,childElement) {
	var errorExists = false;
	var errorMessage;
	if (childElement.localName == "input") {
		//var checkingElement = childElement.id.replace(/\,/g,"");
		var checkingElement = childElement.id;
		var elementValue = $("#"+checkingElement).val();
		var checkingElementID = $("#errorElement");
		var checkingErrorElementValue = $(checkingElementID).val();
		var loginPasswordType = (checkingElement == "flogin" || checkingElement == "femail") ? "loginType":"paswordType";
		errorMessage = loginOrRegister(parentElement, checkingElement);

		var elementForcorrecting = (loginPasswordType == "loginType" ) ? validateEmail(elementValue):validatePassword(elementValue);

		if (elementValue == "" || elementValue == null || elementValue == "undefined") {
			//errorMessage = (checkingElement == "flogin") ? "login" : "password";
			//if warning exits do not do anything
			errorMessage = "Field " + errorMessage + " is empty !!!";

			if ($(checkingElementID).length == 0) {
				//$( "#errorElement" ).remove();
				$(parentElement).append(" <b id='errorElement'>" + errorMessage + "</b>");
				//document.getElementById("errorF").style.backgroundColor = "yellow";
				//document.getElementById(checkingElement).defaultValue = errorMessage;
			}
			else if ($(checkingElementID).length !=0) {
				$(checkingElementID).remove();
				$(parentElement).append(" <b id='errorElement'>" + errorMessage + "</b>");
				//$(checkingElementID).val() == errorMessage;
			}
			errorExists = true;
		}

		//check login or password for correct information
		else if (elementForcorrecting == false) {
				//errorMessage = (checkingElement == "flogin") ? "login" : "password";
			//errorMessage = loginOrRegister(parentElement,checkingElement);
			errorMessage = "Field " +  errorMessage + " is incorrect !!!";

			if ($(checkingElementID).length == 0) {
				//$( "#errorElement" ).remove();
				$(parentElement).append(" <b id='errorElement'>" + errorMessage + "</b>");
			}
			else if ($(checkingElementID).length !=0) {
				$(checkingElementID).remove();
				$(parentElement).append(" <b id='errorElement'>" + errorMessage + "</b>");
			}
			errorExists = true;
		}

	}
	return errorExists;
}
//---------------------------------------------------------------------------------------------------------------
//check waht we have
//---------------------------------------------------------------------------------------------------------------
//custom validation function
function validateloginOrRegister(loginRegister,loginRegisterChildren) {
	var errorExists = false;
	for (i = 0; i < loginRegisterChildren.length; i++) {
		//var checkingField;
		//check login/email
		//login or register form
		if (loginRegister == "#login") {
			errorExists = errorWarning(loginRegister,loginRegisterChildren[i]);

			if (errorExists == true) {
				break
			}
		}
		else if (loginRegister == "#register") {
			errorExists = errorWarning(loginRegister,loginRegisterChildren[i]);

			if (errorExists == true) {
				break
			}
		}
	}
	return errorExists;
}

//validate email regex
function validateEmail(email) {
	var emailTemplate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailTemplate.test(email);
}

//validate password
function validatePassword(pass) {
	var passwordTemplate = /^[a-z0-9]+$/i;
	return passwordTemplate.test(pass);
}
//---------------------------------------------------------------------------------------------------------------
//on click functions for dialof input fields
function onClickInput (inputElementID,errorInfoElement) {
	if ( $( errorInfoElement ).length) {
	//if ( $( errorInfoElement ).length && (checkErrorsinLocalStorage(inputElementID))==false) {
		$( errorInfoElement ).remove();
		document.getElementById(inputElementID).defaultValue = "";
		//store(inputElementID, true);
	}
	//else if (checkErrorsinLocalStorage(inputElementID)) {
	//	store(inputElementID, false);
	//}
	//store("#dialogLink",incomeUser);
}
//---------------------------------------------------------------------------------------------------------------
//function to Login/Register Form
//---------------------------------------------------------------------------------------------------------------
//user login
$(function(){
	$(document).on("click",'#popup',function(){//using $(document).on as we need to keep active links after changing
	//$('#popup').on("click",function(){
		//$(this).load('/templates/login/login-register-overlay.html');
		//event.preventDefault();
		var loginRegisterCheck;
		var LoginLogout = document.getElementById("popup").innerText;

		if (LoginLogout != "Logout") {
			openDialog();
		}
	})
});
//user logout
$(function(){
	$(document).on("click",'#popupout',function(){//using $(document).on as we need to keep active links after changing
	//$('#popupout').on("click",function(){
		//var LoginLogout = document.getElementById("popup").innerText;
		//check if  element exists
		if ($('#popupout').length > 0) {
			var outLogin = document.getElementById("popupout").innerText;
		}

		if (outLogin == "Logout")
		{
			logout("out")
		}
	})
});
//$(document).ready(function($) {
$(function($) {
		window.openDialog = function () {
			$('#popup')
			//event.preventDefault()
				.dialog({
						closeOnEscape: false,
						title: "Login or Register",
						autoOpen: true,
						height: "auto",
						width: 250,
						modal: true,
						open: function(event, ui) {
							$(".ui-dialog-titlebar-close", ui.dialog | ui).hide();
							//$( "#popup" ).css("color","black");
						},
						buttons: {
							Login: function () {
								$(this).load('/templates/login/login-register-overlay.html #login');
							},
							Register: function () {
								$(this).load('/templates/login/login-register-overlay.html #register');
							},
							Cancel: function () {
								var originHTML;
								if ($('#popupout').length > 0) {
									$(this).dialog("close");
								}
								else {
									originHTML = "<a id=" + '"' + "popup" + '"' + " href=" + '"' + "#" + '"' + ">Register or Login here</a>";
									$("#dialogLink").replaceWith("<p id=" + '"' + "dialogLink" + '"' + ">" + "Hello, you can" + originHTML + "</p>");
									$(this).dialog("close");
								}

							}
						}
						//zIndex: 500
					},
					//confirm login
					$("#logb").on('click', function () {
						var checkLogining = validateloginOrRegister("#login",document.getElementById("login").children);
						if (checkLogining == false) {
							var guestUser = $("#flogin").val();
							writeGreeting(guestUser,"login");
						}
					}),
					//confirm registration
					$("#regb").on('click', function () {
						var checkLogining = validateloginOrRegister("#register",document.getElementById("register").children);
						if (checkLogining == false) {
							var guestUser = $("#femail").val();
							writeGreeting(guestUser,"register");
						}
					})
					/*
					$("#flogin").on('click', function () {
						onClickInput("flogin","#errorRegister");
					}),
					$("#fpass").on('click', function () {
						//
						onClickInput("fpass","#errorRegister");
					}),
					$("#femail").on('click', function () {
						//
						onClickInput("femail","#errorRegister");
					}),
					$("#floginnew").on('click', function () {
						//
						onClickInput("floginnew","#errorRegister");
					})*/
				);
		}
	});
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------

/*$(function() {
	$( "#dialog" ).dialog();
});*/
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
