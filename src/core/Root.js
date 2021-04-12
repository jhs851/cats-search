export default class Root {
    static events = {};

    component;

    constructor(component) {
        this.component = component;
    }

    on(event, callback) {
        if (typeof callback === "function") {
            Root.events[event] = callback;
        }
    }

    emit() {
        const args = Object.values(arguments);
        const event = args.splice(0, 1);

        if (Object.hasOwnProperty.call(Root.events, event)) {
            Root.events[event](...args);
            this.component.render();
        }
    }
}