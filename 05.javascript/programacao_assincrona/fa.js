async function get() {
    try {
        let response = await fetch('dados.json');
        let dados = await response.json();
        let url = dados.sites[0];
        let response2 = await fetch(url);
        let resultado = await response2.json();
        console.log(resultado);
    } catch (err) {
        console.log("ops!");
        console.log(err);
    }
}

get();
