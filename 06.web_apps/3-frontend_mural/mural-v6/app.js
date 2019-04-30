import {get_messages, messages} from './messages.js';

function render() {
    let $msgs = document.getElementById("msgs");
    $msgs.innerHTML = '';
    messages.forEach(function (message) {
        let html = `<style>
                        p { color: red; }
                    </style>
                    <p>${message.message}</p>
                    <p>${message.author}</p>
                    <time>${message.at}</time>`;

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
