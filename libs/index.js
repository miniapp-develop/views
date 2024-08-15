const GridCreator = require('./grid/creator');

exports.GridViewCreator = GridCreator;

function _Component(options = {}) {
    if (!options.externalClasses) {
        options.externalClasses = []
    }
    options.externalClasses.unshift('mini-class');
    if (!options.behaviors) {
        options.behaviors = [];
    }
    options.options = {
        virtualHost: true,
        styleIsolation: 'isolated',
        multipleSlots: true,
        pureDataPattern: /^\$_mini/,
        ...options.options
    }
    Component(options);
}

exports.MiniComponent = _Component;