import Component from "../core/Component.js";

export default class SearchResult extends Component {
    state = {
        searched: false,
        keyword: "",
        cats: JSON.parse(localStorage.getItem("lastResults")) || [],
        page: 1
    };

    constructor($target, props) {
        super($target, Component.createElement("section", { class: "SearchResult" }), props);
        $target.appendChild(this.$element);
        this.render();

        window.addEventListener("scroll", this.onScroll.bind(this));
    }

    onScroll() {
        const documentElement = document.documentElement;

        if (window.scrollY + documentElement.clientHeight >= documentElement.scrollHeight - 200) {
            const page = this.state.page + 1;

            if (this.state.cats.slice(page * 20).length) {
                this.setState({ page });
            } else {
                window.removeEventListener("scroll", this.onScroll.bind(this));
            }
        }
    }

    render() {
        const { searched, keyword, cats, page } = this.state;

        if (cats.length) {
            this.$element.classList.remove("empty");
            this.$element.innerHTML = cats.slice(0, page * 20)
                .map(cat => `
                    <article class="item" data-id="${cat.id}">
                        <div class="mask">${cat.name}</div>
                        <img src="${cat.url}" alt="${cat.name}" loading="lazy" />
                    </article>
                `)
                .join("");

            this.$element.addEventListener("click", event => {
                const closest = event.target.closest(".item");

                if (closest) {
                    this.props.onClick(closest.dataset.id);
                }
            })
        } else if (searched) {
            this.$element.classList.add("empty");
            this.$element.innerHTML = `<span><b>${keyword}</b>에 대한 검색 결과가 없어요...|</span>`;
        }
    }
}
