import Component from "../core/Component.js";

export default class RecentSearches extends Component {
    state = {
        visible: false,
        searches: JSON.parse(localStorage.getItem('recentSearches')) || [],
    };

    $recents;

    constructor($target, props) {
        super($target, props);

        this.$recents = Component.createElement("div", { class: "RecentSearches" });
        this.$recents.addEventListener("click", this.onClick.bind(this));

        $target.appendChild(this.$recents);
        this.render();
    }

    onClick() {
        this.props.foucsInput();
    }

    addKeyword(keyword) {
        this.setState(({ searches }) => {
            if (searches.length > 4) {
                searches.shift();
            }

            searches.push(keyword);

            return { searches };
        }, () => {
            localStorage.setItem('recentSearches', JSON.stringify(this.state.searches));
        });
    }

    toggle() {
        this.setState(({ visible }) => ({ visible: !visible }));
    }

    render() {
        const { visible, searches } = this.state;
        const reversed = searches.slice().reverse();

        if (visible && searches.length) {
            this.$recents.innerHTML = `
                <div class="title">
                    <span>최근 검색어</span>
                    <button class="remove-all">전체 삭제</button>
                </div>
                
                <ul class="recent-searches-list">
                    ${reversed.map(item => `
                        <li>
                            <a class="item" href="#">${item}</a>
                            <button class="remove">삭제</button>
                        </li>
                    `).join("")}
                </ul>
            `;
            this.$recents.style.display = "block";
            this.$recents.querySelectorAll(".item").forEach(($item, index) => {
                $item.addEventListener("click", async e => {
                    e.preventDefault();
                    await this.props.onSubmit(reversed[index], true);
                    this.setState({ visible: false })
                });
            });
        } else {
            this.$recents.style.display = "none";
        }
    }
}