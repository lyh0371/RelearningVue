## 手写 Vue 核心代码,主要是响应式

## 方法说明

- defineReative
<!-- 执行Object.defineprotity外部方法 -->

- observe
<!-- 遍历指定数据对象的每个 key,拦截之 -->

### 构造函数

- vue 框架构造函数
- Observer 执行数据响应化(判断数据是数组还是对象)
- Compile 编译器模板, 初始化视图, 收集依赖(更新函数,watcher 创建)
- Watcher 执行跟新函数(dom 更新 小秘书
- Dep 管理多个 Watcher 批量更新 大管家
