openssl req -sha256 -addext "subjectAltName = IP:192.168.0.100" -newkey rsa:4096 -nodes -keyout privkey.real.pem -x509 -days 730 -out fullchain.real.pem
ln -s privkey.real.pem privkey.pem
ln -s fullchain.real.pem fullchain.pem
