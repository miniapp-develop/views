const {MiniComponent} = require('../internal');

MiniComponent({
    properties: {},
    data: {},
    lifetimes: {
        attached() {
            const menuInfo = wx.getMenuButtonBoundingClientRect()
            console.log('menuInfo', menuInfo)
            const windowInfo = wx.getWindowInfo()
            console.log('windowInfo', windowInfo)
            const deviceInfo = wx.getDeviceInfo()
            console.log('deviceInfo', deviceInfo)
            const isAndroid = deviceInfo.platform === 'android'
            const isDevtools = deviceInfo.platform === 'devtools'
            this.setData({
                ios: !isAndroid,
                innerPaddingRight: windowInfo.windowWidth - menuInfo.left,
                leftWidth: `width: ${windowInfo.windowWidth - menuInfo.left}px`,
                safeAreaTop: isDevtools || isAndroid ? `height: calc(var(--height) + ${windowInfo.safeArea.top}px); padding-top: ${windowInfo.safeArea.top}px` : ``,
                statusBarHeight: windowInfo.statusBarHeight,
                toolbarHeight: 2 * (menuInfo.top - windowInfo.safeArea.top) + menuInfo.height
            })
        },
    },
    methods: {}
});
