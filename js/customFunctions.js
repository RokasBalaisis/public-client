document.addEventListener('click', function(event) {
    if (document.body.contains(document.getElementById('popupWindow'))) {
        if (!document.getElementById('popupWindow').contains(event.target)) {
            if (document.getElementById('open-register').contains(event.target)) {
                eventFire(document.getElementById('custom-register-close'), 'click');
            } else if ($(document.getElementById('popupWindow')).is(":visible")) {
                eventFire(document.getElementById('custom-register-close'), 'click');
            }
        }
    }

});



function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}