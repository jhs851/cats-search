import Component from "../core/Component.js";
import ThemeSwitch from "./ThemeSwitch.js";

export default class Header extends Component {
    themeSwitch;

    constructor($target) {
        super($target, Component.createElement("header", { class: "Header" }, "<h1>고양이 사진 검색</h1>"));
        this.themeSwitch = new ThemeSwitch(this.$element);
        $target.appendChild(this.$element);
    }
}