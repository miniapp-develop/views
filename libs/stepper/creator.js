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
        observers: {},
        methods: {
            notifyChildChanged(child, dataset) {
                child.onNotifyChanged(dataset);
            },
            onControl(type) {
                let newValue = this.data.value;
                if (type === 'decrease') {
                    newValue = this.data.value - this.data.step;
                } else if (type === 'increase') {
                    newValue = this.data.value + this.data.step;
                }
                this.setData({
                    value: newValue
                });
                const children = this.getRelationNodes(RELATION_KEY);
                for (const child of children) {
                    this.notifyChildChanged(child, {
                        value: newValue,
                        min: this.data.min,
                        max: this.data.max
                    });
                }
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
            notifyChanged() {
                const stepper = this.getRelationNodes(RELATION_KEY)[0];
                stepper.onControl(this.data.type);
            },
            onTap(e) {
                this.notifyChanged();
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
                this.setData({
                    value: value
                });
            }
        }
    })
}

exports.Stepper = Stepper;
exports.StepperControl = StepperControl;
exports.StepperDisplay = StepperDisplay;