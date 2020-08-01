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

## 手写 `vue`单例组件之全局提示框

## 总结



