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
                    const children = this.getRelationNodes(RELATION_KEY);
                    this.notifyChildChanged(target, {
                        siblings: children.length,
                        minCols: this.data.minCols,
                        maxCols: this.data.maxCols
                    });
                }
            }
        },
        properties: {
            minCols: {
                type: Number,
                value: 1
            },
            maxCols: {
                type: Number,
                value: 5
            }
        },
        data: {
            _itemsLength: 0,
            _miniIndex: 0
        },
        observers: {
            'minCols, maxCols': function (minCols, maxCols) {
                const children = this.getRelationNodes(RELATION_KEY);
                const siblings = children.length;
                for (const child of children) {
                    this.notifyChildChanged(child, {
                        siblings: siblings,
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
        properties: {},
        relations: {
            [RELATION_KEY]: {
                type: 'parent',
                target: PARENT
            }
        },
        data: {
            styles: ''
        },
        methods: {
            onNotifyChanged({maxCols, minCols}) {
                const styles = {
                    'min-width': '25%',
                    'max-width': '100%'
                };
                styles['min-width'] = `${(100 / maxCols).toFixed(2)}%`;
                styles['max-width'] = `${(100 / minCols).toFixed(2)}%`;
                const styleString = Object.entries(styles).map(([key, value]) => {
                    return key + ":" + value;
                }).join(';');
                this.setData({
                    styles: styleString
                });
            },
            onTap(e) {
                this.triggerEvent('tapped', {}, {});
            }
        }
    })
}

exports.Grid = Grid;
exports.GridItem = GridItem;