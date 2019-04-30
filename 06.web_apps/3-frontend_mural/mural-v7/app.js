import {get_messages, messages} from './messages.js';

function render() {
    let $msgs = document.getElementById("msgs");
    $msgs.innerHTML = '';
    messages.forEach(function (message) {
        let html = `<style>
                :host {
                    background: #bfb;
                    padding: 12px;
                    border-radius: 8px;
                    margin-bottom: 2px;
                    display: grid;
                    grid-template-areas:
                        "message message"
                        "at      author";
                    grid-gap: 10px;
                }
                p, time {
                    margin: 0;
                    color: gray;
                }
                p.message {
                    grid-area: message;
                    color: navy;
                }
                p.author {
                    grid-area: author;
                    justify-self: end;
                }
            </style>
            <p class="message">${message.message}</p>
            <p class="author">${message.author}</p>
            <time style="grid-area: at;">${message.at}</time>`;

        let novo = document.createElement("div");
        let shadow = novo.attachShadow({"mode": "open"});
        shadow.innerHTML = html;
        $msgs.appendChild(novo);
    });
}

get_messages()
.then(function () {
    render();
});
