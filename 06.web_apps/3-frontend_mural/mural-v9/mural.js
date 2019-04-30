class MuralMessage extends HTMLElement{
    constructor() {
        super();
        this.$shadow = this.attachShadow({"mode": "open"});
    }

    connectedCallback() {
        this.message = this.getAttribute('message');
        this.author = this.getAttribute('author');
        this.at = this.getAttribute('at');
        this.render();
    }

    render() {
        this.$shadow.innerHTML = 
            `<link rel="stylesheet" href="message.css">
             <p class="message">${this.message}</p>
             <p class="author">${this.author}</p>
             <time class="at">${this.at}</time>`;

    }
}

window.customElements.define('ps-message', MuralMessage)
