
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
There is a plan to Docker-ize this but that work is out of scope for the current version of the project. That being said, here are the instructions for installing Learning Pass.
1. Ensure a recent version of [NodeJS is installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
1. Create a directory where the server will live (```$EPLWS_HOME``` from here on).
1. Clone the [eplws repo](https://github.com/Edmonton-Public-Library/eplws) in ```$EPLWS_HOME```.
1. Install [dependencies](#eplws-dependencies) ```cd $EPLWS_HOME; npm install```
1. Create a [```.env```](#dot-env) file as in this [example](#dot-env).
1. On Linux, [create a service to run epl web services](#linux-service-setup).
1. [Start service](#linux-service-setup), diagnose issues, fix, repeat as required.

## Linux Service Setup
1. Create a [```eplws.service```](#example-service-file) file, as per this [example](#example-service-file).
1. Copy the ```eplws.service``` file to ```/etc/systemd/system/```. You will need to do this with ```sudo```.
1. Setup and start the service.
  1. ```sudo systemctl daemon-reload```
  1. ```sudo systemctl enable eplws```
  1. ```sudo systemctl start eplws```
  1. ```sudo systemctl status eplws```. Fix any reported issues and repeat as necessary.
1. Test with ```http://server:port/status```


## HTTP and HTTPS
The server can run with either http or https. If https is desired, ensure SSL key and certificate are installed correctly, and up-to-date.

### Certificates
Set the following variables to the values for your server.
```javascript
EPLWS_SSL_PRIVATE_KEY=/etc/ssl/private/eplwild.key
EPLWS_SSL_CERTIFICATE=/etc/ssl/certs/eplwild.crt
```
See [here](#dot-env) for more information.

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

## TODO list
[x] New TODO here.

