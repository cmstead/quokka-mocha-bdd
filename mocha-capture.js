'use strict';

console.log('Mocha capture started');

process.emit('loadComplete', {
    describe: function () {
        console.log('foo!!!!!!');
    }
});