Page({
    data: {
        config1: {
            activeId: 0,
            itemCount: 4
        }
    },
    onTap(e) {
        console.log('点击了：', e.detail);
        this.setData({
            'config1.activeId': e.detail.id
        });
    },
    onConfigChanged(e, config) {
        console.log(e)
        const payload = e.detail.payload;
        console.log({
            [`${config}`]: payload.value
        })
        this.setData({
            [`${config}`]: payload.value
        });
    },
    onConfig1Changed(e) {
        this.onConfigChanged(e, 'config1.itemCount');
    }
})
