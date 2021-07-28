/**
 * This file handlers.js contains route-handler object.
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
const logger = require('../logger');
const environment = require('../config');
const fs = require('fs');
const utilityTests = require('./util');
const eplScripts = require('../services/eplscripts');

// Routes object
const handlers = {};

/**
 * Returns okay status if the server is running.
 * @param {*} data {'status' : 'okay'} 
 * @param {*} callback 
 */
handlers.status = function(data, callback){
    if (environment.useTestMode()) {
        logger.info(`status request: ${JSON.stringify(data)}'`);
    }
    // callback(200, {"message" : "ok"});
    callback(200, eplScripts.getStatus());
};

/**
 * Returns okay status and server version.
 * @param {*} data {'message' : 'okay'} 
 * @param {*} callback 
 */
 handlers.version = function(data, callback){
    if (environment.useTestMode()) {
        logger.info(`version request: ${JSON.stringify(data)}'`);
    }
    callback(200, {"message" : `${environment.getVersion()}`});
};

/**
 * Returns a named static html page.
 * @param {*} data 
 * @param {*} callback 
 */
 handlers.serveHtml = function(data, callback) {
    if (environment.useTestMode()) {
        // logger.info(`static page ${pageName}.html requested`);
        console.log('static page requested',data.trimmedPath);
    }
    callback(80, fs.readFileSync(__dirname + `/../public/${data.trimmedPath}`, {encoding:'utf-8', flag:'r'}));
}

/**
 * The getuserpin REST endpoint route.
 * @param {*} data 
 * @param {*} callback 
 */
handlers.getUserPin = function(data, callback) {
    if (environment.useTestMode()) {
        logger.info(`getuserpin request: ${JSON.stringify(data)}'`);
    }
    if (data.method === 'post') {
        // data.payload => 'user_id=21221012345678'
        if (utilityTests.hasStringData(data.payload)){
            let parts = data.payload.split('=');
            // getuserpin takes only one arg so just check grab the param's value.
            let userId = utilityTests.hasStringData(parts[1]) ? parts[1] : '';
            callback(200, {"message" : eplScripts.getUserPin(userId)});
        } else {
            callback(200, {"message" : 'expected a user_id like 21221012345678, but got none.'});
        }
    } else {
        callback(200, {"message" : 'getuserpin uses POST.'});
    }
}



/**
 * 
 * @param {*} data is written to console if the server is in test mode.
 * @param {*} callback 404 and empty object.
 */
handlers.notFound = function(data, callback){
    if (environment.useTestMode()) {
        logger.info(`404 request: '${JSON.stringify(data)}'`);
    }
    callback(404, {"message" : "Resource not found"});
};

module.exports = handlers;