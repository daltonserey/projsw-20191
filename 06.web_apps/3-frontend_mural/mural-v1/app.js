window.messages = [];

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

async function get_messages() {
    let response = await fetch('mensagens.json');
    let data = await response.json();
    window.messages = data;
}

get_messages()
.then(function () {
    render();
});
