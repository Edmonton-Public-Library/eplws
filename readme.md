
# EPL Web Services
This [NodeJS](https://nodejs.org/en/) application runs EPL-specific services and scripts.

## License
Copyright 2021 Andrew Nisbet and Edmonton Public Library

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

---
# Installation
There is a plan to Docker-ize this but that work is out of scope for the current version of the project. That being said, here are the instructions for installing EPL's web services.
1. Ensure a recent version of [NodeJS is installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Create a directory where the server will live (```$EPLWS_HOME``` from here on).
3. Clone the [eplws repo](https://github.com/Edmonton-Public-Library/eplws) in ```$EPLWS_HOME```. If you install from a downloaded zip, the install directory will be `eplws-main`. I may refer to it as the project root as well.
4. Install [dependencies](#eplws-dependencies) ```cd $EPLWS_HOME; npm install```.
5. Create and Install certificates in `https/` directory, if using wild-card certs, or [here](#http-and-https) if the server has domain certificates.
6. Create a [```.env```](#dot-env) file in root directory (same directory as the `index.js` file). See here for an [example](#dot-env).
   1. Include and update `EPLWS_SSL_PRIVATE_KEY` and `EPLWS_SSL_CERTIFICATE` paths to either the `https/` directory for [wild-card certificates](#wild-card-certs) **or** the [domain certs](#domain-certs) for the server.
   2. Update `UPATH` and `PATH` for your system. There are reasonable values set in the [```.env```](#dot-env) file.
7. Update `config.js` with any changes to `httpPort`, `httpsPort`, and `envName`.
8. On Linux, create either a [`systemctl` service](#linux-service-setup) **or** run it with [non-admin privileges](#service-without-admin-privileges).
9.  [Start service](#linux-service-setup), diagnose issues, fix, repeat as required.

## Linux Service Setup
1. Create a [```eplws.service```](#example-service-file) file, as per this [example](#example-service-file).
2. Copy the ```eplws.service``` file to ```/etc/systemd/system/```. You will need to do this with ```sudo```.
3. Setup and start the service.
  1. ```sudo systemctl daemon-reload```
  1. ```sudo systemctl enable eplws```
  1. ```sudo systemctl start eplws```
  1. ```sudo systemctl status eplws```. Fix any reported issues and repeat as necessary.
4. Test with ```http://server:port/status```


# HTTPS
## Wild Card Certs
The server can run with either http or https. If https is desired, ensure SSL key and certificate are installed correctly, and up-to-date.

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

Once generated, you can place wildcard certs in any desired directory, but there is a `https` directory for them included in the project. See [here](#dot-env) for a complete example of the `.env` file.

See the README.md document in `https` directory for information on how to create wild-card certificates.

## Domain Certs
```javascript
EPLWS_SSL_PRIVATE_KEY=/etc/ssl/private/eplwild.key
EPLWS_SSL_CERTIFICATE=/etc/ssl/certs/eplwild.crt
```
## eplws Dependencies
At this time there are only two dependencies; [Winston](https://www.npmjs.com/package/winston) and [dotenv](https://www.npmjs.com/package/dotenv). This may change, but the documentation may not, so always reference the ```package.json``` for more information.

## Example Service File
```bash
[Unit]
Description=Runs eplws services

[Service]
ExecStart=/usr/bin/node /software/EDPL/Unicorn/EPLwork/eplws/index
Restart=always
User=ils
Group=ils
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=staging
WorkingDirectory=/software/EDPL/Unicorn/EPLwork/eplws

[Install]
WantedBy=multi-user.target
```

## Service Without Admin Privileges
A monstat script can be run by cron to monitor and restart the web service. Monstat stands for monitor status. It starts, restarts, and monitors services and will email if a service fails to start more than a specified number of times. [See here for more details](https://github.com/anisbet/monstat).

Over all [`monstat.sh`](https://github.com/anisbet/monstat) uses a commands file to run and then check if the process continues to run. The commands file can be called anything, and blank lines and lines that start with `#` are ignored.

```bash
# The node process below runs the epl web service and is scheduled.
# You can check with:
# crontab -l | grep monstat.sh 

/bin/node /home/EDPL/Unicorn/eplws/index.js

# You can add additional scripts here if desired.
```

The commands file is placed in `/software/EDPL/Unicorn/EPLwork/cronjobscripts/Monstat/` directory, but [`monstat.sh`](https://github.com/anisbet/monstat) can be run from anywhere.

Once set up [`monstat.sh`](https://github.com/anisbet/monstat) will start and ensure the web service is running.

# Dot ENV
Create a `.env` file in the project root directory and include the following variables.
```javascript
EPLWS_SSL_PRIVATE_KEY=/software/EDPL/Unicorn/EPLwork/eplws/eplws-main/https/key.pem
EPLWS_SSL_CERTIFICATE=/software/EDPL/Unicorn/EPLwork/eplws/eplws-main/https/cert.pem
/* Change these as required. UPATH for Symphony tools. */
UPATH=/software/EDPL/Unicorn/Bin:/software/EDPL/Unicorn/Bincustom
PATH=/software/EDPL/Unicorn/Bin:/software/EDPL/Unicorn/Bincustom:/usr/bin:/usr/sbin/:/bin:.
```

## TODO list  
[ ] Install without admin privileges instructions.  
[ ] Example start up script and Montor implementation.

