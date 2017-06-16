'use strict';

const Mocha = require('mocha');

const helpers = require('./helpers');
const rethrowError = helpers.rethrowError;
const decorateTest = helpers.decorateTest;
const decorateSuiteEventHandler = helpers.decorateSuiteEventHandler;

function setUpMocha(mochaApi, interfaceKey, testKey) {
    const Mocha = require('mocha');

    let mocha = new Mocha();
    let mochaOn = mocha.suite.on.bind(mocha.suite);
    let mochaSuite = mocha.suite;

    mocha.suite.on = decorateSuiteEventHandler(mochaSuite, mochaOn, mocha);

    Mocha.interfaces[interfaceKey](mochaSuite);

    mochaApi.forEach(key => global[key] = mochaSuite[key]);

    global[testKey] = function (title, callback) {
        mochaSuite[testKey](title, decorateTest(callback));
    }

    global[testKey].only = function (title, callback) {
        mochaSuite[testKey].only(title, decorateTest(callback));
    }

    global[testKey].skip = function (title, callback) {
        mochaSuite[testKey].skip(title, decorateTest(callback));
    }

    global.runQuokkaMochaBdd = mocha.run.bind(mocha);
}

module.exports = setUpMocha;