import Component from "../core/Component.js";

export default class SearchInput extends Component {
    $input;

    constructor($target, props) {
        super($target, props);

        this.$input = Component.createElement(
            "input",
            {
                class: "SearchInput",
                type: "text",
                placeholder: "고양이를 검색해보세요.|",
                autofocus: true
            },
        );
        this.$input.addEventListener("keyup", this.onKeyup.bind(this));
        this.$input.addEventListener("click", this.onClick.bind(this));

        $target.appendChild(this.$input);
    }

    async onKeyup(e) {
        if (e.keyCode === 13) {
            await this.props.onSubmit(e.target.value, false);
        }
    }

    onClick() {
        this.$input.value = '';
        this.props.toggleRecents();
    }

    setValue(value) {
        this.$input.value = value;
    }

    focus() {
        this.$input.focus();
    }
}
