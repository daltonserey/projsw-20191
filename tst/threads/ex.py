import time
import sys
from threading import Thread

def conta():
    num = 0
    while num < 5:
        time.sleep(1)
        num += 1
    print "Sinto muito, tempo esgotado."
    sys.exit()

Thread(target=conta).start()
nome = raw_input("Qual seu nome?")
print("Oi, %s" % nome)
