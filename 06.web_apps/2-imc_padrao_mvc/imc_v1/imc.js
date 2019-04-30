const $altura = document.querySelector("#altura");
const $peso = document.querySelector("#peso");
const $imc = document.querySelector("#imc");

function calcule_imc() {
    const peso = Number($peso.value);
    const altura = Number($altura.value);
    $imc.innerText = "imc = " + (peso / altura ** 2).toFixed(2);
}

$peso.onkeyup = calcule_imc;
$altura.onkeyup = calcule_imc;
