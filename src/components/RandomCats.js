import Component from "../core/Component.js";

export default class RandomSwiper extends Component {
    state = {
        randomCats: []
    };

    activeIndex = 0;

    constructor($target, props) {
        super($target, Component.createElement("section", { class: "RandomCats" }), props);

        $target.appendChild(this.$element);

        this.init();
    }

    async init() {
        this.setState({
            randomCats: (await this.api.fetchRandomCats()).data.slice(0, 5)
        });
    }

    previous() {
        this.activeIndex = this.activeIndex === 0
            ? this.state.randomCats.length - 1
            : this.activeIndex - 1;

        this.transform();
    }

    next() {
        this.activeIndex = this.activeIndex >= this.state.randomCats.length - 1
            ? 0
            : this.activeIndex + 1;

        this.transform();
    }

    transform() {
        this.$element.querySelector(".wrapper").style.transform = `translate3d(${-640 * this.activeIndex}px, 0, 0)`;
    }

    render() {
        const { randomCats } = this.state;

        if (randomCats.length) {
            this.$element.innerHTML = `
                <h2>랜덤 고양이</h2>

                <div class="container">
                    <div class="wrapper">
                        ${randomCats.map(cat => `
                            <article class="item" data-id="${cat.id}">
                                <div class="mask">${cat.name}</div>
                                <img src=${cat.url} alt=${cat.name} loading="lazy" />
                            </article>
                        `).join("")}
                    </div>

                    <button type="button" class="navigation prev"><</button>
                    <button type="button" class="navigation next">></button>
                </div>
            `;

            this.$element.addEventListener("click", event => {
                const closest = event.target.closest(".item");

                if (closest) {
                    this.props.onClick(closest.dataset.id);
                }
            });

            this.$element.querySelector(".prev").addEventListener("click", this.previous.bind(this));
            this.$element.querySelector(".next").addEventListener("click", this.next.bind(this));
        }
    }
}