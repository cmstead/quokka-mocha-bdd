'use strict';

const helpers = require('./helpers');
const rethrowError = helpers.rethrowError;
const decorateTest = helpers.decorateTest;
const decorateSuiteEventHandler = helpers.decorateSuiteEventHandler;

const mochaCondensedApi = [
    'describe',
    'it',
    'before',
    'beforeEach',
    'after',
    'afterEach'
];

module.exports = {
    beforeEach: function beforeEach(config) {
        const Mocha = require('mocha');

        let mocha = new Mocha();
        let mochaOn = mocha.suite.on.bind(mocha.suite);
        let mochaSuite = mocha.suite;

        mocha.suite.on = decorateSuiteEventHandler(mochaSuite, mochaOn, mocha);

        Mocha.interfaces.bdd(mochaSuite);

        mochaCondensedApi.forEach(key => global[key] = mochaSuite[key]);

        global.it = (title, callback) => mochaSuite.it(title, decorateTest(callback));
        global.it.only = (title, callback) => mochaSuite.it.only(title, decorateTest(callback));
        global.it.skip = (title, callback) => mochaSuite.it.skip(title, decorateTest(callback));

        global.runQuokkaMochaBdd = mocha.run.bind(mocha);
    }
};