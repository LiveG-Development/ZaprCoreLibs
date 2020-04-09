// @import ../../src/dom/dom
// @import ../../src/importer/importer
// @import ../../src/l10n/l10n

// @asset locale/en_GB.json
// @asset locale/fr_FR.json
// @asset locale/zh_CN.json
// @asset locale/ar_EG.json

l10n.load("en_GB", importer.getString(_assets["en_GB.json"]));
l10n.load("fr_FR", importer.getString(_assets["fr_FR.json"]));
l10n.load("zh_CN", importer.getString(_assets["zh_CN.json"]));
l10n.load("ar_EG", importer.getString(_assets["ar_EG.json"]));

var lang = l10n.getBrowserLocale();

function _() {
    return l10n.translate(...arguments);
}

if (core.parameter("lang") != null) {
    lang = core.parameter("lang");
}

if (!(lang in l10n.locales)) {
    lang = "en_GB";
}

l10n.use(lang);

dom.loaded(function() {
    dom.element().attribute("dir").set(l10n.languageData.direction);

    dom.element("title").text.set(_("title"));

    dom.element().newChild(dom.new("h1").text.set(_("heading")));
    dom.element().newChild(dom.new("p").text.set(_("paragraph")));
    dom.element().newChild(dom.new("p").text.set(_("example1", [5])));
    dom.element().newChild(dom.new("p").text.set(_("example2", [8])));
});