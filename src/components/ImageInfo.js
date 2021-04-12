import Component from "../core/Component.js";

export default class ImageInfo extends Component {
    state = {
        visible: false,
        image: null
    };

    constructor($target) {
        super($target, Component.createElement("div", { class: "ImageInfo Modal" }));
        $target.appendChild(this.$element);
        this.render();

        window.addEventListener("keydown", e => {
            if (e.key === "Escape") {
                this.hide();
            }
        });
    }

    hide() {
        this.setState({
            visible: false,
            image: null
        })
    }

    render() {
        if (this.state.visible) {
            const { name, url, temperament, origin } = this.state.image;

            this.$element.innerHTML = `
                <div class="overlay"></div>
                <div class="content-wrapper">
                    <div class="title">
                        <span>${name}</span>
                        <button class="close">x</button>
                    </div>
                    <img src="${url}" alt="${name}"/>
                    <div class="description">
                        <div>성격: ${temperament}</div>
                        <div>태생: ${origin}</div>
                    </div>
                </div>
            `;
            this.$element.querySelectorAll(".overlay, .close").forEach($element => {
                $element.addEventListener("click", this.hide.bind(this));
            });
            this.$element.style.display = "flex";
            setTimeout(() => {
                this.$element.classList.add("show");
            }, 200);
        } else {
            this.$element.classList.remove("show");
            setTimeout(() => {
                this.$element.style.display = "none";
            }, 200);
        }
    }
}
