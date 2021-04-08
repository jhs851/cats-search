import Component from "../core/Component.js";
import SearchInput from "./SearchInput.js";
import RandomButton from "./RandomButton.js";

export default class FormControl extends Component {
    $formControl;

    input;

    randomButton;

    constructor($target, props) {
        super($target, props);

        this.$formControl = Component.createElement("div", { class: "form-control" });

        this.input = new SearchInput(this.$formControl, {
            onSubmit: this.props.onSubmit,
            toggleRecents: this.props.toggleRecents
        });

        this.randomButton = new RandomButton(this.$formControl, {
            onClickRandom: this.props.onClickRandom
        });

        $target.appendChild(this.$formControl);
    }
}