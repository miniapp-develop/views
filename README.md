# Views

小程序自定义组件，最低支持版本：2.12.0

## 组件列表

1. Grid
2. Safe（处理 iphone 手机底部小黑条的边距问题）

## 使用方式

### 安装

```shell script
npm install @mini-dev/views
```

*参考：开启微信小程序的 npm 支持： https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html*

### Grid

```json
{
  "usingComponents": {
    "grid": "@mini-dev/views/grid/grid",
    "grid-item": "@mini-dev/views/grid/grid-item"
  }
}
```

```xml

<grid mini-class="grid-class" min-cols="2" max-cols="3">
    <grid-item mini-class="grid-item-class"
               wx:for="{{items}}"
               wx:key="index"
               value="{{index}}"
               bind:tapped="onTap">
        <view class="icons">
            <image class="icon" src="service.svg"/>
        </view>
        <view class="text">Item{{index + 1}}</view>
        <view class="badge">{{index + 10}}</view>
    </grid-item>
</grid>
```

### Safe views

```json
{
  "usingComponents": {
    "safe-area": "@mini-dev/views/safe/safe-area",
    "safe-bottom": "@mini-dev/views/safe/safe-bottom"
  }
}
```

```html

<safe-area mini-class="xxx" styles="xxx"/>
<safe-bottom mini-class="xxx" styles="xxx"/>
```

## ChangeLog

### 0.0.3

1. 支持 Safe Views

### 0.0.2

1. 支持 Grid