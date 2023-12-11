class KGType extends HTMLElement {

    static register(tagName) {
        if ("customElements" in window) {
            customElements.define(tagName || "kg-type", KGType);
        }
    }

    static css = `:host {
        display: var(--kg-type-display, inline-block);
        color: var(--kg-type-color, #000);
        font-size: var(--kg-type-fontsize, 1rem);
    }`;

    constructor() {
        // Web Component setup
        super();

        // Get settings from element
        this._seperator = this.getAttribute("seperator") || ",";
        this._cursor = this.getAttribute("cursor") || "_";
        this._words = (this.getAttribute("words") || "").split(this._seperator);
        this._currentWord = this._words[0] || "";
        this._timeout = parseInt(this.getAttribute("clear-interval")) || 2000;
        this._typeInterval = parseInt(this.getAttribute("type-interval")) || 150;
        this._shuffle = this.getAttribute("shuffle") || false;
        this._deleteReverse = this.getAttribute("delete-reverse") || false;
        this._interval = null;

        // if shuffle, the array is shuffled
        if (this._shuffle) {
            // much random, very shuffle. 
            this._words.sort(() => Math.random() - 0.5);
        }

        this.connectedCallback();
        this.render();
    }

    connectedCallback() {
        // https://caniuse.com/mdn-api_cssstylesheet_replacesync
        if (this.shadowRoot || !("replaceSync" in CSSStyleSheet.prototype)) {
            return;
        }

        let root = this.attachShadow({ mode: "open" });
        let sheet = new CSSStyleSheet();
        sheet.replaceSync(KGType.css);
        root.adoptedStyleSheets = [sheet];
    }

    render() {
        this.typeTextByLetter();
    }

    setNextWord() {
        let nextIdx = this._words.indexOf(this._currentWord) + 1;
        if (this._words[nextIdx]) {
            this._currentWord = this._words[nextIdx];
        } else {
            this._currentWord = this._words[0];
        }
    }

    removeTextByLetter() {
        let word = this.shadowRoot.textContent.slice(0, -1);
        let cursor = this._cursor;
        let idx = word.length;
        let typeInterval = this._typeInterval;

        this._interval = setInterval(() => {
            word = word.slice(0, idx);
            this.shadowRoot.textContent = `${word}${cursor}`;
            idx--;

            if (idx == 0 || word == "") {
                clearInterval(this._interval);
                this.setNextWord();
                this.typeTextByLetter();
            }
        }, typeInterval);
    }

    typeTextByLetter() {
        let timeout = this._timeout;
        let cursor = this._cursor;
        let typeInterval = this._typeInterval;
        let letter = -1;

        if (this._currentWord.length == 0) { return; }

        this._interval = setInterval(() => {
            let word = this._currentWord;
            this.shadowRoot.textContent = `${word.substring(0, letter)}${cursor}`;
            letter++;

            if (letter == word.length + 1) {
                // setTimeout blocks execution until the timer is done, 
                // which will clear the word after two seconds.
                setTimeout(() => {
                    clearInterval(this._interval);
                    if (this._deleteReverse) {
                        this.removeTextByLetter();
                    } else {
                        this.setNextWord()
                        this.typeTextByLetter();
                    }
                }, timeout);
            }
        }, typeInterval);
    }
}

KGType.register();