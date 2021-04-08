import Component from "../core/Component.js";
import FormControl from "./FormControl.js";
import RecentSearches from "./RecentsSearches.js";

export default class SearchInputContainer extends Component {
    $container;

    formControl;

    recents;

    constructor($target, props) {
        super($target, props);

        this.$container = Component.createElement("div", { class: "SearchInputContainer" });

        this.formControl = new FormControl(this.$container, {
            onSubmit: this.onSubmit.bind(this),
            toggleRecents: this.toggleRecents.bind(this),
            onClickRandom: this.props.onClickRandom
        });

        this.recents = new RecentSearches(this.$container, {
            onSubmit: this.onSubmit.bind(this),
            foucsInput: this.focusInput.bind(this)
        });

        $target.appendChild(this.$container);
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