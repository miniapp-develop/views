Page({
    data: {
        config: {
            minCols: 2,
            maxCols: 3,
            itemCount: 5
        }
    },
    onTap(e) {
        console.log('点击了：', e.detail);
    },
    onTapCtrl(e) {
        const name = e.target.dataset.name;
        const [target, op] = name.split('.');
        if (op === 'add') {
            if (target === 'minCols' && this.data.config.minCols + 1 > this.data.config.maxCols) {
                console.error('minCols 不能大于 maxCols');
                return;
            }
            this.setData({
                config: {
                    ...this.data.config,
                    [target]: this.data.config[target] + 1
                }
            });
        } else if (op === 'minus') {
            if (this.data.config[target] === 1) {
                console.error(target + ' 不能小于 1');
                return;
            }
            if (target === 'maxCols' && this.data.config.maxCols - 1 < this.data.config.minCols) {
                console.error('maxCols 不能小于 minCols');
                return;
            }
            this.setData({
                config: {
                    ...this.data.config,
                    [target]: this.data.config[target] - 1
                }
            });
        }
    }
})
