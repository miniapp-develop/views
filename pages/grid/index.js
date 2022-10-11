Page({
    data: {
        config1: {
            cols: 3,
            itemCount: 5
        },
        config2: {
            minCols: 2,
            maxCols: 3,
            itemCount: 5
        }
    },
    onTap(e) {
        console.log('点击了：', e.detail);
    },
    onTapCtrl(e, config) {
        const name = e.currentTarget.dataset.name;
        this.setData({
            [`${config}.${name}`]: e.detail.payload.value
        });
    },
    onConfig1Changed(e) {
        this.onTapCtrl(e, 'config1');
    },
    onConfig2Changed(e) {
        this.onTapCtrl(e, 'config2');
    }
})
