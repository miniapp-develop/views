Page({
    data: {
        max: 10,
        min: 0,
        step: 1
    },
    onLoad(query) {

    },
    onLimited(e) {
        console.log(e);
    },
    onChanged(e) {
        console.log(e);
    },
    onStepChanged(e) {
        console.log(e.detail.payload.value);
        this.setData({
            step:e.detail.payload.value
        });
    },
    onMinChanged(e) {
        console.log(e.detail.payload.value);
        this.setData({
            min:e.detail.payload.value
        });
    },
    onMaxChanged(e) {
        console.log(e.detail.payload.value);
        this.setData({
            max:e.detail.payload.value
        });
    }
});