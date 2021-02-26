const path = require('path');
const promission = ['dev-start','build-dll','build-dist','prod-build'];
const minimist = require('minimist');
const args = minimist(process.argv.slice(1));

let env = args['env'];
if(!env) {
    env = 'dev';
}
function buildConfig(wantEnv) {
    let isPass = wantEnv && wantEnv.length > 0 && promission[wantEnv] != -1;
    let envValue = isPass ? wantEnv : 'dev';
    let config = require(path.join(__dirname,`/conf/${envValue}.config.js`));
    return config;
}

let assign = Object.assign(buildConfig(env));
module.exports = assign;