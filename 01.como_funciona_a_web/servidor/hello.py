import socket
import sys

# porta default 9090 (ou o que vier na linha de comando)
porta = int(sys.argv[1] if len(sys.argv) > 1 else 9090)

# cria o socket
s = socket.socket()
s.bind(('localhost', porta))

# faz o socket ouvir
# … é isto que o caracteriza como um servidor
s.listen()

# aguarda uma conexão
print('Aguardando conexões na porta %s...' % porta)
conexao, endereco = s.accept()

# agora já temos uma conexão
print('Conexão estabelecida de %s:%s' % endereco)
conexao.send('Hello, World!\n'.encode('utf-8'))

# é importante fechar os sockets
s.close()
conexao.close()
