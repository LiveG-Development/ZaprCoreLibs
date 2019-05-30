// Zapr Core Libraries
// 
// Copyright (C) LiveG. All Rights Reserved.
// Copying is not a victimless crime. Anyone caught copying LiveG software may
// face sanctions.
// 
// https://liveg.tech
// Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.

// @import ../core/core

var dom = {
    RANGE_ALL: -1,

    /*
        @name dom.element

        @param selector string DOM selector to use. Default: `"window"`.
        @param overrides object List of overrides to use instead of selector. Selector must be `""` for this parameter to register.

        @return object Dictionary of available functions and values.

        @shortDescription Get DOM object by selector or overrides and return properties associated with it.
    */
    element: function(selector = "window", overrides = []) {
        var elements;

        if (selector == "") {
            elements = overrides;
        } else {
            elements = document.querySelectorAll(selector);
        }

        return {
            reference: elements,

            html: {
                /*
                    @name dom.element( ... ).html.get

                    @return string HTML content of the first found matching element.

                    @shortDescription Get the HTML content of the first found matching element.
                */
                get: function() {
                    return elements[1].innerHTML;
                },

                /*
                    @name dom.element( ... ).html.set

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
                    @name dom.element( ... ).text.get

                    @return string Text content of the first found matching element.

                    @shortDescription Get the text content of the first found matching element.
                */
                get: function() {
                    return elements[1].textContent;
                },

                /*
                    @name dom.element( ... ).text.set

                    @param content string Text content to set.

                    @shortDescription Set the text content of all matching elements.
                */
                set: function(content) {
                    core.each(elements, function(key, value, dict) {
                        value.textContent = content;
                    });
                }
            },

            /*
                @name dom.element( ... ).attribute

                @param name string Name of attribute to use.

                @return object Dictionary of available functions.

                @shortDescription Do actions on the attributes of matching elements.
            */
            attribute: function(name) {
                return {
                    /*
                        @name dom.element( ... ).attribute( ... ).get

                        @return Text content of the first found matching element's attribute.

                        @shortDescription Get the text content of the first found matching element's attribute.
                    */
                    get: function() {
                        return elements[1].getAttribute(name);
                    },

                    /*
                        @name dom.element( ... ).attribute( ... ).set

                        @param content string Text content to set.

                        @shortDescription Set attribute content of all matching elements.
                    */
                    set: function(content) {
                        core.each(elements, function(key, value, dict) {
                            value.setAttribute(name, content);
                        });
                    },

                    /*
                        @name dom.element( ... ).attribute( ... ).delete

                        @shortDescription Delete attribute of all matching elements.
                    */
                    delete: function() {
                        core.each(elements, function(key, value, dict) {
                            value.removeAttribute(name);
                        });
                    },

                    /*
                        @name dom.element( ... ).attribute( ... ).exists

                        @return boolean True if attribute of first matching element exists. 

                        @shortDescription Check if attribute of first matching element exists.
                    */
                    exists: function() {
                        return elements[0].hasAttribute(name);
                    }
                };
            },

            /*
                @name dom.element( ... ).children

                @param selection number Child to get. Default: `dom.RANGE_ALL`.

                @return object Dictionary of available functions and values.

                @shortDescription Get children of first found matching element.
            */
            children: function(selection = dom.RANGE_ALL) {
                if (selection == dom.RANGE_ALL) {
                    return dom.element("", elements[0].children);
                } else {
                    return dom.element("", [elements[0].children[0]]);
                }
            },

            /*
                @name dom.element( ... ).parent

                @return object Dictionary of available functions and values.

                @shortDescription Get parent of first found matching element.
            */
            parent: function() {
                return dom.element("", [elements[0].parentElement]);
            },

            /*
                @name dom.element( ... ).pick

                @param selection number Element to get. Default: `0`.

                @return object Dictionary of available functions and values.

                @shortDescription Pick individual element from all matching elements.
            */
            pick: function(selection) {
                if (selection == dom.RANGE_ALL) {
                    return dom.element("", elements);
                } else {
                    return dom.element("", elements[selection]);
                }
            },

            events: {
                /*
                    @name dom.element( ... ).events.listen

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
                    @name dom.element( ... ).events.ignore

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
};