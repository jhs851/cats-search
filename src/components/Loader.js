import Component from "../core/Component.js";

export default class Loader extends Component {
    state = {
        visible: false
    };

    constructor($target) {
        super($target, Component.createElement("div", { class: "Loader Modal" }, "<span>불러오는 중...|</span>"));
        $target.appendChild(this.$element);
        this.render();

        this.root.on("loading", () => {
            this.setVisible(true);
        });

        this.root.on("loaded", () => {
            this.setVisible(false);
        });
    }

    setVisible(visible) {
        this.setState({ visible });
    }

    render() {
        this.$element.style.display = this.state.visible ? "flex" : "none";
    }
}