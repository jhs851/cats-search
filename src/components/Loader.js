import Component from "../core/Component.js";

export default class Loader extends Component {
    state = {
        visible: false
    };

    $loader;

    constructor($target) {
        super($target);

        this.$loader = Component.createElement("div", { class: "Loader Modal" });
        this.$loader.innerHTML = "<span>불러오는 중...|</span>";
        $target.appendChild(this.$loader);
        this.render();
    }

    setVisible(visible) {
        this.setState({ visible });
    }

    render() {
        this.$loader.style.display = this.state.visible ? "flex" : "none";
    }
}