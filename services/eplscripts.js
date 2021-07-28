

'use strict';

const { spawnSync } = require( 'child_process' );
const utilityTests = require('../lib/util');
const eplScripts = {};

/**
 * Returns the pin of a given user by user ID.
 * @param {*} userId 
 * @returns 
 */
eplScripts.getUserPin = function(userId){
    let cmd = spawnSync( 'getuserpin', [`${userId}`] );
    // let cmd = spawnSync( 'ls', ['-lh', '/home/anisbet'] );
    let out = cmd.stdout.toString().split(/\r?\n/);
    out = utilityTests.filterEmptyStrings(out);
    let err = cmd.stderr.toString().split(/\r?\n/);
    err = utilityTests.filterEmptyStrings(err);
    console.log('stdout = ',out);
    console.log('stderr = ',err);
    return {"stdout":out,"stderr":err};
}

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

/**
 * Returns the pin of a given user by user ID.
 * @param {*} userId 
 * @returns 
 */
 eplScripts.getStatus = function(){
    // let cmd = spawnSync( 'getuserpin', [`${userId}`] );
    let cmd = spawnSync( 'serverstatus.sh', [] );
    let out = cmd.stdout.toString().split(/\r?\n/);
    out = utilityTests.filterEmptyStrings(out);
    let err = cmd.stderr.toString().split(/\r?\n/);
    err = utilityTests.filterEmptyStrings(err);
    return {"stdout":out,"stderr":err};
}

module.exports = eplScripts;