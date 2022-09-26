export const RELATION_KEY = 'mini/tabbar';
export const PARENT = Behavior({});
export const CHILD = Behavior({});

function Tabbar() {
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
                    target.onNotifyChanged(this.data.activeId);
                }
            }
        },
        properties: {
            activeId: {
                type: String,
                optionalTypes: [Number],
                value: 'none'
            }
        },
        observers: {
            'activeId': function (activeId) {
                const children = this.getRelationNodes(RELATION_KEY);
                for (const child of children) {
                    child.onNotifyChanged((activeId));
                }
            }
        },
        data: {},
        methods: {
            notifyChanged(tabId, tabValue) {
                this.triggerEvent('tapped', {id: tabId, value: tabValue}, {});
            }
        }
    })
}

function Tab() {
    return Component({
        options: {
            virtualHost: true,
            multipleSlots: true,
            pureDataPattern: /^_/
        },
        externalClasses: ['mini-class', 'mini-active-class'],
        behaviors: [CHILD],
        relations: {
            [RELATION_KEY]: {
                type: 'parent',
                target: PARENT
            }
        },
        properties: {
            tabId: {
                type: String,
                optionalTypes: [Number],
                value: ''
            },
            value: {
                type: String,
                optionalTypes: [Number, Object],
                value: ''
            },
        },
        data: {
            active: false
        },
        methods: {
            onNotifyChanged(activeId) {
                this.setData({
                    active: activeId === this.data.tabId
                });
            },
            onTap(e) {
                const parent = this.getRelationNodes(RELATION_KEY)[0];
                parent.notifyChanged(this.data.tabId, this.data.value);
            }
        }
    })
}

exports.Tabbar = Tabbar;
exports.Tab = Tab;