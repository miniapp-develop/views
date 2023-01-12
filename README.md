# Views

小程序自定义逻辑组件，此处“逻辑组件”的意思是组件不含有 UI，只包含基本的逻辑配置。
以 Stepper 组件为例，只定义了基础的 增加、减少 操作，需要使用者自己描述按钮与值显示的逻辑。

最低支持小程序库版本：2.12.0。

## 组件列表

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

### Stepper

```json
{
  "usingComponents": {
    "stepper-view": "/libs/stepper/stepper",
    "display-view": "./components/display"
  }
}
```

```xml

<stepper-view max="3" min="1" step="1" init-value="1" bindchange="onStepChanged">
    <view class="ctrl-increase" slot="increase">+</view>
    <view class="ctrl-decrease" slot="decrease">-</view>
    <display-view/>
</stepper-view>
```

## ChangeLog

### 0.0.2

1. 支持 Grid
