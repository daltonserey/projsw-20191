const messages = [];

async function get_messages() {
    let response = await fetch('mensagens.json');
    let data = await response.json();
    messages.push(...data);
}

export {get_messages, messages};
