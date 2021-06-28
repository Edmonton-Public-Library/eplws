# Learning Pass
The https directory is intended to contain the certificate and key needed to use SSL and HTTPS in this application.

## HTTPS and SSL Certificates
As of February 2021 you can create a self-signed certificate and key with the following.

<pre>
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
Generating a RSA private key
......................................+++++
...................................+++++
writing new private key to 'key.pem'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:CA
State or Province Name (full name) [Some-State]:Ontario
Locality Name (eg, city) []:Waterloo
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Dev-ILS
Organizational Unit Name (eg, section) []:ITS
Common Name (e.g. server FQDN or YOUR name) []:localhost
Email Address []:someone@example.com
</pre>

Note the required changes for you site.