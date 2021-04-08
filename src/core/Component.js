export default class Component {
    $target;

    props;

    state = {};

    constructor($target, props = {}) {
        this.$target = $target;
        this.props = props;
    }

    static createElement(tagName, attributes = {}, innerHTML = '') {
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