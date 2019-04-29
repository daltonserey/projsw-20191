# Introdução a Threads com Python

> Importante: Este código deve ser executado usando **Python 3**.

O script `contadores.py` permite criar múltiplos contadores
regressivos que funcionam “simultaneamente” e com intervalos
próprios. Para executar o script, digite:

```
$ python3 mthreads.py
```

## Comportamento esperado

Observe que dois contadores diferentes estarão em funcionamento.
Um nomeado `"5 Segundos"` conta de 5 abaixo a cada 1 segundo.  E
o segundo contador, nomeado simplesmente de `"A"` (para facilitar
a identificação na saída do programa) contará regressivamente de
15 abaixo, mas em intervalos de 300ms.

O script `mthreads2.py` faz exatamente o mesmo, mas usa o estilo
baseado em classes ao invés de funções para criar as _threads_.

> Sugestão: para entender melhor o funcionamento do código, mude
> os contadores criados.
