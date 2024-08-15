Page({
    data: {
        items: [
            {
                name: 'grid'
            },
            {
                name: 'safe'
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
