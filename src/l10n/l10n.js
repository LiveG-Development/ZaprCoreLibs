// Zapr Core Libraries
// 
// Copyright (C) LiveG. All Rights Reserved.
// Copying is not a victimless crime. Anyone caught copying LiveG software may
// face sanctions.
// 
// https://liveg.tech
// Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.

// @import ../core/core

var l10n = {
    locales: {},
    language: "xx_XX",
    log: [],

    languageData: {
        friendlyName: "Neutral",
        friendlyNameShort: "Neutral",
        direction: "ltr",
        strings: {}
    },

    /*
        @name l10n.load

        @param code string Language code of language to use.
        @param data any Dictionary or JSON string of language data to use.

        @shortDescription Load object into locales list.
    */
    load: function(code, data) {
        if (typeof(data) == "string") {
            l10n.locales[code] = JSON.parse(data);
        } else {
            l10n.locales[code] = data;
        }
    },

    /*
        @name l10n.use

        @param code string Language code of language to use.

        @shortDescription Use locale from locales list.
    */
    use: function(code) {
        l10n.language = code;
        l10n.languageData = l10n.locales[code];
    },

    /*
        @name l10n.getBrowserLocale

        @return string Locale code of user determined from browser.

        @shortDescription Get the user's locale determined from the browser.
    */
    getBrowserLocale: function() {
        return navigator.language.replace(/-/g, "_");
    },

    /*
        @name l10n.addToLog

        @param data any Data that was used in event.
        @param result any Result that occurred. Should be `null` if `success` is `false`.
        @param success boolean Whether the event was successful. Default: `true`.
        @param date object Date of event in `Date` class type. Default: `new Date()`.

        @shortDescription Add event to l10n event log.
    */
    addToLog: function(data, result, success = true, date = new Date()) {
        l10n.log.push({
            data: data,
            result: result,
            success: success,
            date: date
        });
    },

    /*
        @name l10n.formatLocale

        @param data any Data to format in locale. Can be in `Number` class or `Date` class.
        @param code string Language code of language to use.
        @param options object Options to use when formatting. Default: `{}`.
    */
    formatLocale: function(data, code, options = {}) {
        if (data instanceof Number) {
            return data.toLocaleString(code.replace(/_/g, "-"), options);
        } else if (data instanceof Date) {
            return data.toLocaleDateString(code.replace(/_/g, "-"), options);
        } else {
            return data;
        }
    },

    /*
        @name l10n.translate

        @param string string String to translate.
        @param arguments object Arguments to include in string. Default: `{}`.
        @param useLocaleFormats boolean Whether to use locale formatting of arguments. Default: `true`.

        @return string Translated string.

        @shortDescription Translate string using arguments.
    */
    translate: function(string, arguments = {}, useLocaleFormats = true) {
        if (typeof(arguments) != "object") {
            arguments = [arguments];
        }

        if (l10n.languageData.strings[string] != undefined) {
            var foundTranslation = null;

            if (typeof(l10n.languageData.strings[string]) == "object") {
                var rules = l10n.languageData.strings[string];

                for (var rule in rules) {
                    var originalRule = rule;

                    for (var argument in arguments) {
                        rule = rule.replace(new RegExp("{" + argument + "}", "g"), arguments);
                    }

                    if (eval(rule.replace(new RegExp("{arg}", "g"), arguments[argument])) == true) {
                        foundTranslation = rules[originalRule];
                    }
                }
            } else {
                foundTranslation = l10n.languageData.strings[string];
            }

            if (foundTranslation != null) {
                for (var argument in arguments) {
                    if (useLocaleFormats) {
                        foundTranslation = foundTranslation.replace(new RegExp("{" + argument + "}", "g"), l10n.formatLocale(argument, l10n.language));
                    } else {
                        foundTranslation = foundTranslation.replace(new RegExp("{" + argument + "}", "g"), argument);
                    }
                }

                l10n.addToLog(string, foundTranslation);

                return foundTranslation;
            } else {
                l10n.addToLog(string, null, false);

                throw "Could not translate string \"" + string + "\"";
            }
        } else {
            l10n.addToLog(string, null, false);
        }
    }
};
