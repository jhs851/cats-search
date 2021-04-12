export default class API {
    static ENDPOINT = "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

    app;

    constructor(app) {
        this.app = app;
    }

    async fetch(path) {
        try {
            this.app.root.emit("loading");

            const response = await fetch(`${API.ENDPOINT}/${path}`);

            this.app.root.emit("loaded");

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