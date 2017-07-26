"use strict";

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function trim(str, maxlength) {
    if (str.length < maxlength) {
        return str;
    }

    return str.substring(0, maxlength) + '...';
}
