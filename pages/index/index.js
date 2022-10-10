Page({
    data: {
        items: [
            {
                name: 'grid'
            },
            {
                name: 'tabbar'
            },
            {
                name: 'stepper'
            }
        ]
    },
    onTap(e) {
        const name = e.currentTarget.dataset.name;
        wx.navigateTo({
            url: `/pages/${name}/index`
        });
    }
})
