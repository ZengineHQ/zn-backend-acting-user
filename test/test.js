'use strict';

var Jasmine = require('jasmine');
var jasmine = new Jasmine();



jasmine.loadConfigFile('test/spec/support/jasmine.json');

jasmine.execute();