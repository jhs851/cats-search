import Component from "../core/Component.js";

export default class RandomButton extends Component {
    constructor($target, props) {
        super($target, Component.createElement("button", {
            class: "RandomButton",
            type: "button"
        }, "무작위 고양이들|"), props);
        this.$element.addEventListener("click", this.props.onClickRandom);
        $target.appendChild(this.$element);
    }
}