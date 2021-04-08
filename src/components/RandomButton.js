import Component from "../core/Component.js";

export default class RandomButton extends Component {
    $button;

    constructor($target, props) {
        super($target, props);

        this.$button = Component.createElement("button", {
            class: "RandomButton",
            type: "button"
        }, '무작위 고양이들|');

        this.$button.addEventListener("click", this.props.onClickRandom);

        $target.appendChild(this.$button);
    }
}