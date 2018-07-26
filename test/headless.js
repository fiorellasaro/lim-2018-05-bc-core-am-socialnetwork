global.window = global;
global.assert = require('chai').assert;
require('../src/js/validation');
require('./login.spec.js');