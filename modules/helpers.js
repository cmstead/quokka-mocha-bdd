'use strict';

function rethrowError(error) {
    setTimeout(function () {
        throw error;
    }, 10);
}

function decorateTest(callback) {
    return function () {
        try {
            callback();
        } catch (e) {
            rethrowError(e);
        }
    }
}

function decorateSuiteEventHandler(mochaSuite, mochaOn, mocha) {
    return function (eventName, eventAction) {
        if (eventName === 'pre-require') {
            eventAction(mochaSuite, '', mocha);
        }

        mochaOn(eventName, eventAction);
    }
}

module.exports = {
    rethrowError: rethrowError,
    decorateSuiteEventHandler: decorateSuiteEventHandler,
    decorateTest: decorateTest
};