function _Component(ComponentOption = {}) {
    if (!ComponentOption.externalClasses) {
        ComponentOption.externalClasses = []
    }
    ComponentOption.externalClasses.unshift('mini-class');
    if (!ComponentOption.behaviors) {
        ComponentOption.behaviors = [];
    }
    ComponentOption.options = {
        virtualHost: true,
        styleIsolation: 'isolated',
        multipleSlots: true,
        pureDataPattern: /^_/,
        ...ComponentOption.options
    }
    Component(ComponentOption);
}

exports.MiniComponent = _Component;