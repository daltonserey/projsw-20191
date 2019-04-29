function seila(callback) {
    setTimeout(function () {
        callback("oi");
    }, 1000)
}

function recebedor(dado) {
    console.log("callback chamado: " + dado);
}

seila(recebedor);
