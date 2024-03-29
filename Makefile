#
# This Makefile manages tests for eplws.
# 
# Copyright 2021 Andrew Nisbet, Edmonton Public Library
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
.PHONY: test run util config date handlers

web-service:
	clear
	node ./tests/test.js ./eplws-tests.js

handlers:
	clear
	node ./tests/test.js ./handlers-tests.js
	
config:
	clear
	node ./tests/test.js ./config-tests.js

test:
	clear 
	node ./tests/test.js ./config-tests.js
	node ./tests/test.js ./util-tests.js
	node ./tests/test.js ./date-tests.js
	node ./tests/test.js ./handlers-tests.js
	node ./tests/test.js ./eplws-tests.js

util:
	clear
	node ./tests/test.js ./util-tests.js

date:
	clear
	node ./tests/test.js ./date-tests.js

run:
	clear
	NODE_ENV=staging node index
