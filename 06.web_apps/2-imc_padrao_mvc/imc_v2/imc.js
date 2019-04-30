const $altura = document.querySelector("#altura");
const $peso = document.querySelector("#peso");
const $imc = document.querySelector("#imc");

function calcule_imc() {
    const peso = Number($peso.value);
    const altura = Number($altura.value);
    const imc = valor_imc(peso, altura);
    $imc.innerText = "imc = " + valor_imc(peso, altura).toFixed(2);
}

function valor_imc(peso, altura) {
    return peso / altura ** 2;
}

$peso.onkeyup = calcule_imc;
$altura.onkeyup = calcule_imc;
