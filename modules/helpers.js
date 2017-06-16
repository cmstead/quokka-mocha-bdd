'use strict';

function rethrowError(error) {
    setTimeout(function () {
        throw error;
    }, 10);
}

function decorateWithoutDone(callback) {
    return function () {
        try {
            callback.call(this);
        } catch (e) {
            rethrowError(e);
        }
    };
}

function decorateWithDone(callback) {
    return function (done) {
        try {
            callback.call(this, done);
        } catch (e) {
            rethrowError(e);
        }
    };
}

function decorateTest(callback) {
    return callback.length > 0 ? decorateWithDone(callback) : decorateWithoutDone(callback);
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