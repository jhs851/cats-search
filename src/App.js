import Component from "./core/Component.js";
import Header from "./components/Header.js";
import SearchInputContainer from "./components/SearchInputContainer.js";
import SearchResult from "./components/SearchResult.js";
import ImageInfo from "./components/ImageInfo.js";
import Loader from "./components/Loader.js";
import RandomCats from "./components/RandomCats.js";

export default class App extends Component {
    header;

    searchInputContainer;

    randomCats;

    searchResult;

    imageInfo;

    loader;

    constructor($target) {
        super($target);

        this.header = new Header($target);

        this.searchInputContainer = new SearchInputContainer($target, {
            onSearch: this.onSearch.bind(this),
            onClickRandom: this.onClickRandom.bind(this)
        });

        this.randomCats = new RandomCats($target, {
            onClick: this.onClickCat.bind(this)
        });

        this.searchResult = new SearchResult($target, {
            onClick: this.onClickCat.bind(this)
        });

        this.imageInfo = new ImageInfo($target);

        this.loader = new Loader($target);
    }

    async onSearch(keyword) {
        const { data } = await this.api.fetchCats(keyword);

        localStorage.setItem("lastKeyword", keyword);

        this.searchResult.setState({
            searched: true,
            keyword,
            cats: data
        }, () => {
            localStorage.setItem("lastResults", JSON.stringify(data));
        });
    }

    async onClickCat(id) {
        const { data } = await this.api.fetchCat(id);

        this.imageInfo.setState({
            visible: true,
            image: data
        });
    }

    onClickRandom() {
        this.searchResult.setState({ cats: this.randomCats.state.randomCats });
    }
}
