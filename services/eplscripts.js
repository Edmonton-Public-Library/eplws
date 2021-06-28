

'use strict';

const { spawnSync } = require( 'child_process' );
const eplScripts = {};

eplScripts.getUserPin = function(userId){
    let cmd = spawnSync( 'getuserpin', [] );
    // let cmd = spawnSync( 'ls', [ '-lh', '/usr' ] );
    // const cmd = spawnSync( 'sleep', [ '5' ] );
    return {"stdout":cmd.stdout.toString().split(/\r?\n/),"stderr":cmd.stderr.toString().split(/\r?\n/)};
}

module.exports = eplScripts;