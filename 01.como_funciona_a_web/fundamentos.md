---
title: Fundamentos Web
---
# Fundamentos: Processos, Sockets e Threads

O objetivo deste roteiro é que você tenha algum contato com
processos, sockets, conexões internet e threads, enquanto
conceitos fundamentais para uma plena compreensão da web. Para
isso, neste roteiro, vamos experimentar esses conceitos usando as
APIs da biblioteca padrão de Python 3. Ao final, terá os
elementos necessários para construir, por conta própria, um
minúsculo servidor http.


## Python

Neste roteiro, utilizaremos Python 3. Observe, contudo, que as
mesmas funcionalidades poderiam ser escritas em praticamente
qualquer linguagem moderna: C, C++, Java, etc (muito embora, a
API possa mudar). Em nosso caso, usaremos o módulo `sockets` de
Python.

## Clientes

Usaremos, inicialmente, o cliente universal para testar e
desenvolver servidores é o `netcat` (você também poderia usar o
histórico `telnet`). Contudo, quando progredirmos para uma versão
minimamente funcional de servidor http, você deve passar a
utilizar um _browser_. Observe que _browsers_ são clientes web
universais: são capazes de emitir _requests_ e interpretar
_responses_ http.

## Sockets em Python

A escrita de um servidor que usa sockets python deve seguir um
roteiro bem estabelecido de chamadas à API. Os métodos invocados
são: 

- `socket()` para instanciar um novo _socket_;
- `bind()` para ligar o socket ao endereço e porta desejados;
- `listen()` para iniciar o servidor e deixá-lo “ouvindo”
  conexões
- `accept()` para “aceitar” uma conexão iniciada e criar o socket
  de interação; e
- `close()` para fechar um conexão, após concluir seu uso.

Sugiro uma lida rápida na [documentação de
sockets](https://docs.python.org/3/library/socket.html). Retorne
a ela sempre que tiver dúvidas do que está ocorrendo e de como as
coisas funcionam.

## TST

Para facilitar a distribuição de atividades e exemplos do curso,
vamos usar o [tst](https://github.com/daltonserey/tst) (na
verdade, também me será útil para testar uma nova versão do tst
que independe do antigo tst-online). Para isso, desinstalate sua
versão antiga do tst:

```
$ mv ~/.tst ~/.tst-old
```

E, em seguida, siga as instruções do site e instale o tst em suas
contas pessoais onde pretenda estudar (lembre, use ambientes
Linux ou Mac). Em seguida, faça um teste do `tst`. Faça o
download da atividade `hello`, digitando o seguinte comando em um
terminal):

```
tst checkout hello
```

> IMPORTANTE: para os que ainda se lembram do _workflow_ do tst
> em Programação 1, observe que você não precisa (nem deve) fazer
> login, já que as atividades não são armazenadas no servidor.
> Elas estão públicas na web.

O comando acima irá criar um diretório `hello` contendo os
arquivos necessários para a atividade. Como não se trata de um
servidor fechado, nestas atividades também não há como fazer
commits. A ideia é apenas que você possa baixar os exemplos e
fazer as atividades. Várias atividades da disciplina serão
distribuídas desta forma.

### Cadastre o site da disciplina

O site de onde o tst baixou o exemplo acima é o site demo do tst.
Para que você possa baixar atividades da disciplina, deve editar
o arquivo `~/.tst/config.yaml` e adicionar os dados do site de
nossa disciplina. Para isso, adicione uma site, contendo os
seguintes dados:

```
sites:
- name: projsw
  url: http://www.dsc.ufcg.edu.br/~dalton/projsw/tst

- name: demo
  url: https://raw.githubusercontent.com/daltonserey/tst-demo/master
```

Observe que o site `demo` já existirá no arquivo. Assim, basta
que você adicione os dados do site `projsw` acima. Importante:
você deve colocar o novo site antes do site `demo`. Isso garante
que o `tst` irá buscar as atividades em nosso site antes.

Uma vez configurado o tst, você já poderá baixar os exemplos e
exercícios iniciais desta aula, digitando:

```
$ tst checkout sockets
```

Isso deve criar o diretório `sockets` contendo os vários exemplos
que usaremos no restante deste roteiro.


## _Hello, World!_ de novo...

Para facilitar o entendimento, segue um servidor mínimo escrito
em python. A única coisa que ele faz é aceitar uma conexão e
responder 'Hello, World!' através da conexão estabelecida. 

### Sequência de passos

1. Entre no diretório `sockets/hello`. Leia o código antes de
   executá-lo e tente entender seu funcionamento. É bastante
   simples e intuitivo (além de ter comentários que o explicam
   passo a passo).

2. Para executar o servidor, digite `python3 hello.py`. Observe
   que o servidor é iniciado e o código bloqueia na linha
   referente ao `accept()`, aguardando por uma nova conexão.

3. Em outro shell, use o `netcat` para contactar seu
   servidor, com o comando `netcat localhost 9090` (use `nc` se
   estiver em um Mac). Observe que ao estabelecer a conexão, o
   servidor _desbloqueia_ a execução e continua a execução depois
   da linha do `accept()`.

   > Observe que o retorno de `accept` é um par formado por um
   > _socket_ e um segundo par (tupla) a que chamamos de
   > `endereco` no código. Esse par, por sua vez, é composto de
   > um endereço IP e a porta usada para a conexão.

4. Tente executar o servidor novamente. É bastante provável (mas
   não 100% garantido) que a inicialização do servidor não tenha
   funcionado, porque o endereço já está em uso (mensagem
   `OSError: [Errno 48] Address already in use`). Para fazer o
   servidor funcionar imediatamente, adicione um número de porta
   diferente na linha de comando (lembre, acima de 1024, para
   usar uma porta não reservada).
 
   > Este erro reforça a observação de que um socket é, na
   > verdade, um recurso provido pelo sistema operacional... e
   > que, neste caso, ainda ele não foi liberado. Se você repetir
   > a operação alguns segundos depois é provável que volte a
   > funcionar, já que o sistema operacional terá liberado o uso
   > da porta.

Antes de prosseguir, releia o código do servidor. Observe que há
dois objetos que são _sockets_. Um é o socket do servidor
propriamente dito que é onde ele ouve pedidos de conexão (`s` no
código) e o outro é o socket da conexão propriamente dita
(`conexao` no código). Observe ainda que ambos os _sockets_ devem
ser fechados depois de usados. Por isso, é comum usarmos o `with`
para usarmos sockets. O arquivo `hello2.py` mostra um servidor
com a mesma funcionalidade, mas em que uso o `with` para garantir
que o socket é fechado.

> Observe que o uso de _sockets_ aqui é meramente para permitir a
> compreensão do mecanismo e não das melhores práticas de
> _sockets_ em Python. Há muito mais opções e detalhes que é
> importante conhecer para construir um servidor profissional em
> python.

## _Echo Server_

Um segundo exemplo clássico do aprendizado de _sockets_ é o que
se chama de _servidor de eco_. Trata-se de um servidor que apenas
devolve (ecoa) uma cópia de todas as mensagens recebidas para o
processo que o contactou.  Para implementá-lo, precisamos saber
apenas dois métodos adicionais de _sockets_: 

- `recv()` para receber dados do _socket_ (bloqueante)
- `sendall()` para enviar dados pelo _socket_ (bloqueante)

> Um socket python pode ser configurado para permitir o envio e a
> recepção de dados em modo _não bloqueante_. Em nosso exemplo,
> usaremos apenas o modo bloqueante (que é o _default_).

1. Entre no diretório `sockets/echo`. Leia o código antes de
   executá-lo e tente entender seu funcionamento. É bastante
   simples e intuitivo. Desta vez, não há comentários, mas
   entendo que é suficientemente auto-explicativo.

2. Para executar o servidor, digite `python3 echo.py`. Observe
   que o servidor é iniciado e que, mais uma vez, o código
   bloqueia na linha referente ao `accept()`, aguardando por uma
   nova conexão.

3. Em outro shell, use o `netcat` para contactar seu servidor,
   com o comando `netcat localhost 9090` (use `nc` se estiver em
   um Mac). Escreva mensagens no cliente (no _netcat_) e observe
   que a cada `Enter` as mensagens são enviadas ao servidor. O
   servidor, por sua vez, as recebe, imprime (no terminal do
   servidor) e as envia de volta para o cliente.

   > Observe que o método `recv()` tem o valor 4096 como
   > parâmetro. Varie o seu valor para 1 e experimente o servidor
   > dessa forma, para entender o seu significado. Em seguida,
   > leia a documentação de
   > [recv](https://docs.python.org/3/library/socket.html#socket.socket.recv).

4. Para encerrar a comunicação, observe que o servidor testa se
   `not mensagem` é verdadeiro o que só é verdade quando `recv`
   retornar uma _string_ vazia de bytes (`b''` em python).
   Observe ainda que ao digitar apenas `<Enter>` do lado cliente,
   um `\n` ainda é enviado para o servidor o que não termina sua
   execução. Para concluir o uso do `netcat` indique o fim do
   arquivo com um `EOF` (Ctrl-D em linux e mac ou Ctrl-Z em
   Windows).

> Exercício 1. Sem copiar e colar o código de nenhum dos dois
> servidores vistos, tente criar um servidor chamado `
> `echocaps.py` que ecoa mensagens recebidas do cliente em letras
> maiúsculas. Tente apenas relembrar os aspectos principais do
> código. É bastante provável que você não lembre de alguns
> detalhes. Depois de fazer uma tentativa inicial, releia os
> servidores e complemente o seu para fazê-lo funcionar
> corretamente.

> Exercício 2. Execute o servidor em uma máquina diferente (via
> ssh, por exemplo). Em seguida, contacte o servidor a partir de
> sua máquina de origem (ou de outra qualquer). Observe que você
> você deve usar uma porta liberada para uso nas redes pelas
> quais os dados irão trafegar. Você vai precisar usar
> `socket.gethostbyname(socket.gethostname())` para conseguir o
> IP do servidor. Observe que esse é o IP local, não o público.


## Threads em Python

Em sua forma básica, cada processo tem uma única _thread_ de
execução. Isto é, uma única linha do código está sendo executada
em qualquer dado momento da _vida_ do processo. Contudo, a
maioria dos sistemas operacionais permite que um único processo
tenha mais de uma _thread_ executando “simultaneamente”. Na
prática, o sistema operacional irá fazer _multi-tasking_ entre as
threads de forma semelhante à que já faz com processos. Ou seja,
em um sistema com uma única CPU apenas um thread estará
efetivamente executando a cada instante de tempo. Como o sistema
operacional, contudo, alterna a execução entre as _threads_ com
frequência, a impressão do usuário é a de que eleas executam de
forma efetivamente ao mesmo tempo e de forma independente.

Servidores http são tipicamente multi-threaded. Isso permite que
o servidor interaja com uma conexão existente, enquanto permanece
ouvindo uma porta à espera de novas conexões. Da mesma forma,
permite até que múltiplas conexões de diferentes clientes sejam
atendidas simultaneamente. Nesta seção veremos uma brevíssima
introdução à API de _threads_ de Python 3.

> Relembre que o objetivo deste material não é o de se aprofundar
> nas tecnologias específicas de Python, mas o de lhe oferecer
> uma experiência prática com os conceitos importantes para a
> compreensão da arquitetura web. Tanto _sockets_, quanto
> _threads_ são tecnologias com muito mais a se considerar para
> um uso profissional. Para nossos propósitos, contudo, uma breve
> introdução é suficiente.

Python e outras linguagens de alto nível permitem escrever código
_multi-threaded_ com bastante facilidade. Com Python 3, usaremos
o módulo `threading` e, em particular, o objeto/classe `Thread`
nele oferecido. Esse objeto pode ser usado de duas formas:

1. Pode-se instanciar um objeto diretamente de `Thread`, passando
   como argumento uma função como parâmetro e invocando
   `start()`. Quando `start()` é invocado, uma nova _thread_ é
   criada junto ao sistema operacional e a função passada como
   parâmetro é definida como o código a ser executado pela
   _thread_.

2. Pode-se extender a classe `Thread` com uma classe que tenha o
   método `run()`. Em seguida, se instancia a classe e se invoca
   o método `start()` (herdado de `Thread`) nos objetos
   instanciados.


### Contadores em Threads

Para entendermos melhor o conceito, usaremos um exemplo bastante
simples: contadores em _threads_. A ideia é que possamos criar
contadores que tenham seu próprio intervalo de atualização e que
funcionem independentemente do restante do programa.

1. Para isso, baixe a atividade `threads` pelo tst. Use o comando
`tst checkout threads`. Lembre-se que isso irá criar um diretório
dentro do diretório em que o comando for executado. Assim,
escolha antes onde quer que a atividade seja gravada.

2. Entre no diretório `threads` e antes de executar o programa,
   leia o código do script `mthreads.py`. Tente entender e prever
   como irá funcionar. Explique o que você acha que irá ver na
   saída do programa, quando ele for executado.

3.  Execute o programa `mthreads.py`. Para isso, use o comando
    `python3 mthreads.py`. O programa criará dois contadores que
    funcionam “simultaneamente” (em _threads_) e cada um com seu
    próprio intervalo de atualização.

   > **Observe** a relação de ordem entre as mensagens impressas
   > e a posição dos respectivos `print`s no código. Perceba que
   > a ordem pode não ser intuitiva. Por exemplo, por que a
   > mensagem `Fim` não aparece ao fim de toda a execução?

4. Observe que `mthreads.py` foi escrita usando um estilo
   funcional (não há classes no código). As threads são criadas
   (instanciadas) diretamente de `Thread` e imediatamente
   iniciadas por `start()`. 

5. O script `mthreads2.py` tem o mesmo efeito que o primeiro
   script. A diferença é o estilo usado. Neste caso, usamos algo
   mais orientado a objetos: extendemos a classe `Thread` e
   implementamos o método `run()`. Cabe a você escolher qual o
   estilo mais apropriado para o problema em questão.

> Exercício 3. Nada impede instanciar e iniciar as _threads_ em
> momentos diferentes. Para isso, teríamos que ter feito uma
> atribuição na instanciação da _thread_ e depois ter usado o
> método `start()`.

## Mini chat

> Exercício 4. Escreva um mini chat, tal como especificado
> abaixo.

Para este exercício você precisa apenas de um servidor, porque
como cliente usaremos o `netcat`. A ideia para permitir que
vários usuários troquem mensagens em um chat é conectar todos os
clientes a um servidor central. Dessa forma, cada mensagem deve
ser enviada de um cliente ao servidor e este a repassará para
todos os clientes conectados.

Seu servidor deve ter uma _thread_ principal responsável por
“escutar” pedidos de conexão e por instanciar e inicializar uma
nova _thread_ para cada cliente conectado. A função a ser
executada pela _thread_ deve adicionar o socket a uma estrutura
de dados (uma lista ou dicionário) e deve ficar à espera por
mensagens enviadas pelo cliente. A cada nova mensagem recebida,
deve enviar uma cópia da mensagem para cada conexão presente na
estrutura de dados.

O comando/mensagem especial `:bye` deve poder ser usado por
qualquer cliente/usuário para desconectar-se do chat. Quando um
`:bye` for recebido, o socket do cliente é fechado, uma mensagem
de saída é enviada para todos os usuários, o seu _socket_ é
retirado da estrutura de dados e a _thread_ correspondente é
encerrada.
