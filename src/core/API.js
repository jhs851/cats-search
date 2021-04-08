export default class API {
    static ENDPOINT = "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

    loader;

    constructor(loader) {
        this.loader = loader;
    }

    async fetch(path) {
        try {
            this.loader.setVisible(true);

            const response = await fetch(`${API.ENDPOINT}/${path}`);

            this.loader.setVisible(false)

            return response.json();
        } catch (e) {
            console.warn(e);
        }
    }

    fetchCats(keyword) {
        return this.fetch(`api/cats/search?q=${keyword}`);
    }

    fetchCat(id) {
        return this.fetch(`api/cats/${id}`);
    }

    fetchRandomCats() {
        return this.fetch(`api/cats/random50`);
    }
}