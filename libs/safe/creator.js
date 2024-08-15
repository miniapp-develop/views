const {MiniComponent} = require('../internal');

function Safe() {
    MiniComponent({
        properties: {
            styles: {
                type: String,
                value: ''
            }
        },
    });
}

module.exports = Safe