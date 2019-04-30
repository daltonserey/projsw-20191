import {get_messages, messages} from './messages.js';
import './mural.js';

function render() {
    let $msgs = document.getElementById("msgs");
    $msgs.innerHTML = '';
    messages.forEach(function (message) {
        let novo = document.createElement("ps-message");
        novo.setAttribute('message', message.message);
        novo.setAttribute('author', message.author);
        novo.setAttribute('at', message.at);
        $msgs.appendChild(novo);
    });
}

async function init() {
    await get_messages();
    render()
}

init();
