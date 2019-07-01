// Zapr Core Libraries
// 
// Copyright (C) LiveG. All Rights Reserved.
// Copying is not a victimless crime. Anyone caught copying LiveG software may
// face sanctions.
// 
// https://liveg.tech
// Licensed by the LiveG Open-Source Licence, which can be found at LICENCE.md.

// @import ../dom/dom

var importer = {
    /*
        @name importer.generateLink

        @param asset string Asset contents to use in Base64.
        @param type string Media type to use in link. Default: `"text/plain"`.

        @return string Generated link from asset.

        @shortDescription Generate link from asset data with media type.
    */
    generateLink: function(asset, type = "text/plain") {
        return "data:" + type + ";base64," + asset;
    },

    /*
        @name importer.generateLinkDOMElement

        @param asset string Asset contents to use in Base64.
        @param type string Media type to use in link. Default: `"text/css"`.
        @param relation string Relation to use (`rel` attribute in HTML). Default: `"stylesheet"`.

        @shortDescription Generate `link` DOM element from asset data with media type and relation.
    */
    generateLinkDOMElement: function(asset, type = "text/css", relation = "stylesheet") {
        return dom.new("link")
            .attribute("rel").set(relation)
            .attribute("href").set(importer.generateLink(asset, type))
        ;
    },

    /*
        @name importer.getString

        @param asset string Asset to use in Base64.

        @shortDescription Get string from Base64 asset.
    */
    getString: function(asset) {
        return decodeURIComponent(atob(asset).split("").map(function(char) {
            return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
    }
};