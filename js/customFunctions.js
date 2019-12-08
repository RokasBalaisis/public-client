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
    ///////////////////////////////// USER CRUD /////////////////////////////////

    if (document.body.contains(document.getElementById('popupWindow-user-info'))) {
        if (!document.getElementById('popupWindow-user-info').contains(event.target)) {
            if (typeof $(document).find('.info-square-solid.user.active')[0] !== 'undefined') {
                if ($(document).find('.info-square-solid.user.active')[0].contains(event.target))
                    eventFire(document.getElementById('custom-user-info-close'), 'click');
            } else if ($(document.getElementById('popupWindow-user-info')).is(":visible")) {
                eventFire(document.getElementById('custom-user-info-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-user-info')).is(":hidden")) {
        if ($(document).find('.info-square-solid.user.active') != null)
            $(document).find('.info-square-solid.user.active').removeClass("active");
    }


    if (document.body.contains(document.getElementById('popupWindow-user-edit'))) {
        if (!document.getElementById('popupWindow-user-edit').contains(event.target)) {
            if (typeof $(document).find('.edit-solid.user.active')[0] !== 'undefined') {
                if ($(document).find('.edit-solid.user.active')[0].contains(event.target))
                    eventFire(document.getElementById('custom-user-edit-close'), 'click');
            } else if ($(document.getElementById('popupWindow-user-edit')).is(":visible")) {
                eventFire(document.getElementById('custom-user-edit-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-user-edit')).is(":hidden")) {
        if ($(document).find('.edit-solid.user.active') != null)
            $(document).find('.edit-solid.user.active').removeClass("active");
    }


    if (document.body.contains(document.getElementById('popupWindow-user-delete'))) {
        if (!document.getElementById('popupWindow-user-delete').contains(event.target)) {
            if (typeof $(document).find('.trash-alt-solid.user.active')[0] !== 'undefined') {
                if ($(document).find('.trash-alt-solid.user.active')[0].contains(event.target))
                    eventFire(document.getElementById('custom-user-delete-close'), 'click');
            } else if ($(document.getElementById('popupWindow-user-delete')).is(":visible")) {
                eventFire(document.getElementById('custom-user-delete-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-user-delete')).is(":hidden")) {
        if ($(document).find('.trash-alt-solid.user.active') != null)
            $(document).find('.trash-alt-solid.user.active').removeClass("active");
    }

    if (document.body.contains(document.getElementById('popupWindow-user-create'))) {
        if (!document.getElementById('popupWindow-user-create').contains(event.target) && document.getElementById('custom-user-create-open') != null) {
            if (document.getElementById('custom-user-create-open').contains(event.target)) {
                eventFire(document.getElementById('custom-user-create-close'), 'click');
            } else if ($(document.getElementById('popupWindow-user-create')).is(":visible")) {
                eventFire(document.getElementById('custom-user-create-close'), 'click');
            }
        }
    }


    ///////////////////////////////// ROLE CRUD /////////////////////////////////

    if (document.body.contains(document.getElementById('popupWindow-role-edit'))) {
        if (!document.getElementById('popupWindow-role-edit').contains(event.target)) {
            if (typeof $(document).find('.edit-solid.role.active')[0] !== 'undefined') {
                if ($(document).find('.edit-solid.role.active')[0].contains(event.target))
                    eventFire(document.getElementById('custom-role-edit-close'), 'click');
            } else if ($(document.getElementById('popupWindow-role-edit')).is(":visible")) {
                eventFire(document.getElementById('custom-role-edit-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-role-edit')).is(":hidden")) {
        if ($(document).find('.edit-solid.role.active') != null)
            $(document).find('.edit-solid.role.active').removeClass("active");
    }


    if (document.body.contains(document.getElementById('popupWindow-role-delete'))) {
        if (!document.getElementById('popupWindow-role-delete').contains(event.target)) {
            if (typeof $(document).find('.trash-alt-solid.role.active')[0] !== 'undefined') {
                if ($(document).find('.trash-alt-solid.role.active')[0].contains(event.target))
                    eventFire(document.getElementById('custom-role-delete-close'), 'click');
            } else if ($(document.getElementById('popupWindow-role-delete')).is(":visible")) {
                eventFire(document.getElementById('custom-role-delete-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-role-delete')).is(":hidden")) {
        if ($(document).find('.trash-alt-solid.role.active') != null)
            $(document).find('.trash-alt-solid.role.active').removeClass("active");
    }


    if (document.body.contains(document.getElementById('popupWindow-role-create'))) {
        if (!document.getElementById('popupWindow-role-create').contains(event.target) && document.getElementById('custom-role-create-open') != null) {
            if (document.getElementById('custom-role-create-open').contains(event.target)) {
                eventFire(document.getElementById('custom-role-create-close'), 'click');
            } else if ($(document.getElementById('popupWindow-role-create')).is(":visible")) {
                eventFire(document.getElementById('custom-role-create-close'), 'click');
            }
        }
    }

    ///////////////////////////////// MEDIA TYPE CRUD /////////////////////////////////

    if (document.body.contains(document.getElementById('popupWindow-mediatype-edit'))) {
        if (!document.getElementById('popupWindow-mediatype-edit').contains(event.target)) {
            if (typeof $(document).find('.edit-solid.mediatype.active')[0] !== 'undefined') {
                if ($(document).find('.edit-solid.mediatype.active')[0].contains(event.target))
                    eventFire(document.getElementById('custom-mediatype-edit-close'), 'click');
            } else if ($(document.getElementById('popupWindow-mediatype-edit')).is(":visible")) {
                eventFire(document.getElementById('custom-mediatype-edit-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-mediatype-edit')).is(":hidden")) {
        if ($(document).find('.edit-solid.mediatype.active') != null)
            $(document).find('.edit-solid.mediatype.active').removeClass("active");
    }


    if (document.body.contains(document.getElementById('popupWindow-mediatype-delete'))) {
        if (!document.getElementById('popupWindow-mediatype-delete').contains(event.target)) {
            if (typeof $(document).find('.trash-alt-solid.mediatype.active')[0] !== 'undefined') {
                if ($(document).find('.trash-alt-solid.mediatype.active')[0].contains(event.target))
                    eventFire(document.getElementById('custom-mediatype-delete-close'), 'click');
            } else if ($(document.getElementById('popupWindow-mediatype-delete')).is(":visible")) {
                eventFire(document.getElementById('custom-mediatype-delete-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-mediatype-delete')).is(":hidden")) {
        if ($(document).find('.trash-alt-solid.mediatype.active') != null)
            $(document).find('.trash-alt-solid.mediatype.active').removeClass("active");
    }


    if (document.body.contains(document.getElementById('popupWindow-mediatype-create'))) {
        if (!document.getElementById('popupWindow-mediatype-create').contains(event.target) && document.getElementById('custom-mediatype-create-open') != null) {
            if (document.getElementById('custom-mediatype-create-open').contains(event.target)) {
                eventFire(document.getElementById('custom-mediatype-create-close'), 'click');
            } else if ($(document.getElementById('popupWindow-mediatype-create')).is(":visible")) {
                eventFire(document.getElementById('custom-mediatype-create-close'), 'click');
            }
        }
    }

    ///////////////////////////////// CATEGORY CRUD /////////////////////////////////

    if (document.body.contains(document.getElementById('popupWindow-category-info'))) {
        if (!document.getElementById('popupWindow-category-info').contains(event.target)) {
            if (typeof $(document).find('.info-square-solid.category.active')[0] !== 'undefined') {
                if ($(document).find('.info-square-solid.category.active')[0].contains(event.target))
                    eventFire(document.getElementById('custom-category-info-close'), 'click');
            } else if ($(document.getElementById('popupWindow-category-info')).is(":visible")) {
                eventFire(document.getElementById('custom-category-info-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-category-info')).is(":hidden")) {
        if ($(document).find('.info-square-solid.category.active') != null)
            $(document).find('.info-square-solid.category.active').removeClass("active");
    }


    if (document.body.contains(document.getElementById('popupWindow-category-edit'))) {
        if (!document.getElementById('popupWindow-category-edit').contains(event.target)) {
            if (typeof $(document).find('.edit-solid.category.active')[0] !== 'undefined') {
                if ($(document).find('.edit-solid.category.active')[0].contains(event.target))
                    eventFire(document.getElementById('custom-category-edit-close'), 'click');
            } else if ($(document.getElementById('popupWindow-category-edit')).is(":visible")) {
                eventFire(document.getElementById('custom-category-edit-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-category-edit')).is(":hidden")) {
        if ($(document).find('.edit-solid.category.active') != null)
            $(document).find('.edit-solid.category.active').removeClass("active");
    }


    if (document.body.contains(document.getElementById('popupWindow-category-delete'))) {
        if (!document.getElementById('popupWindow-category-delete').contains(event.target)) {
            if (typeof $(document).find('.trash-alt-solid.category.active')[0] !== 'undefined') {
                if ($(document).find('.trash-alt-solid.category.active')[0].contains(event.target))
                    eventFire(document.getElementById('custom-category-delete-close'), 'click');
            } else if ($(document.getElementById('popupWindow-category-delete')).is(":visible")) {
                eventFire(document.getElementById('custom-category-delete-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-category-delete')).is(":hidden")) {
        if ($(document).find('.trash-alt-solid.category.active') != null)
            $(document).find('.trash-alt-solid.category.active').removeClass("active");
    }

    if (document.body.contains(document.getElementById('popupWindow-category-create'))) {
        if (!document.getElementById('popupWindow-category-create').contains(event.target) && document.getElementById('custom-category-create-open') != null) {
            if (document.getElementById('custom-category-create-open').contains(event.target)) {
                eventFire(document.getElementById('custom-category-create-close'), 'click');
            } else if ($(document.getElementById('popupWindow-category-create')).is(":visible")) {
                eventFire(document.getElementById('custom-category-create-close'), 'click');
            }
        }
    }


    ///////////////////////////////// MEDIA CRUD /////////////////////////////////

    if (document.body.contains(document.getElementById('popupWindow-media-info'))) {
        if (!document.getElementById('popupWindow-media-info').contains(event.target)) {
            if (typeof $(document).find('.info-square-solid.media.active')[0] !== 'undefined') {
                if ($(document).find('.info-square-solid.media.active')[0].contains(event.target))
                    eventFire(document.getElementById('custom-media-info-close'), 'click');
            } else if ($(document.getElementById('popupWindow-media-info')).is(":visible")) {
                eventFire(document.getElementById('custom-media-info-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-media-info')).is(":hidden")) {
        if ($(document).find('.info-square-solid.media.active') != null)
            $(document).find('.info-square-solid.media.active').removeClass("active");
    }


    if (document.body.contains(document.getElementById('popupWindow-media-edit'))) {
        if (!document.getElementById('popupWindow-media-edit').contains(event.target)) {
            if (typeof $(document).find('.edit-solid.media.active')[0] !== 'undefined') {
                if ($(document).find('.edit-solid.media.active')[0].contains(event.target))
                    eventFire(document.getElementById('custom-media-edit-close'), 'click');
            } else if ($(document.getElementById('popupWindow-media-edit')).is(":visible")) {
                eventFire(document.getElementById('custom-media-edit-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-media-edit')).is(":hidden")) {
        if ($(document).find('.edit-solid.media.active') != null)
            $(document).find('.edit-solid.media.active').removeClass("active");
    }


    if (document.body.contains(document.getElementById('popupWindow-media-delete'))) {
        if (!document.getElementById('popupWindow-media-delete').contains(event.target)) {
            if (typeof $(document).find('.trash-alt-solid.media.active')[0] !== 'undefined') {
                if ($(document).find('.trash-alt-solid.media.active')[0].contains(event.target))
                    eventFire(document.getElementById('custom-media-delete-close'), 'click');
            } else if ($(document.getElementById('popupWindow-media-delete')).is(":visible")) {
                eventFire(document.getElementById('custom-media-delete-close'), 'click');
            }
        }
    }

    if ($(document.getElementById('popupWindow-media-delete')).is(":hidden")) {
        if ($(document).find('.trash-alt-solid.media.active') != null)
            $(document).find('.trash-alt-solid.media.active').removeClass("active");
    }

    if (document.body.contains(document.getElementById('popupWindow-media-create'))) {
        if (!document.getElementById('popupWindow-media-create').contains(event.target) && document.getElementById('custom-media-create-open') != null) {
            if (document.getElementById('custom-media-create-open').contains(event.target)) {
                eventFire(document.getElementById('custom-media-create-close'), 'click');
            } else if ($(document.getElementById('popupWindow-media-create')).is(":visible") && $(event.target).attr('class') != 'remove-file') {
                eventFire(document.getElementById('custom-media-create-close'), 'click');
            }
        }
    }

});




$(document).on('click', '.info-square-solid.user', function() {
    $(this).addClass('active');
});

$(document).on('click', '.edit-solid.user', function() {
    $(this).addClass('active');
});

$(document).on('click', '.trash-alt-solid.user', function() {
    $(this).addClass('active');
});


$(document).on('click', '.edit-solid.role', function() {
    $(this).addClass('active');
});

$(document).on('click', '.trash-alt-solid.role', function() {
    $(this).addClass('active');
});


$(document).on('click', '.edit-solid.mediatype', function() {
    $(this).addClass('active');
});

$(document).on('click', '.trash-alt-solid.mediatype', function() {
    $(this).addClass('active');
});


$(document).on('click', '.info-square-solid.category', function() {
    $(this).addClass('active');
});

$(document).on('click', '.edit-solid.category', function() {
    $(this).addClass('active');
});

$(document).on('click', '.trash-alt-solid.category', function() {
    $(this).addClass('active');
});

$(document).on('click', '.info-square-solid.media', function() {
    $(this).addClass('active');
});

$(document).on('click', '.edit-solid.media', function() {
    $(this).addClass('active');
});

$(document).on('click', '.trash-alt-solid.media', function() {
    $(this).addClass('active');
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