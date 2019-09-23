document.addEventListener('click', function(event) {
    if (!document.getElementById('popupWindow').contains(event.target)) {
        if (document.getElementById('open-register').contains(event.target)) {
            $(".overlay").fadeToggle("slow", "linear");
            $("#popupWindow").fadeToggle("slow", "linear");
        } else if ($(document.getElementById('popupWindow')).is(":visible")) {
            $(".overlay").fadeToggle("slow", "linear");
            $("#popupWindow").fadeToggle("slow", "linear");
        }
    }
});