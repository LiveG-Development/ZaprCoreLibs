// @import ../../src/dom/dom

dom.loaded(function() {
    dom.element().newChild(
        dom.new("h1")
            .text.set("Hello, world!")
            .style.setPush({
                fontFamily: '"Century Gothic", sans-serif',
                color: "blue"
            })
    );
});