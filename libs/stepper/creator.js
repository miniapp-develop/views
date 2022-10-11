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
                    this.notifyChildChanged(target, this.getCurrentPayload());
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
            initValue: {
                type: Number,
                value: 1
            }
        },
        data: {
            _value: null
        },
        observers: {
            initValue(value) {
                if (this.data._value === null) {
                    this.setData({
                        _value: value
                    });
                }
            }
        },
        methods: {
            getCurrentPayload() {
                return {
                    value: this.data._value,
                    min: this.data.min,
                    max: this.data.max
                };
            },
            notifyChildChanged(child, dataset) {
                child.onNotifyChanged(dataset);
            },
            onControl(type) {
                const payload = this.getCurrentPayload();
                let newValue = payload.value;
                if (type === 'decrease') {
                    newValue = this.data._value - this.data.step;
                } else if (type === 'increase') {
                    newValue = this.data._value + this.data.step;
                }
                if (newValue > this.data.max) {
                    this.triggerEvent('limited', {
                        type: 'stepper.max',
                        payload: payload
                    });
                    return;
                }
                if (newValue < this.data.min) {
                    this.triggerEvent('limited', {
                        type: 'stepper.min',
                        payload: payload
                    });
                    return;
                }
                payload.value = newValue;
                this.setData({
                    _value: payload.value
                });
                const children = this.getRelationNodes(RELATION_KEY);
                for (const child of children) {
                    this.notifyChildChanged(child, payload);
                }
                this.triggerEvent('change', {
                    type: 'stepper.change',
                    payload: payload
                });
            },
            onTapDecrease() {
                this.onControl('decrease');
            },
            onTapIncrease() {
                this.onControl('increase');
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
        data: {
            value: 0
        },
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