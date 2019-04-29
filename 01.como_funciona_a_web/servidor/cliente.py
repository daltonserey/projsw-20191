import sys
import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_address = ('www.dsc.ufcg.edu.br', 80)
s.connect(server_address)

request = sys.stdin.read()
equest = """
GET /~dalton/index.html HTTP/1.1
Host: www.dsc.ufcg.edu.br

"""
s.send(request)

response = ''
while True:
    recv = s.recv(1024)
    if not recv: break
    response += recv 

print response
s.close()
