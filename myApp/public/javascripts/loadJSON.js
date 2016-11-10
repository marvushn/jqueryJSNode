/**
 * Created by avishnikin on 11/9/2016.
 */
//==========Function parseJSON() begins...==========================================================================

//main function
//$(function($) {
//function getJsonVal() {
$(function() {
    var currentDIV = null;
    var currentH2;
    var currentP;
    var trToAdd = null;
    var i = 7;
    var exitData;
    //window.getJsonVal = function () {
//$(function () {
    //all variables

    //$(currentDIV).insertAfter( $( "#newsitem6" ) );
    //$("#left").append(
    $.getJSON("/lava", function (data) {

        //now we have the source
        $.each(data, function (key, value) {
            $.each(value, function (parentkey, parentvalue) {
                if (parentkey != "subitems") {
                    //add elements to our page
                    if (parentkey === "id") {
                        //set first DIV at first step of loop
                        if (currentDIV == null) {
                            //currentDIV = "<tr id="+'"tr'+i+'"'+ "><div " + parentkey + "=" + '"' + parentvalue + '"' + " class=" + '"listofnews"' + " style=" + '"display: block;"' + ">";
                            //" style=" + '"display: block;"' +
                            currentDIV = "<div " + parentkey + "=" + '"' + parentvalue + '"' + " class=" + '"listofnews"' + ">";
                        }
                        //concatenate variables as this DIV is not the first
                        else {
                            //currentDIV += "<tr id="+'"tr'+i+'"'+ "><div " + parentkey + "=" + '"' + parentvalue + '"' + " class=" + '"listofnews"' + " style=" + '"display: block;"' + ">";
                            //+ " style=" + '"display: block;"'
                            currentDIV += "<div " + parentkey + "=" + '"' + parentvalue + '"' + " class=" + '"listofnews"' + ">";
                        }
                        //add tr tags also
                        if (trToAdd == null) {
                            //currentDIV = "<tr id="+'"tr'+i+'"'+ "><div " + parentkey + "=" + '"' + parentvalue + '"' + " class=" + '"listofnews"' + " style=" + '"display: block;"' + ">";
                            //" style=" + '"display: block;"' +
                            trToAdd = "<tr id=" + '"tr' + i + '"' + "></tr>";
                        }
                        //concatenate variables as this DIV is not the first
                        else {
                            //currentDIV += "<tr id="+'"tr'+i+'"'+ "><div " + parentkey + "=" + '"' + parentvalue + '"' + " class=" + '"listofnews"' + " style=" + '"display: block;"' + ">";
                            //+ " style=" + '"display: block;"'
                            trToAdd += "<tr id=" + '"tr' + i + '"' + "></tr>";
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
            i++;
        });
        $(trToAdd).insertAfter($("#tr6"));
        $(currentDIV).insertAfter($("#newsitem6"));
        launchPagination();
    });

});

$(function($) {
    window.launchPagination = function () {
    //function launchPagination() {
        //$(function(launchPagination) {

        var items = $("div.listofnews");

        //var items = $("table tbody tr");
        //var items = $("#newsbox > tr");
        //var numItems = items-1; //total items
        var numItems = items.length - 1; //total items
        var perPage = 1; //per page
        var startindex = 0;
        totalPages = Math.floor(numItems / perPage);
        currentPage = Math.ceil(startindex / perPage);
        $('.pagination-info').text("from " + (startindex + 1) + " to " + (perPage * (startindex + 1)));


        items.slice(perPage).hide();
        //items.slice(perPage + 1).hide();
        $(".pagination-page").pagination({
            items: numItems,
            itemsOnPage: perPage,
            cssStyle: "light-theme",

            onPageClick: function (pageNumber) {

                var showFrom = ((pageNumber - 1) * perPage) + 1;
                var showTo = (showFrom + perPage);

                $('.pagination-info').text("from " + (showFrom) + " to " + ((showTo - 1) > numItems ? numItems : (showTo - 1) ));

                items.hide().slice(showFrom, showTo).show();
            }
        });

    }

});

//make function global
//	window.parseJSON=parseJSON
//})(jQuery);
