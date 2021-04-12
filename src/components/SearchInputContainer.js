import Component from "../core/Component.js";
import FormControl from "./FormControl.js";
import RecentSearches from "./RecentsSearches.js";

export default class SearchInputContainer extends Component {
    formControl;

    recents;

    constructor($target, props) {
        super($target, Component.createElement("div", { class: "SearchInputContainer" }), props);

        this.formControl = new FormControl(this.$element, {
            onSubmit: this.onSubmit.bind(this),
            toggleRecents: this.toggleRecents.bind(this),
            onClickRandom: this.props.onClickRandom
        });

        this.recents = new RecentSearches(this.$element, {
            onSubmit: this.onSubmit.bind(this),
            foucsInput: this.focusInput.bind(this)
        });

        $target.appendChild(this.$element);
    }

    async onSubmit(keyword, isRecent) {
        await this.props.onSearch(keyword);
        this.formControl.input.setValue(keyword);

        if (!isRecent) {
            this.recents.addKeyword(keyword);
        }
    }

    toggleRecents() {
        this.recents.toggle();
    }

    focusInput() {
        this.formControl.input.focus();
    }
}