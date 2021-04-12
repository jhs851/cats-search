import Component from "../core/Component.js";

export default class SearchInput extends Component {
    constructor($target, props) {
        super($target, Component.createElement(
            "input",
            {
                class: "SearchInput",
                type: "text",
                placeholder: "고양이를 검색해보세요.|",
                autofocus: true
            },
        ), props);

        this.$element.addEventListener("keypress", this.onKeypress.bind(this));
        this.$element.addEventListener("click", this.onClick.bind(this));

        $target.appendChild(this.$element);
    }

    async onKeypress(e) {
        if (e.keyCode === 13) {
            await this.props.onSubmit(e.target.value, false);
        }
    }

    onClick() {
        this.$element.value = "";
        this.props.toggleRecents();
    }

    setValue(value) {
        this.$element.value = value;
    }

    focus() {
        this.$element.focus();
    }
}
