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
        @param target object Target to unpack to. Default is `window`.

        @shortDescription Unpack a dictionary to a target.
        @longDescription The target will have the key-value pairs appended, or overwritten if the key-value pair already exists. 
    */
    unpack: function(dict, target = window) {
        for (var key in dict) {
            if (dict.hasOwnProperty(key)) {
                target[key] = dict[key];
            }
        }
    }
};