# Quokka-Mocha: BDD

Run experiments and turn them into tests -- Quokka-Mocha: BDD is a plugin to enable running Quokka on Mocha test files.

## Installation ##

Install Quokka.js (free or pro)

### 1. NPM setup ###

First install Quokka-Mocha: BDD via npm:

`npm i quokka-mocha-bdd --save-dev`

### 2. Quokka Setup ###

Next, add the plugin to your Quokka configuration:

```
({
    "plugins": [
        "quokka-mocha-bdd"
    ],
    "quokka-mocha-bdd": {
        "interface": <bdd|tdd|qunit>
    }
})
```

### 3. Test Setup ###

Finally, add a small bit of code at the bottom of your test file:

```
describe('test stuff', function () {
    // Tests are all in here
});

if(typeof global.runQuokkaMochaBdd === 'function') {
    runQuokkaMochaBdd();
}
```

This last step guarantees the mocha tests will not run until your tests are ready.  In the future, this step may be eliminated; in the early state this plugin, however, it is necessary, but should not impact regular test running at all.

### That's it! ###

To run Quokka, open a file and type `ctrl/command+k, q`.

## Changelog ##

### v1.2.0 ###

- Fixed tests not properly capturing their runner context

### v1.1.0 ###

- Added support for TDD and QUnit interfaces through configuration options

### v1.0.0 ###

- First release of Quokka-Mocha: BDD
