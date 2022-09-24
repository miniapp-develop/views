const RELATION_KEY = 'mini/grid';
const PARENT = Behavior({});
const CHILD = Behavior({});

function Grid() {
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
                        cols: this.data.cols,
                        minCols: this.data.minCols,
                        maxCols: this.data.maxCols
                    });
                }
            }
        },
        properties: {
            cols: {
                type: Number,
                value: -1
            },
            minCols: {
                type: Number,
                value: 1
            },
            maxCols: {
                type: Number,
                value: 5
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

function GridItem() {
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
                optionalTypes: [String, Object],
                value: 0
            }
        },
        data: {
            styles: ''
        },
        methods: {
            onNotifyChanged({cols, maxCols, minCols}) {
                const styles = {};
                if (cols > 0) {
                    styles['width'] = `${(100 / cols).toFixed(2)}%`;
                } else {
                    styles['min-width'] = `${(100 / maxCols).toFixed(2)}%`;
                    styles['max-width'] = `${(100 / minCols).toFixed(2)}%`;
                    styles['flex'] = `1`;
                }
                const styleString = Object.entries(styles).map(([key, value]) => {
                    return key + ":" + value;
                }).join(';');
                this.setData({
                    styles: styleString
                });
            },
            onTap(e) {
                this.triggerEvent('tapped', {value: this.data.value}, {});
            }
        }
    })
}

exports.Grid = Grid;
exports.GridItem = GridItem;