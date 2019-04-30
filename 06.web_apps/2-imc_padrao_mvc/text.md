## O aplicativo IMC à luz do padrão MVC

Relembre o pequeno aplicativo que calcula o IMC. Mesmo um
aplicativo tão simples pode se beneficiar da aplicação do padrão
MVC. Nesta parte faremos um refatoramento de nossa minúscula
aplicação para introduzir pouco a pouco os conceitos de MVC.

### Versão inicial

Relembre que em nossa primeira versão do app IMC, construída em
sala de aula, a função `calcule_imc()` era definida como abaixo.

```javascript
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
```

A função `calcule_imc` acima claramente viola a decomposição
segundo o padrão MVC. Tente, por exemplo, mapear a função para um
dos componentes do padrão. Em sua opinião ela seria parte do
_model_, da _view_ ou do _controller_? É difícil mapear essa
função apropriadamente porque ela opera responsabilidades dos
três componentes. Observe.  Nela codificamos a fórmula do IMC e,
por esse motivo, deveria ser considerada parte do _model_, afinal
a fórmula é parte da lógica de negócio, que só pode estar
localizada no _model_. Por outro lado, a função é usada como
_handler_ de eventos `onkeyup` produzidos pelo usuário e,
portanto, deveria ser considerada parte do _controller_.
Finalmente, observe que a função redefine o valor de
`$imc.innerText`, que é uma forma de atualizar a representação
visual apresentada ao usuário e, por isso, deveria ser
considerada parte da _view_. Podemos concluir que, se for escrito
dessa forma, esse mini app não atende apropriadamente ao padrão
MVC.

Embora a função não atenda ao padrão MVC, ela está correta e
atende ao propósito do app. Naturalmente, em um app ridiculamente
pequeno como esse não há motivos para termos maiores
preocupações. A título de exercício, contudo, vale a pena
repensarmos o app para adaptá-lo ao padrão. 

### Versão 2

A segunda solução de nosso app, mostrada abaixo, evolui um pouco.

```javascript
const $altura = document.querySelector("#altura");
const $peso = document.querySelector("#peso");
const $imc = document.querySelector("#imc");

function calcule_imc() {
    const peso = Number($peso.value);
    const altura = Number($altura.value);
    const imc = valor_imc(peso, altura);
    $imc.innerText = "imc = " + valor_imc(peso, altura);
}

function valor_imc(peso, altura) {
    return peso / altura ** 2;
}

$peso.onkeyup = calcule_imc;
$altura.onkeyup = calcule_imc;
```

Nesta versão, a função `calcule_imc` não contém mais a fórmula de
cálculo do IMC. A fórmula foi isolada na função `valor_imc()` de
forma que a função `calcule_imc()` passa a atuar exclusivamente
na interface, lendo e interpretando os dados digitados e fazendo
a atualização do valor do IMC. Assim, podemos afirmar com
bastante segurança que a função `valor_imc()` deve ser
considerada parte do modelo e que a função `calcule_imc` é parte
da interface com o usuário, muito embora ainda seja difícil ser
mapeada para o _controller_ ou para a _view_, dado que ela ainda
faz muitas coisas: lê a _view_, invoca uma função do _model_ e
altera a _view_.


### Versão 3

A terceira versão, abaixo, avança na mudança, isolando um pouco
mais o código pertencente a cada componente em diferentes
funções.

```javascript
const $altura = document.querySelector("#altura");
const $peso = document.querySelector("#peso");
const $imc = document.querySelector("#imc");

function calcule_imc() {
    const peso = Number($peso.value);
    const altura = Number($altura.value);
    atualize_imc(valor_imc(peso, altura));
}

function atualize_imc(imc) {
    $imc.innerText = "imc = " + imc;
}

function valor_imc(peso, altura) {
    return peso / altura ** 2;
}

$peso.onkeyup = calcule_imc;
$altura.onkeyup = calcule_imc;
```

Nesta versão, introduzimos a função `atualize_imc()` cujo papel é
alterar a _view_. A função `calcule_imc()` por sua vez, agora
precisa invocar `atualize_imc()` para alterar a _view_. Isso nos
permite caracterizar esta função como sendo parte da _view_. Na
prática, contudo, não é raro que ainda seja considerada parte do
código do _controller_ e que a _view_ seja considerada
exclusivamente o DOM. De qualquer forma, a separação em
diferentes funções para isolar cada tipo de comportamento é
adequado.

Há, contudo, um problema que ainda não tratamos que é central em
MVC: dados. Observe que em todas as versões acima, os dados
centrais de que trata o app são mantidos pela _view_. Confira.
Não há nenhuma variável em nosso código que mantenha o tempo todo
o valor do peso e da altura. Quando as funções executam esses
dados são trazidos do DOM para serem usados. Claramente, isso
também viola os princípios básicos de MVC.

## Revisão 4

Nesta quarta versão damos mais um passo nessa separação dos componentes
do MVC. Nela, introduzimos um objeto JavaScript que faz o papel
explícito de modelo em nossa aplicação. Com isso, podemos reunir
no _model_ os dados centrais do app e a função que calcula o imc
(por simplicidade, renomeei `valor_imc` para `imc`).

```javascript
const $altura = document.querySelector("#altura");
const $peso = document.querySelector("#peso");
const $imc = document.querySelector("#imc");

const model = {
    peso: null,
    altura: null,
    imc: function imc() {
        return this.peso / this.altura ** 2;
    }
};

function calcule_imc() {
    model.peso = Number($peso.value);
    model.altura = Number($altura.value);
    atualize_imc(model.imc());
};

function atualize_imc(imc) {
    $imc.innerText = "imc = " + imc.toFixed(2);
}

$peso.onkeyup = calcule_imc;
$altura.onkeyup = calcule_imc;
```

Nesta versão temos um _model_ explícito, implementado como um
objeto JavaScript. Nele, estão reunidos os dados centrais da
aplicação (peso, altura) e a função que calcula o imc. Perceba
que esse modelo não guarda qualquer dependência do restante do
sistema, seja da _view_ (html, dom), seja do controller (o
restante do código). De fato, nada impede que esse mesmo modelo,
se for apropriado, seja reutilizado em outras aplicações.

### Revisão 5

Esta é a quinta revisão de nosso código. Nela, separamos ainda
mais o código do _model_ do restante da aplicação (_controller_ e
_view_). Para isso, precisamos fazer uma pequena modificação no
código do html para que dois arquivos JavaScript sejam lidos pelo
_browser_ para compor a aplicação. Segue o trecho de html em que
fazemos a leitura dos arquivos.

```html
<body>

  ...

  <script src="imc.js"></script>
  <script src="app.js"></script>
</body>
```

Neste caso específico, não importa a ordem em que os arquivos
sejam lidos. Em casos maiores, contudo, a ordem pode importar.

Vejamos agora o código do arquivo `app.js`.

```javascript
const $altura = document.querySelector("#altura");
const $peso = document.querySelector("#peso");
const $imc = document.querySelector("#imc");

function calcule_imc() {
    model.peso = Number($peso.value);
    model.altura = Number($altura.value);
    atualize_imc(model.imc());
};

function atualize_imc(imc) {
    $imc.innerText = "imc = " + imc.toFixed(2);
}

$peso.onkeyup = calcule_imc;
$altura.onkeyup = calcule_imc;
```

E agora, o código de `imc.js`.

```javascript
const model = {
    peso: null,
    altura: null,
    imc: function imc() {
        return this.peso / this.altura ** 2;
    }
};
```

Observe que os dois arquivos são apenas a decomposição do arquivo
original da versão anterior. Simplesmente mudamos a definição de
`model` para o arquivo `imc.js` e mantivemos as demais definições
em `app.js`. Observe ainda que a variável `model` é referenciada
no arquivo `app.js` o que é bastante _peculiar_, pra dizer o
mínimo.

O problema é que nosso app está tirando proveito de um problema
de JavaScript: que scripts compartilham um único _namespace_
global. Assim, a variável `model` definida em `imc.js` pode ser
lida (e poderia ser alterada) pelo código em `app.js`.  Tal forma
de codificação, dependente de variávels globais é um grande _bad
smell_. Felizmente, nas versões modernas de JavaScript, isso é
fácil de resolver.

### Revisão 6

O que faremos é passar a usar _módulos_. Um _módulo JavaScript_ é
simplesmente um arquivo de código que o _browser_ isola
completamente dos demais módulos e do _namespace_ global. Isso
permite escrever código com muito mais segurança. Para isso, a
principal mudança necessária é no html. É necessário mudar a
forma de ler os arquivos, indicando explicitamente para o
_browser_ que se trata de módulos. Abaixo segue o novo código
para fazer isso.

```html
<body>

  ...

  <script type="module" src="imc.js"></script>
  <script type="module" src="app.js"></script>
</body>
```

Se só fizermos essa única mudança, nosso código não irá
funcionar. A razão para isso é que a variável `model` em `app.js`
deixa de estar definida quando as funções forem executadas. 

Para fazer o código voltar a funcionar, é necessário que nosso
módulo `imc.js` _exporte_ (disponibilize e torne acessível para
fora do módulo) o objeto `model` contido nele. Da mesma forma,
o módulo `app.js` deve _importar_ (criar uma referência no
_namespace_ para um objeto criado em outro módulo) o objeto
`model`. Para isso, vamos modificar muito pouco cada um dos
arquivos `imc.js` e `app.js`. De fato, cada um dos arquivos
receberá apenas uma linha adicional.

Primeiro, vejamos como fica o arquivo `imc.js`.

```javascript
const model = {
    peso: null,
    altura: null,
    imc: function imc() {
        return this.peso / this.altura ** 2;
    }
};

export default model;
```

Atente para a última linha. Nela, indicamos que esse módulo
exporta o objeto `model` (atente para a palavra-chave `default`
que é usada para indicar que esse objeto é o _export_ padrão
daquele módulo. Isso permite simplificar a sintaxe usada no
_import_.

> Observação. O sistema de módulos e de _imports_ e _exports_ de
> JavaScript é bastante poderoso, mas às vezes confuso. Leia
> sobre o assunto nas páginas
> [Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
> e [Export](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)
> do wiki do Mozilla Developer.

Vejamos como fica o código de `app.js` e o respectivo _import_.

```javascript
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
```

Atente para a primeira linha do código acima. É ela que faz o
_import_ do objeto `model` exportado pelo módulo `imc.js`. No
restante do código, há apenas uma mudança. O nome da função antes
chamada `calcule_imc()` foi alterado para `handle_user_input()`, dado
que dessa forma reflete mais claramente seu verdadeiro propósito
que é tratar eventos de entrada de dados do usuário.

### Revisão 7

Uma última e mínima mudança no nosso código ainda é possível,
graças ao sistema de módulos de JavaScript. Observe que o módulo
`app.js` é adicionado duas vezes: uma primeira vez através da tag
`script` no código html e uma segunda vez, através do `import` no
código de `app.js`. De fato, apenas este último é necessário.
Isso é possível porque o sistema de módulos de JavaScript permite
que um módulo referencie outro e isso implique em sua carga a
partir do servidor (ou de qualquer origem que tenha). Assim, o
`index.html` fica menos poluído e o comportamente é exatamente o
que se espera. Eis o novo código do final do `body` do arquivo
`index.html`.

```html
  ...

  <script src="app.js"></script>
</body>
```

### Discussão final

Embora seja um app minúsculo, é fácil ver que o código final é
bem mais interessante, do ponte de vista de Engenharia de
Software, que a primeira versão. Nele, temos clara separação do
_model_ (`imc.js`) do _controller_ (`app.js`) e da _view_
(`index.html` + `estilo.css`). Alguns, contudo, ainda poderiam
argumentar que a função `atualize_imc()` devesse ser considerada
parte da _view_. Nesse caso, nada impede que se use um objeto ou
mesmo o sistema de módulos de JavaScript para implementar uma
separação mais significativa. Isso fica a critério de cada equipe
ou desenvolvedor. O que importa, contudo, é que a separação agora
é mais concreta e reflete os princípios de MVC.

## Exercícios

1. Escreva uma pequena aplicação que faça cálculo de câmbio de
   reais para dolares americanos e euros. O _frontend_ deve exibir
   três _inputs_, sendo um para cada tipo de moeda. Quando o
   usuário digitar em qualquer um dos três, os valores dos outros
   dois inputs deve ser alterado automaticamente para refletir a
   conversão. Use o modelo MVC para construir a aplicação ao
   estilo do que foi a última versão do app do IMC. Use
   constantes para o câmbio.

2. Evolua o app de câmbio da questão anterior para que os valores
   de câmbio sejam lidos de um _endpoint_ no servidor que
   fornecerá os dados em JSON. Use a [API
   Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
   para isso.

3. Faça o deploy de sua aplicação para sua página pessoal no LCC.
   O endereço de seu app deve ser no formato:
   `http://kirk.lcc.ufcg.edu.br/~seulogin/cambio` onde `seulogin`
   será trocado por _seu login_ no LCC.
