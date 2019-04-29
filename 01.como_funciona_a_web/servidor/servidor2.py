# coding: utf-8
import socket
import sys
import thread

def on_new_client(clientsocket, endereco):
    while True:
        msg = clientsocket.recv(1024)
        if msg.rstrip() == 'bye':
            print 'Cliente em %s:%s desconectado' % endereco
            break
        print "[%s:%s] %s" % (endereco[0], endereco[1], msg.rstrip())
        clientsocket.send(msg) 
    clientsocket.close()

porta = int(sys.argv[1] if len(sys.argv) > 1 else 9090)
s = socket.socket()
s.bind(('', porta))

s.listen(5)

while True:
    print 'Esperando conexões na porta %s...' % porta
    conexao, endereco = s.accept()
    print 'Cliente em %s:%s' % endereco
    thread.start_new_thread(on_new_client, (conexao, endereco))

s.close()
