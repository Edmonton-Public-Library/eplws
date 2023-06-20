/**
 * This file data.js contains utility functions for Learning Pass.
 * 
 * Copyright 2021 Andrew Nisbet
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
// We use the assert standard library to make assertions
const assert = require('assert');
// const { add, subtract } = require('../calculator');

// // We do not need to import the test functions since
// // they are made global variables by test.js
// test('should add two numbers', () => {
//         assert.strictEqual(add(1, 2), 3);
// });

// test('should subtract two numbers', () => {
//         assert.strictEqual(subtract(3, 2), 1)
// });
const calculator = require('../calculator');

// We do not need to import the test functions since
// they are made global variables by test.js
test('should add two numbers', () => {
        let add = calculator.add(1,2);
        assert.strictEqual(add, 3);
        console.log(">>",calculator.add(2,3));
});

test('should subtract two numbers', () => {
        assert.strictEqual(calculator.sub(3, 2), 1);
});

test('should show count', () => {
        assert.strictEqual(calculator.getCount(), 0);
});

test('should increment count', () => {
        calculator.incCount();
        assert.strictEqual(calculator.getCount(), 1);
});