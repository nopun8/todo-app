class Task {
    #id;
    #text;

    constructor(id, text) {
        this.#id = id;
        this.#text = text;
    }

    getTaskId() {
        return this.#id;
    }

    getTaskText() {
        return this.#text;
    }
}

export { Task };