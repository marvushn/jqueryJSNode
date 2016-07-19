// Add your javascript here
$(function() {

    var items = $("div.listofnews");

    //var items = $("table tbody tr");
    //var items = $("#newsbox > tr");
    //var numItems = items-1; //total items
    var numItems = items.length-1; //total items
    var perPage = 1; //per page
    var startindex = 0;
    totalPages = Math.floor(numItems / perPage);
    currentPage = Math.ceil(startindex / perPage);
    $('.pagination-info').text("from " + (startindex + 1) + " to " + (perPage * (startindex + 1)));


    items.slice(perPage + 1).hide();
    $(".pagination-page").pagination({
        items: numItems,
        itemsOnPage: perPage,
        cssStyle: "light-theme",

        onPageClick: function(pageNumber) {

            var showFrom = ((pageNumber-1)  * perPage)+1;
            var showTo = (showFrom + perPage) ;

            $('.pagination-info').text("from " + (showFrom) + " to " + ((showTo-1)>numItems ? numItems :(showTo-1) ));

            items.hide().slice(showFrom, showTo).show();
        }
    });
});
