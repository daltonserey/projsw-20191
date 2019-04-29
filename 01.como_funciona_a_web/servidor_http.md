---
title: Um mini servidor HTTP
---
# Um minúsculo servidor HTTP

Neste roteiro, escreveremos um pequeno servidor HTTP que servirá
alguns dados estáticos lidos do sistema de arvivos, bem como
alguns dados dinâmicos. O servidor terá poucos recursos e
reconhecerá pouquíssimos verbos em cada um deles. Mas deve ser o
suficiente, para melhorar seu entendimento do funcionamento do
protocolo e dos dois principais componentes da web: clientes e
servidores.

## Servidor Base

O nosso primeiro servidor deve apenas atender a um `GET` no
recurso base `/`. A resposta será uma mensagem simples em texto
pleno (mime type `text/plain`). Além disso, nesta primeira
versão, ele não será sequer multi-threaded. O servidor deve
apenas atender a uma conexão TCP e aceitar um _request_ mínimo no
seguinte formato:

```
GET / HTTP/1.1
Host: www.example.com
Connection: close

```

Observe dois detalhes do _request_ acima: i) ao final de cada
linha, o protocolo http exige o uso de `\r\n`, mas nosso servidor
irá tolerar o uso de apenas `\n`, embora tenha que aceitar o
`\r\n` também (veja que Python facilita sua vida nesse sentido);
ii) ao final dos _headers_ é obrigatória a presença de uma linha
em branco (ou seja, dois grupos de `\r\n` seguidos). Depois
disso, tudo o que se seguir é o corpo da mensagem. 

Escreva o código do servidor que receba uma conexão HTTP e que
dado um _request_ qualquer separe a mensagem em todas as partes
que compõem o _request_: i) verbo, recurso, protocolo (os três
obtidos da primeira linha da mensagem e representados em Python
por strings); ii) os _headers_ representados por um dicionário
Python em que chaves são os _nomes_ e os valores são os _valores_
dos _headers_; e iii) o corpo da mensagem, representado também
como uma string Python. Todos os dados devem ser estruturados em
um objeto ou em um simples dicionário Python. Escreva o código
que faz essa decomposição em uma função chamada
`parse_request(mensagem)`que recebe a mensagem recebida via
socket. Se a função não “conseguir” fazer o parsing, deve
retornar `None` ou lançar uma exceção, de forma que o código
cliente saiba que a mensagem está mal formada ou não é HTTP.

O código principal deve fazer o _parsing_ da mensagem usando a
função acima descrita. Com o objeto retornado, o código principal
deve verificar se está tudo ok. Primeiro, o verbo deve ser `GET`,
segundo o recurso deve ser `/` (o protocolo deve ser `HTTP/1.1`,
mas nós vamos simplesmente ignorá-lo). Para casos diferentes
disso, o servidor deve gerar _responses_ de erro. O conteúdo da
mensagem, contudo, pode variar. Se o método não for `GET`, o
_response_ deve ter [_status
code_](https://www.restapitutorial.com/httpstatuscodes.html) 405,
para indicar que aquele método não é permitido. E se o recurso
não for `/` o _response_ deve ter _status code_ 404, indicando
que o recurso não existe ali. Se, contudo, esses dados estiverem
corretos, vamos produzir um _response_ com _status code_ 200,
para indicar que o recurso existe naquele servidor e que tudo
ocorreu bem. O corpo do _response_ no caso de tudo estar ok deve
ser simplesmente uma mensagem do tipo 

```
Este é o conteúdo do recurso "/" neste servidor.
```

Observe que esse texto contém caracteres acentuados. Logo, é
importante adicionar o _header_ apropriado na resposta. Neste
caso, trata-se do _header_ `Content-type` que deve ter o valor
`text/html; charset=utf-8`. Observe que o valor indica tanto o
mime type (`text/html`), quanto o conjunto de caracteres que,
neste caso, é `utf-8`.

### Testes

Para testar esse servidor, faça a conexão inicialmente pelo
`netcat` (ou `nc` no Mac). Em seguida, conecte-se usando um
_browser_. Lembre de colocar o endereço, incluindo a porta. Mude
a url e veja se o servidor responde corretamente quando um
recurso inexistente é pedido. Também veja se os caracteres são
devidamente mostrados pelo _browser_, quando o único recurso
existente é visualizado. Lembre-se, isso depende da presença
correta do _header_ acima mencionado.


## Servidor de arquivos

Evolua o servidor para que ele busque arquivos armazenados no
diretório em que foi executado com o mesmo nome do recurso. Se o
arquivo existir, leia o arquivo e retorne seu conteúdo no corpo
do _response_. Se não existir, retorne um 404. Para testar,
inclua alguns arquivos de texto simples no diretório e veja se
consegue visualizar seu conteúdo pelo _browser_. Teste também com
arquivos com extensão `.html`. Provavelmente, funcionará, mas não
da forma que você espera... o html pode não ser devidamente
interpretado pelo _browser_ por causa do _header_ `Content-type`.

Evolua novamente seu servidor. Agora, se o arquivo enviado tiver
extensão `.html`, faça com que o `Content-type` seja apropriado
para html (faça uma pesquisa na internet para descobrir o mim
type apropriado).
