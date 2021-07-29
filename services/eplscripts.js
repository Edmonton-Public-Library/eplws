

'use strict';

const { spawnSync } = require( 'child_process' );
const utilityTests = require('../lib/util');
const environment = require('../config');
const eplScripts = {};

/** Sample service */
// /**
//  * Lists the files in a directory as if 'ls' was called with '-lh' switches.
//  * @param {*} dir 
//  * @returns {stdout: "string", stderr: "string"}
//  */
// eplScripts.ls = function(dir){
//     /** @TODO test params */
//     let cmd = spawnSync( 'ls', [ '-lh', `${dir}` ] );
//     return {"stdout":cmd.stdout.toString().split(/\r?\n/),"stderr":cmd.stderr.toString().split(/\r?\n/)};
// }

// definition of a request router.
eplScripts.commands = {
    'status' : this.getStatus,
    'getuserpin' : this.getUserPin
};

/**
 * Helper to create consistent return object for results from system commands.
 * @param {*} cmd spawned with process's spawnSync method.
 * @returns dictionary object with stdout and stderr key value pairs.
 */
const getCmdOutput = function(cmd) {
    if (typeof(cmd) !== 'string') {
        // guard that the system command exists and can be called as requested.
        let out = cmd.stdout != null ? cmd.stdout.toString().split(/\r?\n/) : "<eplws error>";
        out = utilityTests.filterEmptyStrings(out);
        let err = cmd.stderr != null ? cmd.stderr.toString().split(/\r?\n/) : "command failed to run";
        err = utilityTests.filterEmptyStrings(err);
        if (environment.useTestMode()) {
            console.log('stdout = ',out);
            console.log('stderr = ',err);
        }
        return {"stdout":out,"stderr":err};
    } else {
        return {"stdout":"<eplws error>","stderr":"command failed to run"};
    }
}

/**
 * Returns the pin of a given user by user ID.
 * @param {*} userId 
 * @returns 
 */
eplScripts.getUserPin = function(userId){
    // This will allow us to use a standard system call rather than a specific ILS system call.
    let cmd;
    if (environment.useTestMode()) {
        cmd = spawnSync( 'true', [] );
    } else {
        cmd = spawnSync( 'getuserpin', [`${userId}`] );
    }
    return getCmdOutput(cmd);
}

/**
 * Returns the pin of a given user by user ID.
 * @param {*} None 
 * @returns STDOUT message from the called script/application.
 */
 eplScripts.getStatus = function(){
    let cmd;
    if (environment.useTestMode()) {
        cmd = spawnSync( 'true', [] );
    } else {
        cmd = spawnSync( 'serverstatus.sh', [] );
    }
    return getCmdOutput(cmd);
}

module.exports = eplScripts;