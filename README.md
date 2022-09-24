# Views

组件列表：

1. Grid

## 使用方式

### 安装

```shell script
npm install @mini-dev/views
```

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

## ChangeLog

### 0.0.1
1. 支持 Grid