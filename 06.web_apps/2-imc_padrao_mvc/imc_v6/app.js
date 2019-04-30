import model from './imc.js';

const $altura = document.querySelector("#altura");
const $peso = document.querySelector("#peso");
const $imc = document.querySelector("#imc");

function handle_user_input() {
    model.peso = Number($peso.value);
    model.altura = Number($altura.value);
    atualize_imc(model.imc());
};

function atualize_imc(imc) {
    $imc.innerText = "imc = " + imc.toFixed(2);
}

$peso.onkeyup = handle_user_input;
$altura.onkeyup = handle_user_input;
