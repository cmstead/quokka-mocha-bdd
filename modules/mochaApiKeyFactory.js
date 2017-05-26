'use strict';

const mochaCommonApi = [
    'before',
    'beforeEach',
    'after',
    'afterEach'
];

const testApi = [
    'suite',
    'test'
];

const mochaApis = {
    bdd: [
        'describe',
        'it'
    ],
    tdd: testApi,
    qunit: testApi
};

function isInterfaceKeyOk(key) {
    return typeof mochaApis[key] !== 'undefined';
}

function getMochaApiKeys(mochaInterfaceKey) {
    let testApiKeys = isInterfaceKeyOk(mochaInterfaceKey) ? mochaApis[mochaInterfaceKey] : mochaApis['bdd'];

    return testApiKeys.concat(mochaCommonApi);
}

function getMochaTestKey(mochaInterfaceKey) {
    return getMochaApiKeys(mochaInterfaceKey)[1];
}

module.exports = {
    getMochaApiKeys: getMochaApiKeys,
    getMochaTestKey: getMochaTestKey,
    isInterfaceKeyOk: isInterfaceKeyOk
};