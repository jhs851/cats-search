import Component from "../core/Component.js";
import SearchInput from "./SearchInput.js";
import RandomButton from "./RandomButton.js";

export default class FormControl extends Component {
    input;

    randomButton;

    constructor($target, props) {
        super($target, Component.createElement("div", { class: "form-control" }), props);

        this.input = new SearchInput(this.$element, {
            onSubmit: this.props.onSubmit,
            toggleRecents: this.props.toggleRecents
        });

        this.randomButton = new RandomButton(this.$element, {
            onClickRandom: this.props.onClickRandom
        });

        $target.appendChild(this.$element);
    }
}