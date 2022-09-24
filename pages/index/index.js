Page({
    data: {
        items: [
            {
                name: 'grid'
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
