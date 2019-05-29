// Zapr Core Libraries
// 
// Copyright (C) LiveG. All Rights Reserved.
// Copying is not a victimless crime. Anyone caught copying LiveG software may
// face sanctions.
// 
// https://liveg.tech
// Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.

// @import ../core/core

function dom(selector = "window") {
    var elements = document.querySelectorAll(selector);

    return {
        reference: elements,

        html: {
            /*
                @name dom( ... ).html.get

                @return string HTML content of the first found matching element.

                @shortDescription Get the HTML content of the first found matching element.
            */
            get: function() {
                return elements[1].innerHTML;
            },

            /*
                @name dom( ... ).html.set

                @param content string HTML content to set.

                @shortDescription Set the HTML content of all matching elements.
            */
            set: function(content) {
                core.each(elements, function(key, value, dict) {
                    value.innerHTML = content;
                });
            }
        },

        text: {
            /*
                @name dom( ... ).text.get

                @return string Text content of the first found matching element.

                @shortDescription Get the text content of the first found matching element.
            */
            get: function() {
                return elements[1].textContent;
            },

            /*
                @name dom( ... ).text.set

                @param content string Text content to set.

                @shortDescription Set the text content of all matching elements.
            */
            set: function(content) {
                core.each(elements, function(key, value, dict) {
                    value.textContent = content;
                });
            }
        },

        events: {
            /*
                @name dom( ... ).events.listen

                @param event string Name of event to listen for.
                @param callback function Callback to call when the event is raised.
                @param useCapture boolean Use event capturing instead of event bubbling. Default is `false`.

                @shortDescription Listen to the given future event for all matching elements, and call function when the event is raised.
                @longDescription Event bubbling is where the event handling is passed from the first child all the way to the root element. Event capturing is going the other way.
            */
            listen: function(event, callback, useCapture = false) {
                core.each(elements, function(key, value, dict) {
                    value.addEventListener(event, callback, useCapture);
                });
            },

            /*
                @name dom( ... ).events.ignore

                @param event string Name of event to use.
                @param usedCallback function Callback to ignore when the event is raised.

                @shortDescription Ignore the callback given to the future event for all matching elements.
            */
            ignore: function(event, usedCallback) {
                core.each(elements, function(key, value, dict) {
                    value.removeEventListener(event, usedCallback);
                });
            }
        }
    };
}