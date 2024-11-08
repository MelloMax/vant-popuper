# 基于vant指令式弹窗封装

调用API即可实现弹窗的显隐控制，减少了代码的复杂度和显隐、数据变量的心智负担

## 安装

```sh
npm install vant-popuper
```

## 使用方式

```js
import {
    useVantCalendar,
    useVantDatePicker,
    useVantDatePickerGroup,
    useVantPicker,
    useVantPopup
} from 'vant-popuper';
import {showToast} from 'vant'
import { h } from 'vue'

// 选择器弹窗
useVantDatePicker({
    columns: [
        {text: '杭州', value: 'Hangzhou'},
        {text: '宁波', value: 'Ningbo'},
        {text: '温州', value: 'Wenzhou'},
        {text: '绍兴', value: 'Shaoxing'},
        {text: '湖州', value: 'Huzhou'},
    ],
    onConfirm({selectedValues}) {
        showToast(`当前值: ${selectedValues.join(',')}`);
    },
    onCancel() {
        showToast('取消');
    }
})

// 日期选择器弹窗
useVantDatePicker({
    title: '选择日期',
    modelValue: ['2021', '01', '01'],
    minDate: new Date(2020, 0, 1),
    maxDate: new Date(2025, 5, 1),
    onConfirm({selectedValues}) {
        showToast(`当前值: ${selectedValues.join('-')}`);
    },
    onCancel() {
        showToast('取消');
    }
})

// 日期组选择器弹窗
useVantDatePickerGroup({
    defaultDate: [
        ['2021', '01', '01'],
        ['2021', '01', '30'],
    ],
    minDate: new Date(2020, 0, 1),
    maxDate: new Date(2025, 5, 1),
    maxRange: 60,
    onConfirm(values) {
        const date = values.map((v) => new Date(v.selectedValues.join('/')));
        showToast(`当前值: ${date[0].toLocaleDateString} - ${date[0].toLocaleDateString}`);
    }
});


// 日历选择器弹窗
useVantCalendar({
    type: 'range',
    minDate: new Date(2010, 0, 1),
    maxDate: new Date(2010, 0, 31),
    maxRange: 3,
    onConfirm(date) {
        showToast(`当前值: ${date[0].toLocaleDateString} - ${date[0].toLocaleDateString}`);
    },
})

// 组件嵌入式弹窗
const Component = {
    setup: (_, { emit }) => () => {
        return h('div', [
            h('button', {
                onClick() {
                    emit('confirm', '点击成功')
                }
            }, '点击我关闭弹窗')
        ])
    }
}

useVantPopup(Component, {
    onConfirm(text) {
        showToast(text)
    }
}, {
    popupProps: {
        round: false,
        position: 'center',
        closeOnClickOverlay: false,
        style: {
            height: '80%',
            width: '80%',
        }
    }
})

```

## 注意事项

- 自定义事件命名声明需要 `on[A-Z]` 开头
- 派发事件默认触发后默认自动关闭弹窗，如果你需要异步操作弹窗关闭前进行特定操作或者禁止关闭，如下操作

```js
import {useVantPicker} from 'vant-popuper';

useVantDatePicker({
    onConfirm({selectedValues}) {
        const [value] = selectedValues;
        // 异步操作
        return new Promise(resolve => {
            fetch('xxx').then(() => {
                resolve(true)
            }).catch(() => {
                resolve(false)
            })
        })
        // 禁止关闭
        // return false
    }
})
```
