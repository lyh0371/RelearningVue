# 从单例模式看`Vue`单例组件

此篇文章是对`从文档开始,重学Vue(上)`的知识补充

## 什么是单例模式

单例模式可以说是众多设计模式的基石,今天我们不聊别的就说说单例模式

> 保证一个类仅有一个实例，并且提供一个访问它的全局访问点

之所以叫单例模式就是因为他保证了不管你调用我几次,老子就输出一次实例的特点,我们用ES6语法举个简单的例子

- 非单例模式实现的类

  ```js
  class Per {
    constructor(name) {
      this.name = name;
    }
    static sayName(name) {
      return new Per(name);
    }
  }
  var a = Per.sayName("码不停息");
  var b = Per.sayName("码不停息2");
  console.log(a); // Per {name: "码不停息"}
  console.log(b); // Per {name: "码不停息2"}
  console.log(a === b); // false
  ```

- 单例模式实现的类

  ```js
  class Per {
    constructor(name) {
      this.name = name;
    }
    static sayName(name) {
      if (!this.instance) {
        this.instance = new Per(name);
      }
      return this.instance;
    }
  }
  var a = Per.sayName("码不停息");
  var b = Per.sayName("码不停息2");
  console.log(a); // Per {name: "码不停息"}
  console.log(b); // Per {name: "码不停息"}
  console.log(a === b); // true
  ```

  可以看出,在非单例模式下我们调用几次`sayName`就会`new`几次`Per`并且每次`new`出来的结果不相同;在单例模式下不管你调用`sayName`几次,都会返回第一次的结果

## 单例模式的实际用途

- 需要对页面资源进行统一调度。最典型的就是弹窗，单个弹窗当然没问题，但如果用户还没看清第一个弹窗的时候，第二个弹窗又来了，两个弹窗不管是覆盖还是叠加，体验都是极为糟糕的，这种时候就应该将所有弹窗放到一个单例下进行管理。
- 需要复用对象以节约资源。比如使用 `webSocket`  与后台通信的时候。`webSocket `虽然使用方便，但是多个 `webSocket` 连接会占用大量的服务端资源，因此，一个页面内绝对不能初始化多个接口相同的 `webSocket`。最好的实现是：同一个浏览器内不管有多少页面，都共享同一个连接，不过，维持连接的页面关闭的时候，其他页面需要及时发起新的连接来保持通信，这样的功能需要后端的支持才能达到。

## 手写 `vue`单例组件之全局提示框

- 首先先做个提示框组件 `toast.vue`

  ```html
  <template>
    <div class="app-toast info" v-if="isShow">
      {{ text }}
    </div>
  </template>
  <style scoped>
  .app-toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background: #ccc;
    padding: 10px;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    color: #fff;
  }
  .info {
    background: #00aaee;
  }
  </style>
  ```

- 在`toast.vue`同级目录下新建`index.js`

  ```js
  import vue from "vue";
  import toast from "./toast.vue";
  // 组件构造器，构造出一个 vue组件实例
  const ToastConstructor = vue.extend(toast);
  function showToast({ text, type, duration = 1000 }) {
    this.toastDom = new ToastConstructor({
      el: document.createElement("div"),
      data() {
        return {
          isShow: true, // 是否显示
          text: text, // 文本内容
        };
      }
    });
    // 添加节点
    document.body.appendChild(this.toastDom.$el);
    // 过渡时间
    setTimeout(() => {
      this.toastDom.isShow = false;
    }, duration);
  }
  // 全局注册
  function registryToast() {
    vue.prototype.$toast = showToast;
  }
  export default registryToast;
  ```

- 在`main.js`中去挂载

  ```js
  import toastRegistry from "./components/Toast/index";
  Vue.use(toastRegistry);
  ```

- 在项目文件使用

  ```js
  this.$toast({
       text: "我是消息"
  });
  ```

  这就是典型的单例组件

## 总结

我们基于`vue`实现了一个单例组件并封装成插件,而在做项目时,我们往往会使用各种大型的UI组件库,用别人给我们写好了轮子,虽然加快了项目进度,但也让容易我们忽略一些最本质的东西。

交个朋友吧