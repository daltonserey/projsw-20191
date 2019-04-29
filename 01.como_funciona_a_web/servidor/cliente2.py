import sys
import socket

server_address = ('127.0.0.1', 9090)
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.connect(server_address)

while True:
    request = sys.stdin.read()
    server.send(request)

response = ''
while True:
    recv = server.recv(1024)
    if not recv: break
    response += recv 

print response
server.close()
