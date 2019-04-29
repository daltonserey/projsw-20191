# Servidor de eco

> Importante: Este código deve ser executado usando **Python 3**.

Para executar o servidor, digite:

```
$ python3 echo.py
```

Deixe o servidor executando e, em seguida, em outro terminal
conecte-se ao servidor, usando `netcat` (`nc` no mac). Use o
seguinte comando:

```
$ netcat localhost 9090
```

Observe que `9090` é a porta default usada pelo servidor. Se você
quiser (ou precisar) rodar o servidor em outra porta, adicione ao
comando de execução do servidor um último argumento, indicando a
porta a ser usada.

## Comportamento esperado

O servidor deve simplesmente ecoar tudo que receber pelo socket.
Isso significa que, do lado cliente, você deve receber e ver uma
cópia de cada mensagem enviada para o servidor. Para terminar,
digite Ctrl-D (EOF).
