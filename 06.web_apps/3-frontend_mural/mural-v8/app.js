import {get_messages, messages} from './messages.js';

function render() {
    let $msgs = document.getElementById("msgs");
    $msgs.innerHTML = '';
    messages.forEach(function (message) {
        let html = `<link rel="stylesheet" href="message.css">
                    <p class="message">${message.message}</p>
                    <p class="author">${message.author}</p>
                    <time class="at">${message.at}</time>`;

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
