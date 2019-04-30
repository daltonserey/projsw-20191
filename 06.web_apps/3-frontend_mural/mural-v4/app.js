import {get_messages, messages} from './messages.js';

function render() {
    let $msgs = document.getElementById("msgs");    
    $msgs.innerHTML = '';
    messages.forEach(function (message) {
        let html = `<p>${message.message}</p>
                    <p>${message.author}</p>
                    <time>${message.at}</time>`;

        let novo = document.createElement("div");
        novo.innerHTML = html;
        $msgs.appendChild(novo);
    });
}

get_messages()
.then(function () {
    render();
});
