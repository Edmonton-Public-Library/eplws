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


/**
 * Convenience function for testing for data in a dictionary.
 * @param {*} obj any object
 * @returns true if the object is a dictionary and has data, and false otherwise.
 */
const hasDictData = function(obj){
    if(!obj) return false;
    if(Array.isArray(obj)) return false;
    if(obj.constructor != Object) return false;
    if(Object.keys(obj).length == 0) return false;
    return true;
};

/**
 * Tests if the argument is an array with data in it.
 * @param {*} obj - any javascript object.
 * @returns true if obj is an array and contains data, 
 * and false otherwise.
 */
 const hasArrayData = function(obj){
    if(!obj) return false;
    return obj instanceof Array && obj.length > 0 ? true : false;
};

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
    callback(200, {"message" : "ok"});
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