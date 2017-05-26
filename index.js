'use strict';

const setUpMocha = require('./modules/set-up-mocha');
const mochaApiKeyFactory = require('./modules/mochaApiKeyFactory');

const isInterfaceKeyOk = mochaApiKeyFactory.isInterfaceKeyOk;
const getMochaApiKeys = mochaApiKeyFactory.getMochaApiKeys;
const getMochaTestKey = mochaApiKeyFactory.getMochaTestKey;

module.exports = {
    beforeEach: function beforeEach(config) {
        let pluginConfig = config['quokka-mocha-bdd'];
        let interfaceKey = typeof pluginConfig !== 'undefined' ? pluginConfig.interface : 'bdd';

        let mochaApiKey = isInterfaceKeyOk(interfaceKey) ? interfaceKey : 'bdd';
        let mochaApiKeys = getMochaApiKeys(mochaApiKey);
        let testKey = getMochaTestKey(mochaApiKey);
        
        setUpMocha(mochaApiKeys, interfaceKey, testKey);
    }
};