/**
 * This file handlers-tests.js contains test functions for handlers.js,
 * as implemented in Learning Pass.
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
 
 const assert = require('assert');
 const process = require('process');
 const dotenv = require('dotenv');
 dotenv.config();

 const handlers = require('../lib/handlers');

// eslint-disable-next-line no-undef
test('Should show status.', () => {
    let data = {
        trimmedPath: 'register',
        queryStringObject: {},
        method: 'get',
        headers: {
            "x-api-key": process.env.TEST_API_KEY,
            'user-agent': 'PostmanRuntime/7.26.8',
            accept: '*/*',
            'postman-token': '07e3a08c-c266-481a-9a3f-6ea4749e8276',
            host: 'localhost:6003',
            'accept-encoding': 'gzip, deflate, br',
            connection: 'keep-alive',
            'content-type': 'application/x-www-form-urlencoded',
            'content-length': '17'
        },
     };
    handlers.status(data,(status,message) => {
        assert.strictEqual(status,200);
        console.log(message);
    });
});