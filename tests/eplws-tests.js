/**
 * This file eplws-tests.js contains test calls to system calls,
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
const environment = require('../config');
const eplscripts = require('../services/eplscripts');

// // eslint-disable-next-line no-undef
// test('Should return a dictionary of two empty arrays called "stdout" and "stderr" if config.json "testMode" is true, and the system command results otherwise.', () => {
//     let result = {stdout: [],stderr: []};
//     let actual = eplscripts.getStatus();
//     if (environment.useTestMode()) {
//         assert.deepStrictEqual(actual,result);
//     } else {
//         console.log(actual);
//     }
// });

// test('Should return a dictionary of two empty arrays called "stdout" and "stderr" if config.json "testMode" is true, and the system command results otherwise.', () => {
//     let result = {stdout: [],stderr: []};
//     let actual = eplscripts.getUserPin("bogus");
//     if (environment.useTestMode()) {
//         assert.deepStrictEqual(actual,result);
//     } else {
//         console.log(actual);
//     }
// });

test('Should return "stdout" and "stderr" from generalized command for getuserpin. In test mode stdout and stderr will be blank', () => {
    let result = {stdout: [],stderr: []};
    // mockup for machines that don't have this script.
    let userId = '21221012345678';
    let actual = eplscripts.systemCmd('getuserpin',[userId]);
    if (environment.useTestMode()) {
        assert.deepStrictEqual(actual,result);
    } else {
        console.log(actual);
    }
});

test('Should return "stdout" and "stderr" getstatus. In test mode stdout and stderr will be blank.', () => {
    let result = {stdout: [],stderr: []};
    let actual = eplscripts.systemCmd('getstatus');
    if (environment.useTestMode()) {
        assert.deepStrictEqual(actual,result);
    } else {
        console.log(actual);
    }
});

test('Should return "stdout" and "stderr" of "false" command. In test mode stdout and stderr will be blank.', () => {
    let result = {stdout: [],stderr: []};
    let actual = eplscripts.systemCmd('blah');
    if (environment.useTestMode()) {
        assert.deepStrictEqual(actual,result);
    } else {
        console.log(actual);
    }
});

test('Should return blank results for no command. In test mode stdout and stderr will be blank.', () => {
    let result = {stdout: [],stderr: []};
    let actual = eplscripts.systemCmd('');
    if (environment.useTestMode()) {
        assert.deepStrictEqual(actual,result);
    } else {
        console.log(actual);
    }
});