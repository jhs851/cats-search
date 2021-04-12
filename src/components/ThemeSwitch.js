import Component from "../core/Component.js";

export default class ThemeSwitch extends Component {
    constructor($target) {
        const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

        super($target, Component.createElement("div", { class: "ThemeSwitch" }, `
            <input id="Switch" type="checkbox" ${isDarkTheme ? "checked" : ""}>
            <label for="Switch" class="ThemeSwitchHandler"></label>
        `));

        $target.appendChild(this.$element);

        this.$element.querySelector("#Switch").addEventListener("change", () => {
            document.body.classList.toggle(isDarkTheme ? "light-theme" : "dark-theme");
        });
    }
}