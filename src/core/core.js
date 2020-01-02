// Zapr Core Libraries
// 
// Copyright (C) LiveG. All Rights Reserved.
// Copying is not a victimless crime. Anyone caught copying LiveG software may
// face sanctions.
// 
// https://liveg.tech
// Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.

var core = {
    /* 
        @name core.each

        @param dict object Dictionary to iterate over.
        @param callback function Function to call for each item. Arguments passed: current key, current item, dictionary.

        @shortDescription Iterate over each key in a dictionary, where each key is a propery of the dictionary.
    */
    each: function(dict, callback) {
        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                callback(key, dict[key], dict);
            }
        }
    },

    /*
        @name core.unpack

        @param dict object Dictionary to unpack.
        @param target object Target to unpack to. Default: `window`.

        @shortDescription Unpack a dictionary to a target.
        @longDescription The target will have the key-value pairs appended, or overwritten if the key-value pair already exists. 
    */
    unpack: function(dict, target = window) {
        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                target[key] = dict[key];
            }
        }
    },

    /*
        @name core.request

        @param url string URL to use in request.
        @param callback function Callback function to call when response is returned, arguments given are `data`, `status`, `state` and `type`.
        @param type string Type of request to use (like `GET`, `POST` and `PUT`). Default: `"GET"`.
        @param body any Body to send in request (mainly just for `POST` requests). Default: `null`.

        @shortDescription Request for data from server using HTTP requests.
    */
    request: function(url, callback, type = "GET", body = null) {
        var request = new XMLHttpRequest();

        request.onreadystatechange = callback(request.responseText, {code: request.status, message: request.statusText}, request.readyState, request.responseType);

        request.open(type, url, true);
        request.send(body);
    },

    /*
        @name core.parameter

        @param parameter string Parameter to get from URL.

        @return any Value of parameter. `null` if parameter is not found.

        @shortDescription Get a parameter from URL.
    */
    parameter: function(parameter) {
        return decodeURIComponent((new RegExp("[?|&]" + parameter + "=" + "([^&;]+?)(&|#|;|$)").exec(location.search) || [null, ""])[1].replace(/\+/g, "%20")) || null;
    },

    /*
        @name core.generateKey

        @param length number Length of string to use as key.
        @param digits string String of digits to use when generating key.

        @return string Value of newly generated key.

        @shortDescription Generate a random key based on the length and digits requested.
    */
    generateKey: function(length = 16, digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_") {
        var key = "";

        for (var i = 0; i < length; i++) {
            key += digits.charAt(Math.floor(Math.random() * digits.length));
        }

        return key;
    }
};