const $altura = document.querySelector("#altura");
const $peso = document.querySelector("#peso");
const $imc = document.querySelector("#imc");

function calcule_imc() {
    const peso = Number($peso.value);
    const altura = Number($altura.value);
    atualize_imc(valor_imc(peso, altura));
}

function atualize_imc(imc) {
    $imc.innerText = "imc = " + imc.toFixed(2);
}

function valor_imc(peso, altura) {
    return peso / altura ** 2;
}

$peso.onkeyup = calcule_imc;
$altura.onkeyup = calcule_imc;
