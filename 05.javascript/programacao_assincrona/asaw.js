async function teste() {
    return new Promise((res, rej) => {
        setTimeout(() => res("oi"), 1000);
    });
}

function usuario() {
    console.log("iniciando");
    let x = await teste();
    console.log(x.toUpperCase());
    console.log("terminando");
}

console.log("INICIO PROGRAMA");
usuario();
console.log("FIM PROGRAMA");

