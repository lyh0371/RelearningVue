# $off

```js

vm.$off() // 移除所有的事件监听
vm.$off('test') // 移除该时间的所有监听器
vm.$off('test',callback) // 移除掉这个回调的监听器
```

# $ refs

```html
<input ref="input" />

<script>
    mounted(){
        this.$refs.input.focus()
    }
</script>
```



