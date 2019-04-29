from threading import Thread
import time

class Contador(Thread):
    def __init__(self, nome, segundos, intervalo):
        super(Contador, self).__init__()
        self.nome = nome
        self.segundos = segundos
        self.intervalo = intervalo

    def run(self):
        while self.segundos:
            print("%s: %s" % (self.nome, self.segundos))
            time.sleep(self.intervalo / 1000.0)
            self.segundos -= 1

print('Iniciando contador 1 ("5 Segundos")')
Contador("5 Segundos", 5, 1000).start()
print('Iniciando contador 2 ("A")')
Contador("A", 15, 300).start()
print('Fim')
