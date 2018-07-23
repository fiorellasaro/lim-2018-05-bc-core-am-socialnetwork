global.window = global;
global.assert = require('chai').assert;
require('../src/js/login/login');
require('./login.spec.js');