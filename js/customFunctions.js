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

    if (document.body.contains(document.getElementById('popupWindow-user-info'))) {
        if (!document.getElementById('popupWindow-user-info').contains(event.target) && document.getElementById('open-user-info') != null) {
            if (document.getElementById('open-user-info').contains(event.target)) {
                eventFire(document.getElementById('custom-user-info-close'), 'click');
            } else if ($(document.getElementById('popupWindow-user-info')).is(":visible")) {
                eventFire(document.getElementById('custom-user-info-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-user-info')).is(":hidden")) {
        if (document.getElementById('open-user-info') != null)
            document.getElementById('open-user-info').removeAttribute("id");
    }

    if (document.body.contains(document.getElementById('popupWindow-user-edit'))) {
        if (!document.getElementById('popupWindow-user-edit').contains(event.target) && document.getElementById('open-user-edit') != null) {
            if (document.getElementById('open-user-edit').contains(event.target)) {
                eventFire(document.getElementById('custom-user-edit-close'), 'click');
            } else if ($(document.getElementById('popupWindow-user-edit')).is(":visible")) {
                eventFire(document.getElementById('custom-user-edit-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-user-edit')).is(":hidden")) {
        if (document.getElementById('open-user-edit') != null)
            document.getElementById('open-user-edit').removeAttribute("id");
    }

    if (document.body.contains(document.getElementById('popupWindow-user-delete'))) {
        if (!document.getElementById('popupWindow-user-delete').contains(event.target) && document.getElementById('open-user-delete') != null) {
            if (document.getElementById('open-user-delete').contains(event.target)) {
                eventFire(document.getElementById('custom-user-delete-close'), 'click');
            } else if ($(document.getElementById('popupWindow-user-delete')).is(":visible")) {
                eventFire(document.getElementById('custom-user-delete-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-user-delete')).is(":hidden")) {
        if (document.getElementById('open-user-delete') != null)
            document.getElementById('open-user-delete').removeAttribute("id");
    }

});




$(document).on('click', '.info-square-solid', function() {
    $(this).attr("id", "open-user-info");
});

$(document).on('click', '.edit-solid', function() {
    $(this).attr("id", "open-user-edit");
});

$(document).on('click', '.trash-alt-solid', function() {
    $(this).attr("id", "open-user-delete");
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