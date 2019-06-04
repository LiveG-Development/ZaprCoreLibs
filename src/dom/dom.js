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
        @name dom.loaded

        @param callback function Callback function to call when DOM has loaded.

        @shortDescription Call callback function when DOM has loaded.
    */
    loaded: function(callback) {
        window.onload = callback;
    },

    /*
        @name dom.element

        @param selector string DOM selector to use. Default: `"body"`.
        @param overrides object List of overrides to use instead of selector. Selector must be `""` for this parameter to register.

        @return object Dictionary of available functions and values.

        @shortDescription Get DOM object by selector or overrides and return properties associated with it.
    */
    element: function(selector = "body", overrides = []) {
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
                    return elements[0].innerHTML;
                },

                /*
                    @name dom.element( ... ).html.set

                    @param content string HTML content to set.

                    @return object Dictionary of available functions and values for original element.

                    @shortDescription Set the HTML content of all matching elements.
                */
                set: function(content) {
                    core.each(elements, function(key, value, dict) {
                        value.innerHTML = content;
                    });

                    return dom.element("", elements);
                }
            },

            text: {
                /*
                    @name dom.element( ... ).text.get

                    @return string Text content of the first found matching element.

                    @shortDescription Get the text content of the first found matching element.
                */
                get: function() {
                    return elements[0].textContent;
                },

                /*
                    @name dom.element( ... ).text.set

                    @param content string Text content to set.

                    @return object Dictionary of available functions and values for original element.

                    @shortDescription Set the text content of all matching elements.
                */
                set: function(content) {
                    core.each(elements, function(key, value, dict) {
                        value.textContent = content;
                    });

                    return dom.element("", elements);
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
                        return elements[0].getAttribute(name);
                    },

                    /*
                        @name dom.element( ... ).attribute( ... ).set

                        @param content string Text content to set.

                        @return object Dictionary of available functions and values for original element.

                        @shortDescription Set attribute content of all matching elements.
                    */
                    set: function(content) {
                        core.each(elements, function(key, value, dict) {
                            value.setAttribute(name, content);
                        });

                        return dom.element("", elements);
                    },

                    /*
                        @name dom.element( ... ).attribute( ... ).delete

                        @return object Dictionary of available functions and values for original element.

                        @shortDescription Delete attribute of all matching elements.
                    */
                    delete: function() {
                        core.each(elements, function(key, value, dict) {
                            value.removeAttribute(name);
                        });

                        return dom.element("", elements);
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
                @name dom.element( ... ).childCount

                @return number Number of child elements of first found matching element.

                @shortDescription Get number of child elements of first found matching element.
            */
            childCount: function() {
                return elements[0].children.length;
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
                    return dom.element("", [elements[selection]]);
                }
            },

            /*
                @name dom.element( ... ).newChild

                @param element object Child element to add to all matching elements.

                @return object Dictionary of available functions and values for original element.

                @shortDescription Add child element to all matching elements.
            */
            newChild: function(element) {
                core.each(elements, function(key, value, dict) {
                    value.appendChild(element.reference[0]);
                });

                return dom.element("", elements);
            },

            /*
                @name dom.element( ... ).delete

                @shortDescription Delete all matching elements.
            */
            delete: function() {
                core.each(elements, function(key, value, dict) {
                    value.remove();
                });
            },

            style: {
                /*
                    @name dom.element( ... ).style.get

                    @param property string Name of styling property to get from first matching element.

                    @return any Value of styling property taken from first matching element.

                    @shortDescription Get styling property from first mathing element.
                */
                get: function(property) {
                    return elements[0].style[property];
                },

                /*
                    @name dom.element( ... ).style.getAll

                    @return object Dictionary of all styling properties taken from first matching element.

                    @shortDescription Get all styling properties from first matching element.
                */
                getAll: function() {
                    return elements[0].style;
                },

                /*
                    @name dom.element( ... ).style.set

                    @param property string Name of styling property to set for all matching elements.
                    @param value any Value of styling property to set for all matching elements.

                    @return object Dictionary of available functions and values for original element.

                    @shortDescription Set styling property value for all matching elements.
                */
                set: function(property, value) {
                    core.each(elements, function(key, elementValue, dict) {
                        elementValue.style[property] = value;
                    });

                    return dom.element("", elements);
                },

                /*
                    @name dom.element( ... ).style.setPush

                    @param dict object Dictionary of styling properties to push to all matching elements.

                    @return object Dictionary of available functions and values for original element.

                    @shortDescription Push styling properties from dictionary to all matching elements.
                    @longDescription The matching elements will have the styling properties appended, or overwritten if the styling property already exists. 
                */
                setPush: function(dict) {
                    core.each(elements, function(key, value, elementDict) {
                        core.unpack(dict, value.style);
                    });

                    return dom.element("", elements);
                },

                /*
                    @name dom.element( ... ).style.delete

                    @param property string Name of styling property to delete for all matching elements.

                    @return object Dictionary of available functions and values for original element.

                    @shortDescription Delete styling property for all matching elements.
                */
                delete: function(property) {
                    core.each(elements, function(key, value, dict) {
                        value.style.removeProperty(property);
                    });

                    return dom.element("", elements);
                }
            },

            events: {
                /*
                    @name dom.element( ... ).events.listen

                    @param event string Name of event to listen for.
                    @param callback function Callback to call when the event is raised.
                    @param useCapture boolean Use event capturing instead of event bubbling. Default is `false`.

                    @return object Dictionary of available functions and values for original element.

                    @shortDescription Listen to the given future event for all matching elements, and call function when the event is raised.
                    @longDescription Event bubbling is where the event handling is passed from the first child all the way to the root element. Event capturing is going the other way.
                */
                listen: function(event, callback, useCapture = false) {
                    core.each(elements, function(key, value, dict) {
                        value.addEventListener(event, callback, useCapture);
                    });

                    return dom.element("", elements);
                },

                /*
                    @name dom.element( ... ).events.ignore

                    @param event string Name of event to use.
                    @param usedCallback function Callback to ignore when the event is raised.

                    @return object Dictionary of available functions and values for original element.

                    @shortDescription Ignore the callback given to the future event for all matching elements.
                */
                ignore: function(event, usedCallback) {
                    core.each(elements, function(key, value, dict) {
                        value.removeEventListener(event, usedCallback);
                    });

                    return dom.element("", elements);
                }
            }
        };
    },

    /*
        @name dom.new

        @param name string Name of element to specify.

        @return object Dictionary of available functions and values.

        @shortDescription Create new DOM object by element name without attaching it to DOM.
    */
    new: function(name) {
        return dom.element("", [document.createElement(name)]);
    }
};