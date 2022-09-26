const RELATION_KEY = 'mini/stepper';
const PARENT = Behavior({});
const CHILD = Behavior({});

function Stepper() {
    Component({
        options: {
            virtualHost: true,
            multipleSlots: true,
            pureDataPattern: /^_/
        },
        externalClasses: ['mini-class'],
        behaviors: [PARENT],
        relations: {
            [RELATION_KEY]: {
                type: 'child',
                target: CHILD,
                linked(target) {
                    this.notifyChildChanged(target, {
                        value: this.data.value,
                        min: this.data.min,
                        max: this.data.max
                    });
                }
            }
        },
        properties: {
            max: {
                type: Number,
                value: 10
            },
            min: {
                type: Number,
                value: 0
            },
            step: {
                type: Number,
                value: 1
            },
            value: {
                type: Number,
                value: 0
            }
        },
        data: {},
        observers: {
            'cols, minCols, maxCols': function (cols, minCols, maxCols) {
                const children = this.getRelationNodes(RELATION_KEY);
                for (const child of children) {
                    this.notifyChildChanged(child, {
                        cols: cols,
                        minCols: minCols,
                        maxCols: maxCols
                    });
                }
            }
        },
        methods: {
            notifyChildChanged(child, dataset) {
                child.onNotifyChanged(dataset);
            }
        }
    })
}

function StepperControl() {
    return Component({
        options: {
            virtualHost: true,
            multipleSlots: true,
            pureDataPattern: /^_/
        },
        externalClasses: ['mini-class'],
        behaviors: [CHILD],
        relations: {
            [RELATION_KEY]: {
                type: 'parent',
                target: PARENT
            }
        },
        properties: {
            type: {
                type: String,
                value: ''
            }
        },
        data: {},
        methods: {
            onNotifyChanged({value, min, max}) {

            },
            onTap(e) {

            }
        }
    })
}

function StepperDisplay() {
    return Component({
        options: {
            virtualHost: true,
            multipleSlots: true,
            pureDataPattern: /^_/
        },
        externalClasses: ['mini-class'],
        behaviors: [CHILD],
        relations: {
            [RELATION_KEY]: {
                type: 'parent',
                target: PARENT
            }
        },
        properties: {
            value: {
                type: Number,
                value: 0
            }
        },
        data: {},
        methods: {
            onNotifyChanged({value, min, max}) {

            },
            onTap(e) {

            }
        }
    })
}

exports.Stepper = Stepper;
exports.StepperControl = StepperControl;
exports.StepperDisplay = StepperDisplay;