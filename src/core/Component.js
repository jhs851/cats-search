import API from "./API.js";
import Root from "./Root.js";

export default class Component {
    root;

    api;

    $target;

    $element;

    props;

    state = {};

    constructor($target, $element, props = {}) {
        this.root = new Root(this);
        this.api = new API(this);
        this.$target = $target;
        this.$element = $element;
        this.props = props;
    }

    static createElement(tagName, attributes = {}, innerHTML = "") {
        const $element = document.createElement(tagName);
        Object.entries(attributes).forEach(attribute => $element.setAttribute(...attribute));
        $element.innerHTML = innerHTML;

        return $element;
    }

    setState(state, callback = () => null) {
        if (typeof state === "object") {
            this.state = Object.assign(this.state, state);
        } else if (typeof state === "function") {
            this.state = Object.assign(this.state, state(this.state));
        }

        this.render();
        callback();
    }

    render() { }
}