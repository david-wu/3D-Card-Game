require('babel-register')({});
require('babel-polyfill');

global._ = require('lodash');
const game = require('./game.js');

game.run();