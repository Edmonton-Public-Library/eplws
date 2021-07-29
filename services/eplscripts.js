

'use strict';

const { spawnSync } = require( 'child_process' );
const utilityTests = require('../lib/util');
const environment = require('../config');
const { hasArrayData } = require('../lib/util');
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
const commands = {
    'getstatus' : 'serverstatus.sh',
    'getuserpin' : 'getuserpin',
    'false' : 'false'                 // Default run the false command.
};

/**
 * Helper to create consistent return object for results from system commands.
 * @param {*} cmd spawned with process's spawnSync method.
 * @returns dictionary object with stdout and stderr key value pairs.
 */
const _getCmdOutput = function(cmd) {
    let out = "eplws";
    let err = "not an EPL web service";
    // guard that the system command exists and can be called as requested.
    out = cmd.stdout == null ? out : cmd.stdout.toString().split(/\r?\n/);
    out = utilityTests.filterEmptyStrings(out);
    err = cmd.stderr == null ? err : cmd.stderr.toString().split(/\r?\n/);
    err = utilityTests.filterEmptyStrings(err);
    if (environment.useTestMode()) {
        console.log('stdout = ',out);
        console.log('stderr = ',err);
    }
    return {"stdout":out,"stderr":err};
}

/**
 * A general implementation of a linux command and args, but restricted to 
 * the commands listed in command{}.
 * @param {*} command any linux command defined in the commands dictionary.
 * @param {*} args 
 * @returns stderr and stdout from the command run.
 */
eplScripts.systemCmd = function(command,args) {
    // Only allow predefined commands to run otherwise use 'false' command as default.
    let sysCommand = typeof(commands[command]) === 'undefined' ? commands['false'] : commands[command];
    let cmd;
    if (environment.useTestMode()) {
        cmd = spawnSync('true', []);
    } else {
        args = hasArrayData(args) ? args : [];
        cmd = spawnSync(sysCommand, args);
    }
    return _getCmdOutput(cmd);
}

module.exports = eplScripts;