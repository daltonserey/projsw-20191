# coding: utf-8
import socket
import sys

porta = int(sys.argv[1] if len(sys.argv) > 1 else 9090)
s = socket.socket()
s.bind(('', porta))
s.listen()

print('Esperando conexões na porta %s...' % porta)
conexao, endereco = s.accept()
print('Conexão de %s:%s' % endereco)

while True:
    data = conexao.recv(1024).decode('utf-8')
    if data.strip() == 'bye': break
    print("> " + data.strip())
    conexao.send(data.encode('utf-8'))

conexao.close()
