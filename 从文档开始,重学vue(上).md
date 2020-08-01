![](https://user-gold-cdn.xitu.io/2020/7/22/173748bcb1b78fdc?w=958&h=500&f=png&s=53765)

```!
    文章较长👉先关注再阅读👈如果一不小心解决了你在使用vue中的某个痛点记得点个赞哦🤒
```
## 闲扯一番
用`vue`也有些年头了，不得不说`vue`确实是一个了不起的框架（不接受任何反驳😄）但在工作中有太多的前端开发者还只是停留在会用的圈圈中，有很多人觉得我没有看完官方文档也不妨我们做`vue`项目写`vue`代码啊？确实，这点不可否认

__但是大哥，你一个`vue`文件写1000多行，是觉得自己的头发掉的不够快吗?__

你们信不爱读文档的程序员能写出好代码吗？反正我是不信🙃 


## 举个例子

我们知道`prop`是接受父组件参数,假如现在要接收一个对象,可能你会这样用
```js
<!--父组件传过来的值 父组件的数据是异步请求回来的-->
item:{
    name:'刘小灰',
    age:18
}
<!--子组件接收-->
Vue.component('my-component', {
    props:['item']    
}

<!--页面上使用-->
<span> {{item.name}} </span>
```
如果粗心的程序员没有传这个`item`,控制台就会报错

![](https://user-gold-cdn.xitu.io/2020/7/22/173753690f28886b?w=1269&h=450&f=png&s=80803)
这个时候,聪明的你会有两个选择
- 索性不管,不影响正常逻辑
- 大不了加个判断
```js
 <span v-if="item">{{ item.name }}</span>
```

![](https://user-gold-cdn.xitu.io/2020/7/22/17375378bccb58f9?w=1197&h=402&f=png&s=27623)
页面又一切正常好像什么都没发生,这个时候你可能心里犯迷糊, __这个bug大家都是这样解决的吗__?

如果你看过`vue`的官方文档,了解`prop`的所有用法,当你第一眼看到这个bug时就会立马反应过来,`prop`应该这样写更为合理
```js
Vue.component('my-component', {
    props:{ 
        item:{
            type:Object,
            defent:()=>{return:{}}
        }
    }
}
```
例子可能过于简单,主要想表达的思想就是 __只有先了解框架具备的所有能力,才能写出更高质量的代码__

##  从风格指南开始
![](https://user-gold-cdn.xitu.io/2020/7/22/173753c7fc1488e5?w=843&h=357&f=png&s=49824)
既然是重学`vue`说明不是第一次学了,这个时候建议大家从 __风格指南__ 开始重学，如果是新手还是建议大家从 __教程__ 一步一步开始学
```!
为了方便以下示例均在vue-cli3中完成
```
### 组件的命名规范
在开发中你可能会遇到 __不知道给组件怎么取名__ 的尴尬情况,遵从`vue`规范,让你给组件起名即 __顺畅__ 又 __规范__
#### 组件名为多个单词
```!
组件名应该始终是多个单词的，根组件 App 以及 <transition>、<component> 之类的 Vue 内置组件除外。

这样做可以避免跟现有的以及未来的 HTML 元素相冲突，因为所有的 HTML 元素名称都是单个单词的。
```
用多个单词定义组件不仅可以避免和原有的HTML元素相冲突,在外观上看来也更加的好看😃

####  采用`PascalCase`或`kebab-case`命名规范
或的意思是我们在命名时即可以采用`驼峰命名`da也可以采用`-`命名,但建议大家在项目中统一风格只用一种,我本人习惯使用`PascalCase`格式
```!
单词大写开头对于代码编辑器的自动补全最为友好，因为这使得我们在 JS(X) 和模板中引用组件的方式尽可能的一致。
然而，混用文件命名方式有的时候会导致大小写不敏感的文件系统的问题，这也是横线连接命名同样完全可取的原因
```
原因就是`PascalCase`更有利于 __代码自动补全__ ,至于导致大小写不敏感的系统文件问题我暂时还没遇到

####  基础组件用 `Base` | `App` | `V` 开头
推荐用Base开头,因为更加语义化如一个基础的按钮组件我们可以叫`BaseBtn.vue`

####  单例组件用 `The`开头 
可能有的人不熟悉什么是单例组件,单例是一种设计模式不清楚这个概念的可以自己查阅资料,比如我们常见的element-ui中通过js调用的弹窗组件就可以看做是一个单例组件
####和父组件紧密耦合的子组件应该以父组件名作为前缀命名
如果一个公用组件比较复杂我们可以抽离出几个子组件,同时从命名上区别出组件之间的关系,如:
```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```
根据以上规则,我们来规范下项目中组件的目录
![](https://user-gold-cdn.xitu.io/2020/7/22/17375a0af2e1d96b?w=253&h=271&f=png&s=11394)

```
1. 这里我把基础组件和单例组件单独拿出来放在了`common`文件夹中`components`文件里面放置项目公共组件
2. 每个组件建议放在一个单独的文件夹而不是用单独的文件,有利于后期的扩展及维护
```

###  组件实例书写顺序规范
在我们平常开发中一个组件会调用很多vue实例,由于开发人员的习惯不同这些实例书写顺序也不同,这样无形之中增加了我们的维护成本,下面我们来看看vue推荐的书写顺序

```!
这是我们推荐的组件选项默认顺序,将选择和人知成本最小化
vue文件里面js，要按照vue的生命周期来写，最开始是mixins->porps->data->computed->mounted->watch->methods->components，用不到的可以忽略，统一顺序，养成习惯

```
```
1. name
2. components
4. directives
5. filters
6. extends
7. minins
8. props
9. data
10. computed
11. watch
12. beforeCreate
13. created
14. beforeMount
15. mounted
16. beforeUpdate
17. updated
18. activated`
19. deactivated
20. beforeDestroy
21. destroyed
22. methods
```
上面列的比较多,在我们实际开发中,没有用到的可以不写,保留这个顺序即可

![](https://user-gold-cdn.xitu.io/2020/7/22/17375d94a2442c32?w=467&h=437&f=png&s=28614)

### 组件父子通信规范
```!
应该优先通过 prop 和事件进行父子组件之间的通信，而不是 this.$parent 或变更 prop。

一个理想的 Vue 应用是 prop 向下传递，事件向上传递的。遵循这一约定会让你的组件更易于理解。然而，在一些边界情况下 prop 的变更或 this.$parent 能够简化两个深度耦合的组件
```
记住这句话 __一个理想的 Vue 应用是 prop 向下传递，事件向上传递的__ 可以让我们少写很多野路子代码

`vue`官方的风格规范有很多,我这里只是抛砖引玉,捡了我认为比较有用的给大家回顾下,更加详细的内容可以去官方文档瞅一瞅

### 事件名书写规范
直接上官方推荐
![](https://user-gold-cdn.xitu.io/2020/7/27/1738e17cb285eba6?w=815&h=208&f=png&s=32397)
## 再看官方教程
如:
```js
<BaseBtn @click="btn-click"></BaseBtn>
```

### 总结
写在`<template>`里面的(组件的使用,事件)使用`kebab-case`命名规范,其他地方使用`PascalCase`命名规范

- 可以再任何地方都使用`PascalCase`吗?

不推荐因为有些时候可能会出现大小写不明白情况
- 可以再任何地方都使用`kebab-case`吗?

原则上可以这个看个人爱好,需要注意的是`kebab-case`对代码编辑器的自动补全不太友好


![](https://user-gold-cdn.xitu.io/2020/7/23/173793f0017b465b?w=909&h=384&f=png&s=52017)
相信大家最初学`vue`的时候都看过这个教程,下面我带着大家再回顾下比较重要且容易被遗忘的一些知识点

### 安装
目前使用vue最常用的就是通过`npm`引入或者直接`script`标签引入,下面是官方给出的`vue`构建的不同版本

![](https://user-gold-cdn.xitu.io/2020/7/24/1737e68d82c15139?w=715&h=791&f=png&s=38099)
我们来说说不同版本的使用场景
+ `UMD` `UMD` 版本可以通过 `<script>` 标签直接用在浏览器中
+ `CommonJS` `CommonJS` 版本用来配合老的打包工具比如 `Browserify` 或 `webpack 1`。这些打包工具的默认文件 (pkg.main) 是只包含运行时的 `CommonJS` 版本 `(vue.runtime.common.js)`
+ ESModule 从 2.6 开始 Vue 会提供两个 ES Modules (ESM) 构建文件：
     - 为打包工具提供的 ESM：为诸如 webpack 2 或 Rollup 提供的现代打包工具。ESM 格式被设计为可以被静态分析，所以打包工具可以利用这一点来进行“tree-shaking”并将用不到的代码排除出最终的包。为这些打包 工具提供的默认文件 (pkg.module) 是只有运行时的 ES Module 构建 (vue.runtime.esm.js)。
    - 为浏览器提供的 ESM (2.6+)：用于在现代浏览器中通过 `<script type="module"> `直接导入。

可以看出 `vue` 给出了很多种构建版本适用于`UMD  CommonJS ESModule`,对这些规范不理解的可以看[这篇文章](https://juejin.im/post/5e3985396fb9a07cde64c489),而 我们通常使用的通过`webpack`构建出来的`vue-cli`遵循的是`ESModule`规范

#### 完成版&编译器&运行时
不同构建版本中又分为 __完整版__ 和 __只包含运行时版本__ ,为了便于理解我们可以把`vue`代码大致分为`负责运行时的代码`和`负责编译的代码`,他们之间的关系是`编译器 + 运行时 ≈完整版`

而编译器只是在编译开发环境下使用,也就是说生产环境中我们只需要使用 __只包含运行时版本__ 的`vue`,而不是 __完整版__ 的`vue`,如果你是使用`vue-cli`可以再vue.config.js中配置在生成环境下不打包`vue`然后通过 __CDN__ 的方式去引入 __只包含运行时版本__ 的`vue`,代码如下:
```html
index.html

  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link rel="icon" href="<%= BASE_URL %>favicon.ico" />
    <title>vue-app</title>
    <script
      src="https://cdn.bootcss.com/vue/2.6.10/vue.runtime.min.js"
      crossorigin="anonymous"
    ></script>
  </head>

```
```js
module.exports = {
  configureWebpack: {
    externals: {
      vue: 'Vue'
    }
  }
}
```
下面是通过 `npm使用vue` 和 `通过cdn使用vue完成版`及`通过cdn使用只包含运行时版`打包后的性能对比图

![](https://user-gold-cdn.xitu.io/2020/7/24/1737e9cd36404ce3?w=1373&h=669&f=png&s=431676)

通过`cdn`方式引入`cdn`打出来的包要小

我们再来看`vueruntime.js (只包含运行时)`和`vue.main.js (完整版)`大小的对比
![](https://user-gold-cdn.xitu.io/2020/7/24/1737e9ffb0354d58?w=800&h=572&f=jpeg&s=59446)

这也验证了官方的数据

![](https://user-gold-cdn.xitu.io/2020/7/24/1737ea168193fb57?w=740&h=383&f=png&s=34431)

__在看看你的项目`vue`引入对了吗?__


### `Vue`并不完全遵循`MVVM` 模型

- 面试官 : 你知道`vue`是基于什么模型吗?
- 面试者: 知道 `MVVM`
- 面试官: 欣慰地点了点头

我们来看看官网
![](https://user-gold-cdn.xitu.io/2020/7/24/1737eb36981595a5?w=737&h=89&f=png&s=14157)
😂😂😂

要说清楚这点，我们先来看看学习几个典型的架构模型

####  MVC
![](https://user-gold-cdn.xitu.io/2020/7/24/1737ed5803dc9edb?w=482&h=329&f=png&s=7961)
`MVC`把软件分为三个层,分别是

```
视图（View）：用户界面。
控制器（Controller）：业务逻辑
模型（Model）：数据保存
```
他们之间的通讯方式为
![](https://user-gold-cdn.xitu.io/2020/7/24/1737ed7ae9fa6e7b?w=471&h=304&f=png&s=10463)
可以看出`MVC`模型数据都是单向的,流程可以简化为
```
用户行为改变(点击事件)Viwe -> View通知Contoller进行逻辑处理 -> 处理后Controller通知Model层数据改变
-> Model数据改变后交给View渲染(改变view层)

注:用户也可以直接改变Contoller
```
####  MVP

![](https://user-gold-cdn.xitu.io/2020/7/24/1737eea5e7a4c34c?w=485&h=294&f=png&s=10883)
`MVP`可以看做是`MVC`的衍生物,在`MVP`中`Model`不能直接操作`View`,且所有的通讯都是双向的


####  MVVM

![](https://user-gold-cdn.xitu.io/2020/7/24/1737f66c99dfd949?w=505&h=367&f=png&s=11556)
`MVVM` 模式将 `Presenter` 改名为 `ViewModel`，基本上与 `MVP` 模式完全一致。
唯一的区别是，它采用双向绑定`（data-binding）`：`View`的变动，__自动__ 反映在 `ViewModel`，反之亦然
#### 为什么说`Vue`没有完全遵循`MVVM`
严格意义上在`MVVM`中 `View`和`Model`之间是不能通讯的,但`Vue`却提供了相应的Api `$refs`

我们可以在项目中这样使用
```html
<template>
  <div>
    <input type="text" ref="dome" value="1" />
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data() {
    return {}
  },
  mounted() {
    console.log(this.$refs.dome.value)
    this.$refs.dome.value = 2
  },
  methods: {}
}
</script>
```
可以看出我们可以直接通过`Model`去操作`View`
![](https://user-gold-cdn.xitu.io/2020/7/24/1737f8179af6bd0d?w=1098&h=299&f=png&s=18371)
`vue`官方也对`$refs`进行说明
![](https://user-gold-cdn.xitu.io/2020/7/24/1737f7ff1f4de09f?w=774&h=602&f=png&s=94981)
所以说`Vue`并不是正在意义上的`MVVM`架构,但是思想是借鉴了`MVVM`然后又进行了些`本土化`,不过问题不大,现在根据`MVVM本土化`出来的架构都统称`MV*`架构

__你还知道`vue`的哪些设计没有遵循`MVVM`规范呢?__ 欢迎留言

## 关于`Vue`实例
###  Object.freeze()
```!
当一个 Vue 实例被创建时，它将 data 对象中的所有的 property 加入到 Vue 的响应式系统中。当这些 property 的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。
```
但在项目开发中,有的信息我们不需要他是响应式的,这个时候我们可以用`Object.freeze()` 如:
```html
<template>
  <div>
    <div>
      {{ user }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      number: 2,
      price: 10,
      user: Object.freeze({ age: 18 })
    }
  },
  mounted() {
    this.user.age = 20
  }
}
</script>
<style>
.totle {
  padding-top: 20px;
}
</style>
```
当我们给`user`数据加上`Object.freeze()`后,如果再更改user数据控制台就会报错
![](https://user-gold-cdn.xitu.io/2020/7/25/1738415af741152b?w=1341&h=408&f=png&s=66535)

```!
Object.freeze()只能用户对象|数组
```
### 生命周期
```!
下图展示了实例的生命周期。你不需要立马弄明白所有的东西，不过随着你的不断学习和使用，它的参考价值会越来越高。
```

![](https://user-gold-cdn.xitu.io/2020/7/24/1737fe5321e36661?w=1200&h=3039&f=png&s=50021)

上面是官方给出的完整的生命周期流程图,可以说是应用的灵魂,下面我们在代码中实际运行顺序为
```js
  beforeCreate: function() {
    console.log(this)
    console.log('创建vue实例前', this)
  },
  created: function() {
    console.log('创建vue实例后', this)
  },
  beforeMount: function() {
    console.log('挂载到dom前', this)
  },
  mounted: function() {
    console.log('挂载到dom后', this)
  },
  beforeUpdate: function() {
    console.log('数据变化更新前', this)
  },
  updated: function() {
    console.log('数据变化更新后', this)
  },
  beforeDestroy: function() {
    console.log('vue实例销毁前', this)
  },
  destroyed: function() {
    console.log('vue实例销毁后', this)
  }
```
### 挑几个重要的具体说明
- `beforeCreate` 创建vue前调用,这个过程中进行了初始化事件、生命周期
- `created` `vue`创建成功之后,dom渲染之前调用,通常请求数据会写在这个函数里面
-  `mounted` `dom`创建渲染完成时调用,这个时候页面已经渲染完毕,可以再这个函数里面进行dom操作
- `updated` __数据更改且__ 时调用,他和`watch`不同,`watch`只有监听的数据变化就会触发,而 `updated`要求这个变更的数据必须在页面上使用了,且 __只要页面的数据发生变化都会触发这个函数__
- `beforeDestroy/destroyed` `vue` 实例或者说组件销毁前后调用,如果页面中需要销毁定时器和释放内存,可以写在这个函数里

### `destroyed`和`beforeRouteLeave`

`destroyed` 需要和 `vue-router` 中 `beforeRouteLeave` api区别开

通常意义下路由发生变化也就意味上个组件被销毁,所以这两个函数都会触发
`destroyed` 只是个监听功能,不能阻止页面要不要销毁
而`beforeRouteLeave`可以通过`next()`控制路由是否要变化

例如:当需要判断用户是否返回时使用`beforeRouteLeave`而不是`destroyed`

## 关于模板语法
### v-html
双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 `v-html`,比如用`v-html`渲染后端返回回来的富文本内容
```!
值得注意的是:
站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。
```
### 动态参数
`vue`指令支持动态参数,比如:
```html
<a v-on:[eventName]="doSomething">...</a>
```
当`eventName=click`时`doSomething`就是点击事件当`eventName=focus`时doSomething就是focus事件

同理,属性也支持动态形式,如:
```html
<a v-bind:[attributeName]="url"> ... </a>
```
### 计算属性和侦听器
#### 计算属性 VS 方法
两者最大的区别就是
- 计算属性是计算的作用,也就是对数据进行处理
- 计算属性是响应式的且可以基于响应式依赖进行缓存


代码说明:
```html

<template>
  <div>
    <span>数量:</span> <input type="number" ref="dome" v-model="number" />
    <span>价格:</span> <input type="number" v-model="price" />
    <div class="totle">
      <span> 总价: </span>
      <div>
        {{ totle }}
      </div>
      <div>
        {{ totle }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      number: 2,
      price: 10
    }
  },
  computed: {
    totle() {
      console.log(1)
      const totle = this.number * this.price
      return totle > 0 ? totle : 0
    }
  }
}
</script>
<style>
.totle {
  padding-top: 20px;
}
</style>
```
这是例子很简单,就是时时计算totle值,我们在页面上故意写两个`{{totle}}`

![](https://user-gold-cdn.xitu.io/2020/7/25/17383b9d99032b16?w=829&h=255&f=png&s=13132)
但控制台中只输出了一个1,说明计算属性`totle`只计算了一次,页面上第二个`20` 直接用了第一次计算的结果

我们把`totle`改成方法的形式看一看
```html
<template>
  <div>
    <span>数量:</span> <input type="number" ref="dome" v-model="number" />
    <span>价格:</span> <input type="number" v-model="price" />
    <div class="totle">
      <span> 总价: </span>
      <div>
        {{ totle() }}
      </div>
      <div>
        {{ totle() }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      number: 2,
      price: 10
    }
  },
  methods: {
    totle() {
      console.log(1)
      const totle = this.number * this.price
      return totle > 0 ? totle : 0
    }
  }
}
</script>
<style>
.totle {
  padding-top: 20px;
}
</style>

```
控制台打印结果
![](https://user-gold-cdn.xitu.io/2020/7/25/17383bd74286487c?w=1022&h=268&f=png&s=19276)

可以看出`totle`在页面上调用了两次而控制台就输出两次

显然如果有多个数据依赖`totle`,方法的性能开销是计算属性的n倍,下面是官方的解释

![](https://user-gold-cdn.xitu.io/2020/7/25/17383c10e58fb113?w=811&h=138&f=png&s=33458)

#### 计算属性 VS watch
我们使用监听着`watch`实现上述功能
```html
  <div>
    <span>数量:</span> <input type="number" ref="dome" v-model="number" />
    <span>价格:</span> <input type="number" v-model="price" />
    <div class="totle">
      <span> 总价: </span>
      <div>
        {{ totle }}
      </div>
      <div>
        {{ totle }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      number: 2,
      price: 10,
      totle: 20
    }
  },
  watch: {
    price() {
      const totle = this.number * this.price
      this.totle = totle > 0 ? totle : 0
    },
    number() {
      const totle = this.number * this.price
      this.totle = totle > 0 ? totle : 0
    }
  }
}
</script>
```
显然没有计算属性来的优雅,所有项目中,让我们又动态计算需求时最应该使用`计算属性`,而不是`watch`

那什么时候使用`watch`呢?官方给出答案

![](https://user-gold-cdn.xitu.io/2020/7/25/17383ce8bb0e56af?w=758&h=88&f=png&s=15608)

也就是说,当我们处理函数中有异步请求(定时器,ajax)时`应该使用watch`,因为计算属性里面不支持写异步

![](https://user-gold-cdn.xitu.io/2020/7/25/17383d067dd61698?w=622&h=367&f=png&s=25946)
可以看出,编辑器直接提示`computed`不支持异步的写法

#### 总结
- 有动态处理数据的时候优先使用计算属性
- 如果在处理数据逻辑里面有异步需求,使用`watch`
### 事件
#### 事件修饰符
在`Vue`中给元素添加事件可谓是最常见的操作,`Vue`中也为我们提供了很多事件修饰符供我们使用
```html

<!-- 阻止单击事件继续传播 -->
<a @click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a @click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form @submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div @click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div @click.self="doThat">...</div>
```
```!
使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 @click.prevent.self 会阻止所有的点击，而 @click.self.prevent 只会阻止对元素自身的点击。
```
有两个修饰符值得我们注意:
- `once` 点击事件将只会触发一次
- `native` 将原生事件绑定到组件
如:
```js
<item-list @click="clickHandle"></item-list> // 将会触发item-list内部的clickHandle
<item-list @click.native="clickHandle"></item-list> // 将会触发父组件内部的clickHandle
```
官网上给出了很多像上面一样的`小技巧`,大家可以自行查阅

![](https://user-gold-cdn.xitu.io/2020/7/25/173865460027650b?w=389&h=449&f=png&s=20810)

## 关于组件
这应该是最重要的一节,__组件是vue的灵魂__ 在实际开发中,好的组件可以让我们的开发效率及维护成本事倍功半,反之事倍功半
### 如何注册全局组件
在做项目中有些组件是我们经常用的,这样的组件我们可以注册为全局组件,如:注册一个全局的`BaseBtn`组件
- baseben 组件
```html
<template>
  <div class="baseben">
    这是一个按钮组件
  </div>
</template>
```
- main.js 中注册
```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BaseBtn from "@/common/BaseBtn";
Vue.component("base-btn", BaseBtn);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```
- 在页面中使用
```html
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <base-btn></base-btn>
  </div>
</template>
```
- 页面显示
![](https://user-gold-cdn.xitu.io/2020/7/27/1738dec5be0dce30?w=361&h=330&f=png&s=12508)
一切OK,但是如果我们要注册多个去全局组件呢?是不是要重复上面的步骤?
### 自动注册全局组件
关键性方法`require.context`
主要流程是:读取要注册为全局组件的文件路径->循环进行动态注册
```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
Vue.config.productionTip = false;
const requireComponent = require.context(
  // 其组件目录的相对路径
  "./common",
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(
      fileName
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );
  Vue.component(componentName, componentConfig.default || componentConfig);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```
页面还是正常显示

![](https://user-gold-cdn.xitu.io/2020/7/27/1738e0c52d824a43?w=365&h=266&f=png&s=11736)

上文说过,基础组件使用`Base`开头进行命名,所以`require.context`的筛选正则才可以这样写 `Base[A-Z]\w+\.(vue|js)$/`
这样以后只要我们在`common`文件夹下以`Base`开头的文件都会自动注册为全局组件😎
### 自定义组件使用 v-model
比如我们要封装一个input组件,使用的时候这样使用
```html

<base-input v-model="name"></base-input>

data(){
    return{
        name:'刘小灰'
    }
}
```
那我们`BaseInput`里面如何去接受`name`参数呢? 我们可以使用`model`选项,如:
```html
<!--BaseInput.vue-->
<template>
  <div class="inputWarp">
    <input
      type="text"
      :value="value"
      @input="$emit('change', $event.target.value)"
    />
    {{ value }}
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String || Number
    }
  },
  model: {
    prop: "value",
    event: "change"
  }
};
</script>
```
子组件`model`中需要定义`prop`和`event`
- `prop` 给参数重命名,新的变量名需要在`props`中定义
- `event` 触发的事件名称

```!
默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event。
```
上面的代码还可以这样简化
```html
<template>
  <div class="inputWarp">
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    {{ value }}
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String || Number
    }
  }
};
</script>
```
### .sync 修饰符
可能有的人不理解`.sync`有什么用,其实它就是一种子组件改变父组件传过来的`prop`并让父组件数据更新的一种语法糖

那什么时候使用呢?我们来封装一个自定义弹窗`BaseAlert.vue`
```html
<template>
  <div class="baseAlert">
    <div v-if="show" class="alert">
      <div>
        我是一个弹框
      </div>
      <button @click="close">关闭弹窗</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.show = false;
    }
  }
};
</script>
<!--样式可忽略-->
```
在父组件中使用
```html
<template>
  <div class="about">
    <button @click="show = true">打开弹框</button>
    <base-alert :show="show"></base-alert>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  }
};
</script>
```
试验一下

![](https://user-gold-cdn.xitu.io/2020/7/27/1738f11fd6753fc1?w=255&h=202&f=png&s=6093)

![](https://user-gold-cdn.xitu.io/2020/7/27/1738f133355f9c11?w=1524&h=394&f=png&s=44375)
这时候我们思考两个问题
- 为什么可以关闭,但页面为什么会报错?

    因为我们在子组件中让`show=false`但是show是父组件传过来的,我们直接改变它的值`vue`会报错
- 再次点击打开弹窗时,为什么没有反应?

虽然在子组件中`show`的状态是`false`但是在父组件中`show`的状态还是`true`

上面的情况可以解决吗? 肯定可以, 我们只需要点击子组件的关闭按钮时通知父组件,让父组件把`show`的状态变为`false`即可：如
```html
<!--子组件-->
methods: {
    close() {
      this.$emit('close',false)
    }
  }
<!--父组件-->
 <base-alert :show="show" @close="close"></base-alert>
 
methods: {
    close(status) {
        this.show=status
    }
  }
```
问题是 父组件为了关闭弹窗这个简单的功能还需要用一个函数`close`,实在是不太优雅,而`.sync`就是来解决这样类似的场景

我们现在使用`.sync`重构代码
```html
<!--父组件-->
<template>
  <div class="about">
    <button @click="show = true">打开弹框</button>
    <base-alert :show.sync="show"></base-alert>  // 在 :show 改为:show.sync
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    close(status) {
      this.show = status;
    }
  }
};
</script>
```
`BaseAlert`组件改造
```html
<!--BaseAlert-->
<template>
  <div class="baseAlert">
    <div v-if="show" class="alert">
      <div>
        我是一个弹框
      </div>
      <button @click="close">关闭弹窗</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("update:show", false); // 注意把show 改为 update:show
    }
  }
};
</script>
```

![](https://user-gold-cdn.xitu.io/2020/7/27/1738f2af89652795?w=277&h=252&f=png&s=8091)
![](https://user-gold-cdn.xitu.io/2020/7/27/1738f2c9a901884f?w=903&h=300&f=png&s=12559)
这个时候页面功能正常,且没有报错,完美!

### 用插槽封装组件
__公用逻辑的抽离和组合一直是项目中难题,同样也是框架设计者的难题__,在`Vue2.0`中也提供了抽离公共逻辑的方法`Mixins`,但`Mixins`有着明显的缺陷 __无法清楚得知数据来源__ 特别是在一个页面有多个`Mixins`时,页面维护起来简直是种灾难

![](https://user-gold-cdn.xitu.io/2020/7/27/1738f48b69c34725?w=908&h=477&f=png&s=72448)
上面是尤雨溪在VueConf演讲中提到的有关`Mixins`问题

![](https://user-gold-cdn.xitu.io/2020/7/27/1738f4be1858f831?w=879&h=511&f=png&s=105072)
上面是尤雨溪在VueConf演讲中提到插槽有关的问题,因为`插槽`是以组件为载体,所以有额外的组件实例性能消化,但也正是因为以组件为载体,所以也可以封装些样式相关的东西

可以看出在`Vue2.0`中`插槽`是逻辑复用的最优解决方案,当然在`Vue3.0中`有更好的解决方案`composition-api`,现在你应该了解到为什么`Vue3.0`要出`composition-api`了,主要解决的问题就是 __逻辑的分封装与复用__

### 插槽的分类
- 匿名插槽 没有名字的插槽
- 具名插槽 有名字的插槽
- 作用域插槽 可以通信的插槽
- 动态插槽 就是动态插槽

下面我们再来改造下上面的`BaseAlert.vue`组件来学习下各种插槽之间的使用 

需求:
- 可以自定义头部
- 弹窗中可以展示当前日期

假设我们在父组件中这样使用
```html
    <base-alert :show.sync="show">
      <template v-slot:title>
        重大提示
      </template>
      <template v-slot="{ time }">
        这是一个弹窗
        <div class="time">{{ time }}</div>
      </template>
    </base-alert>
```
我们定义了一个具名插槽 `v-slot:title` 和作用域插槽接受子组件的`time`

`BaseAlert.vue`封装
```html

<template>
  <div class="baseAlert">
    <div v-if="show" class="alert">
      <div class="header">
        <slot name="title"></slot>
      </div>
      <div class="contents">
        <slot :time="time"> </slot>
      </div>
      <button @click="close">关闭弹窗</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    time() {
      const d = new Date();
      return d.getFullYear() + "-" + (d.getMonth() - 1) + "-" + d.getDate();
    }
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("update:show", false);
    }
  }
};
</script>
```
作用域插槽的使用就是在`slot`中可以添加自定义属性,在父组件用`v-slot`接收即可

页面效果如下所示(请忽略样式)
![](https://user-gold-cdn.xitu.io/2020/7/27/1738f9dd40abdcfb?w=370&h=297&f=png&s=10019)


关于`匿名插槽`和`动态插槽`理解起来比较简单,就不举例子说明了


### 动态组件
我们可以通过`is`关键字动态加载组件,同时使用`keep-alive`可对组件进行缓存,在tab切换场景中使用较多,如:
```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```
`keep-alive`也可和路由搭配使用可以把项目的整体体验提升一个段,后续写`重学vue-Router`的时候会讲到

### 异步组件  
当一个组件比较大的时候,为了不影响整个页面的加载速度,我们需要使用异步去加载整个组件,和异步路由写法一样,异步组件使用如下:
```js
new Vue({
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```
值得注意的是,官方还支持对异步组件加载状态进行配置

![](https://user-gold-cdn.xitu.io/2020/7/28/17393522e24d427b?w=731&h=607&f=png&s=60030)
但是我在vue-cli测试的时候`delay`属性一直无效,不知道你们如何配置异步组件加载状态的呢?欢迎留言谈论


### 组件之间通信

组件之间的通讯一直是`vue`的高频考点,也是在项目开发中比较重要的一个知识点,下面我就带领大家总结下,`vue`组件通讯都有哪些,且分别适用于哪些场景

#### 常规通讯方式1(推荐使用)
- 父组件给子组件传递数据

    父组件调用子组件用 `:(v-bind)` 绑定数据
    ```html
    <!--父组件-->
    <item-list :item="data"></item-list>
    ```
    子组件用 `props` 接收
    ```js
    <!--子组件-->
    export default {
        props:{
            item:{
                type:Object
            }
        }
    }
    ```
- 子组件给父组件传递数据
  
    子组件通过触发事件的方式 `$emit` 给父组件传递数据
    ```html
    <!--子组件-->
    <template>
      <div>
        我是子组件
        <button @click="btnClick">点击传递数据</button>
      </div>
    </template>
    <script>
    export default {
      methods: {
        btnClick() {
          this.$emit("childFn", "数据");
        }
      }
    };
    </script>
    ```
    父组件用对应的事件去接收
    ```html
    <button @click="btnClick"  @childFn="childFn">点击传递数据</button>
    
     <script>
        export default {
          methods: {
              childFn(val) {
                 console.log(val); //数据
                }
          }
        };
    </script>
   ```
   
- 父组件触发子组件方法

    父组件通过ref的方式调用子组件方法
    ```html
    <button @click="btnClick"  ref="hello">点击传递数据</button>
    
     <script>
        export default {
          methods: {
              btnClick(val) {
                this.$refs['hellow'].子组件方法
                }
          }
        };
    </script>
    ```
- 子组件触发父组件方法

    通过`$emit`触发父组件方法,和上面的 __子组件给父组件传递数据__ 一样
    
#### 常规通讯方式2(不推荐使用)
在父组件里想拿到子组的实例很简单`this.$children` 就可以拿到全部子组件的实例,只要拿到组件的实例,那事情都变的简单了
- 通过实例改变子组件的数据及调用子组件的方法
```js
this.$children['组件名称'].xxx  //改变子组件数据
this.$children['组件名称'].xxx()  // 调用子组件方法
```
子组件调用父组件的道理也一样,用`this.$parent`即可

这种父子组件通讯的方式这么简单,为什么不推荐使用呢?刚开始学vue的时候我也有这样的疑问,但是通过做项目的时候发现,这样通讯最要命的弊端就是 __数据状态改变不明了__, 特别是一个父组件里面有很多子组件,当父组件数据改变时你并不知道是哪个子组件所为, 就和使用mixins所带来的尴尬一样

下面是官方给出的解释
 ![](https://user-gold-cdn.xitu.io/2020/7/30/1739d6a5a6cad119?w=792&h=152&f=png&s=14858)

值得注意的是,官方并没给出父子组件隔代通讯及兄弟组件之间通讯的相关API,如果业务里面有这样的需求我们只能用`vuex`这种第三方状态管理器,但如果我们是封装项目的基础组件,或者自己做个组件库,这个时候并不能依赖`vuex`,那我们应该怎么样方便快捷的去实现呢?

下面所说的方式推荐在开发独立组件的时候使用,不推荐在项目组件中直接使用

#### 独立组件之间的通信方式

- `provide / inject`

    主要用于子组件获取父组件的数据/方法,如:
    ```js
    <!--父组件-->
    export default {
      name: "Home",
      provide: {
        name: "公众号码不停息" // 传数据
      },
  }
  ```
    ```js
    <!--子组件-->
    export default {
      inject: ["name"], // 接受数据
      mounted() {
        console.log(this.name); //公众号码不停息
      }
    };
    ```

并且``provide / inject`还支持隔代传递

## 参考
阮一峰MVC，MVP 和 MVVM 的图示 http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html
https://www.zhihu.com/question/327050991

commonjs
amd
cdm
es module