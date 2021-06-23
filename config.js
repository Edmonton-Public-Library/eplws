/**
 * The config.js file loads the eplws-specific configurations.
 * 
 * Copyright 2021 Andrew Nisbet, Edmonton Public Library
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const logger = require('./logger');
const utils = require('./lib/util');
const process = require('process');
// Check the .env for test partner keys and settings for the startup environment.
const dotenv = require('dotenv');
dotenv.config();
// Read the configuration from JSON in the ./config/config.json file.
const configFile = './config/config.json';

// The environment object of helper functions.
const environment = {};

// Staging environment object.
const defaultServerSettings = {
    'httpPort' : 3000,
    'httpsPort' : 3001,
    'envName' : 'staging'
};

/**
 * Load all the server configs from the configFile.
 */
(function(){
    let config;
    try {
        config = require(configFile);
    } catch (error) {
        // Happens if the file is missing.
        logger.error(`Error in ${configFile}.`);
    }
    if (config){

        // Read in version from JSON and if it does not exist report '0.0' which could be diagnostic.
        environment.version = typeof(config.version) === 'string' || typeof(config.version) === 'number' ? config.version : "0.0";
        // Test if the server should be in loopback mode for situations like outages.
        environment.loopbackMode = typeof(config.loopbackMode) === 'boolean' ? config.loopbackMode : false;
        // Test if the server should be in loopback mode for situations like outages.
        environment.testMode = typeof(config.testMode) === 'boolean' ? config.testMode : false;
        

        // Load the server settings.
        // Read in the server configuration object, and have a default standing by if there isn't one.
        let envName = utils.hasStringData(process.env.NODE_ENV) ? process.env.NODE_ENV.toLowerCase() : "staging";
        environment.serverConfig = utils.hasDictData(config[envName]) ? config[envName] : defaultServerSettings;
        logger.info(`Server starting as '${environment.serverConfig.envName}'.`);

        if (environment.testMode){
            logger.debug(`TEST_MODE: See documentation for more information.`);
        }
    }
})();


/**
 * Returns the version number of the json config file
 * or '0.0' if one is not in the json config file.
 */
environment.getVersion = function(){
    return environment.version;
};

/**
 * Returns the server configs or an empty object if none were read
 * from the config.json.
 */
environment.getServerConfig = function(){
    // if (typeof(environment.serverConfig) == 'object'){
    if (utils.hasDictData(environment.serverConfig)){
        return environment.serverConfig;
    } else {
        logger.error(`Error server configs not set.`);
        return {};
    }
};

/**
 * 
 * @returns the http port for the environment set by process.env.NODE_ENV.
 */
environment.getHttpPort = function() {
    return environment.serverConfig.httpPort;
}

/**
 * 
 * @returns the https port for the environment set by process.env.NODE_ENV.
 */
environment.getHttpsPort = function() {
    return environment.serverConfig.httpsPort;
}

/**
 * Returns true if the 'loopbackMode' key-value pair exists in the config.json
 * and is set to true, and false otherwise.
 */
environment.useLoopbackMode = function(){
    return environment.loopbackMode;
}

/**
 * Returns the certificate file name found in process.env.EPLWS_SSL_CERTIFICATE
 * @returns the name and path of the SSL certificate for the EPLWS domain. 
 * set in process.env.EPLWS_SSL_CERTIFICATE.
 */
environment.getSSLCertificate = function() {
    return process.env.EPLWS_SSL_CERTIFICATE;
}

/**
 * Returns the private key file name found in process.env.EPLWS_SSL_PRIVATE_KEY
 * @returns the name and path of the SSL private key for the EPLWS domain. 
 * set in process.env.EPLWS_SSL_PRIVATE_KEY.
 */
environment.getSSLKey = function() {
    return process.env.EPLWS_SSL_PRIVATE_KEY;
}

/**
 * @returns true if the 'testMode' key-value pair exists in the config.json
 * and is set to true, and false otherwise.
 */
environment.useTestMode = function(){
    return environment.testMode;
}

/**
 * @returns the configured environment name.
 */
environment.getEnvName = function(){
    return environment.serverConfig.envName;
}

module.exports = environment;
