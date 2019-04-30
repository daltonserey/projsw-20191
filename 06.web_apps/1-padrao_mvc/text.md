# MVC

## O Padrão Arquitetural MVC

MVC (_Model_, _View_, _Controller_) é um padrão arquitetural
usado para o desenvolvimento de aplicações e suas interfaces com
o usuário. Compreender o padrão MVC é fundamental para qualquer
desenvolvedor, dado que não apenas aplicações _web_, mas também
aplicações _mobile_ e _desktop_ têm sido historicamente
desenvolvidas com base nesse padrão. 

O padrão consiste em decompor a aplicação em três componentes,
chamados _model_, _view_ e _controller_, e em disciplinar a
interação entre eles. Seu objetivo é promover o desacoplamento
das partes envolvidas e permitir seu desenvolvimento de forma
independente e paralela.

Neste roteiro, estudaremos o padrão arquitetural MVC e sua
aplicação no desenvolvimento de _frontends web_, através de um
exemplo prático. Nesta primeira parte veremos os conceitos de
MVC. Na segunda, você será conduzido na construção de um exemplo
de aplicação baseada no padrão MVC.

### Padrões arquiteturais X padrões de _design_

Antes de iniciarmos, é importante destacarmos a diferença entre
padrões arquiteturais e padrões de _design_. Em padrões
arquiteturais, o foco não é no nível de classes ou funções, como
ocorre nos padrões de _design_ e, sim, nos grandes componentes ou
módulos do sistema. Um componente é um conjunto de funções,
classes, dados e até mesmo processos do sistema. Os padrões
arquiteturais, portanto, não expressam detalhes de como classes e
objetos serão interconectados, mas como o sistema é entendido e
decomposto em grandes partes e como essas partes se relacionam.
Padrões arquiteturais operam em um nível de abstração bem maior
que padrões de _design_.  Por um lado isso permite que os padrões
se apliquem a um número maior de linguagens e tecnologias. Por
outro, implica que sua concretização é muito mais aberta a
interpretações e variações do que padrões de _design_.

> Observação. As linguagens que usamos não provêem mecanismos
> explícitos para a decomposição em componentes no sentido
> arquitetural da palavra. Por esse motivo, nem sempre há
> registro explícito e absoluto do mapeamento dos elementos aos
> componentes a que pertencem. Nem mesmo a decomposição física
> (em arquivos e diretórios) pode ser tomada como registro do
> mapeamento arquitetural de um sistema. São diversos os casos em
> que elementos colocados nos mesmos arquivos ou diretórios
> pertencem a diferentes componentes arquiteturais. Bem como há
> casos em que elementos de um mesmo componente são colocados em
> diferentes arquivos e/ou diretórios. Nesses casos, é importante
> que o mapeamento arquitetural seja registrado/mantido de alguma
> outra forma nos artefatos do sistema (padrões de nomeação,
> tags, tipos de serviços fornecidos, etc) ou em documentação
> complementar. Na prática, infelizmente, é comum que não haja
> qualquer registro formal.

### Os componentes do MVC

Os três componentes de MVC são: o _model_, a _view_ e o
_controller_. A ideia central do padrão é que a lógica central do
domínio da aplicação seja implementada pelo _model_ e que a
_view_ e o _controller_ implementem a interface com o usuário.
Vejamos como cada um dos componentes pode ser definido e como
deve ser sua interação com os outros dois.

> Observação. Quando tratamos do tema de forma conceitual, como
> é o caso aqui, é comum nos referirmos a cada um dos componentes
> no singular: o _model_, a _view_, o _controller_. Na prática,
> contudo, não é raro que cada um dos componentes do MVC consista
> em um conjunto de elementos que podem ser, independentemente,
> chamados de _models_, _views_ e _controllers_.

*O _model_* é o componente principal da aplicação. Ele reúne
todos os elementos necessários para criar e gerenciar os dados e
toda a lógica _de negócio_ da aplicação. O _model_ deve ser
completamente independente da interface com o usuário. Isso
permite que o componente seja utilizado em diferentes aplicações
que explorem a mesma lógica, mas que tenham diferentes interfaces
com o usuário.

*A _view_* é o componente que provê a representação visual da
informação para o usuário. São parte da _view_ todos os elementos
que produzem ou manipulam visualizações.

*O _Controller_* é o componente responsável por interpretar
comandos do usuário e transformá-los em comandos para a _view_
e/ou para o _model_. O _controller_ cria e manipula os dados da
aplicação através dos serviços providos pelo _model_ e controla a
_view_ da aplicação, através dos serviços providos pela _view_.

### Regras de interação dos componentes MVC

As regras de interação entre os componentes no padrão MVC são,
tipicamente, expressas através de uma figura abaixo como essa
abaixo. Nela, as setas cheias representam _dependências
permitidas_ de um componente em relação a outro. Elas indicam que
o componente de origem da seta _pode depender_ do componente no
destino da seta, seja instanciando objetos, invocando funções ou
usando serviços. As setas tracejadas, por outro lado, indicam que
o componente de origem _notifica_ o componente de destino da
seta, em certas condições ou na ocorrência de eventos.
Tipicamente, essa relação é implementada através de padrões de
_design_ semelhantes ao _publish-subscribe_.

![O Padrão Arquitetural MVC](https://upload.wikimedia.org/wikipedia/commons/b/b5/ModelViewControllerDiagram2.svg "O Padrão Arquitetural MVC")

Analise a figura e perceba que ela ilustra que o _controller_
pode depender tanto do _model_, quanto da _view_ (confira as
setas cheias que saem do _controller_). E que a _view_ pode
notificar o _controller_ sobre eventos e/ou mudanças que ocorram
nela (veja a seta tracejada da _view_ para o _controller_).
Tipicamente, os eventos que ocorrem na _view_ são os produzidos
pelo usuário em sua interação com a interface. A figura mostra
ainda que tanto o _controller_ quanto a _view_ podem depender do
_model_ e, finalmente, que o _model_ não deve depender de nenhum
dos dois (não há setas cheias saindo do _model_). Finalmente,
vê-se que o _model_ também pode notificar a _view_ sobre eventos
e/ou condições ocorridas dentro do próprio _model_.

### MVC e aplicações _web_

Aplicações _web_ popularizaram o uso do padrão MVC. O padrão,
contudo, já era usado para desenvolver aplicações _desktop_,
aplicações _cliente-servidor_, aplicações _mobile_ e até mesmo
aplicações de linha de comando. A popularização da _web_,
contudo, colocou o padrão em um novo patamar de relevância e
popularidade. Praticamente todos os sites com conteúdo dinâmico
existentes usam, em última instância, o padrão MVC ou alguma
variação dele.

Perceba, por exemplo, que em um _frontend web_, o _DOM_ e sua
renderização pelo _browser_ podem ser vistos como a _view_ da
aplicação. Perceba ainda que os elementos interativos de html
renderizados na _view_ permitem que o usuário interaja com a
interface, seja movendo ou clicando o _mouse_ nos elementos ou
digitando em algum _input_. E que o _browser_ captura esses
eventos e os repassa para funções JavaScript que atuam como o
_controller_ da aplicação. Essas funções, por sua vez, alteram
valores de objetos na memória que são o _model_ da aplicação.
Fechando o círculo, o _DOM_ (a _view_) é construída a partir dos
objetos na memória (do _model_) da aplicação. A aplicação
explícita do padrão MVC ajuda a melhor compreender o papel de
cada parte de um _frontend_.

Do lado _backend_ (servidor) também é fácil perceber o uso do
padrão MVC. O típico _backend_ moderno é implementado como o que
chamamos de uma API REST JSON. Na prática, trata-se de um
conjunto de _handlers_ que recebem requisições HTTP e que
produzem uma _visualização_ JSON de algum _modelo_ armazenado no
servidor (tipicamente, em um banco de dados). Em última
instância, os _handlers_ podem ser vistos como _controllers_ e os
dados armazenados como _models_. Para completar a figura, observe
que muitos servidores modernos mantêm conexões HTTP entre cliente
e servidor para que o servidor possa notificar o cliente sobre
mudanças de estado e/ou ocorrências de eventos, tal como previsto
pelo padrão MVC.

> Se você achar tudo isso abstrato, não se preocupe. De fato, o
> padrão é abstrato. Nesse caso, tente lembrar de uma única regra
> do padrão MVC: que _o model não depende nem da view, nem do
> controller_. Na prática, isso significa que o _model_ *deve*
> ser escrito sem nenhuma dependência estrutural dos outros dois
> módulos. Consegue lembrar de uma segunda regra? Então lembre
> desta: regras de negócio jamais devem ser colocadas na
> interface do usuário (entenda-se, no _controller_ e na _view_).
> Somente no _model_.

### Responda

Depois de ler ao texto acima, você deveria saber responder às
perguntas abaixo. Caso você não se sinta confortável, faça uma
pesquisa sobre o tema antes de respondê-las.

1. O que significam as letras do acrônimo MVC?

2. O que é o _model_?

3. O que é a _view_?

4. O que é o _controller_?

5. Qual a diferença entre um padrão de _design_ e um padrão
   _arquitetural_?

6. Quais componentes do MVC formam a _interface com o usuário_ da
   aplicação?

7. Quais os benefícios de o _model_ não depender da _view_ e do
   _controller_?

8. Em alguns desenhos do padrão MVC, se coloca uma seta entre o
   _model_ e o _view_. Em outros também se coloca uma seta entre
   o _model_ e o _controller_. No desenho apresentado aqui,
   optamos por desenhar essas setas de forma tracejada. O que
   essas relações indicam? Podemos dizer que nesses desenhos se
   está dizendo que o _model_ depende da _view_ e do
   _controller_?

9. Podemos dizer que o padrão MVC promove a colocação de lógica
   de negócio no _model_? Por quê?

## Próxima atividade

[Parte 2: IMC Padrao MVC](../2-imc_padrao_mvc/text.md)
