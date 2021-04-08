import Component from "../core/Component.js";

export default class SearchResult extends Component {
    $searchResult;

    state = {
        searched: false,
        keyword: '',
        cats: JSON.parse(localStorage.getItem('lastResults')) || []
    };

    constructor($target, props) {
        super($target, props);
        this.$searchResult = Component.createElement("section", { class: "SearchResult" });
        $target.appendChild(this.$searchResult);
        this.render();
    }

    render() {
        const { searched, keyword, cats } = this.state;

        if (cats.length) {
            this.$searchResult.classList.remove("empty");
            this.$searchResult.innerHTML = cats
                .map(cat => `
                    <article class="item">
                        <img src=${cat.url} alt=${cat.name} />
                    </article>
                `)
                .join("");

            this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
                $item.addEventListener("click", () => {
                    this.props.onClick(cats[index]);
                });
            });
        } else if (searched) {
            this.$searchResult.classList.add("empty");
            this.$searchResult.innerHTML = `<span><b>${keyword}</b>에 대한 검색 결과가 없어요...|</span>`;
        }
    }
}
