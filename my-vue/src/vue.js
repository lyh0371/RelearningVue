// 响应式核心
function defineReative(obj, key, val) {
  // 如果val 是对象, 需要在执行observe做响应式
  observe(val);

  // Dep 创建

  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      // 依赖收集
      Dep.target && dep.addDep(Dep.target);

      return val;
    },
    set(newval) {
      if (newval != val) {
        val = newval;
        // 如何新值也是对象,还需要对新值做响应式处理
        observe(newval);

        // 通知更新
        dep.notify();
        // watchers.forEach((watcher) => watcher.update());
      }

      // console.log("set", key, newval);
    },
  });
}
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  //   创建一个Onserve去拦截
  new Observe(obj);
}

class Observe {
  constructor(val) {
    this.val = val;
    // 判断是对象还是数组,做不同的操作

    this.walk(val);
  }
  walk(obj) {
    //   循环遍历进行相应式拦截处理
    for (const key in obj) {
      defineReative(obj, key, obj[key]);
    }
  }
}

// proxy  代理函数

function proxy(vm, key) {
  const opt = vm[key];
  for (const k in opt) {
    Object.defineProperty(vm, k, {
      get() {
        return vm[key][k];
      },
      set(v) {
        vm[key][k] = v;
      },
    });
  }
}
class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    observe(this.$data);
    proxy(this, "$data");
    new Compile("#app", this);
  }
}

//

class Compile {
  // 数组元素
  constructor(el, vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;

    if (this.$el) {
      this.compile(this.$el);
    }
  }
  compile(el) {
    const nodes = el.childNodes;
    nodes.forEach((node) => {
      if (node.nodeType === 1) {
        //元素节点
        this.compileElement(node);
        // 递归
        node.childNodes && this.compile(node);
      } else if (node.nodeType === 3 && this.isInter(node)) {
        // 文本节点
        // console.log(RegExp.$1);
        this.compileText(node);
      }
    });
  }
  // 判断是不是动态文本 主要是判断是不是有{{}}

  isInter(node) {
    return /\{\{(.*)\}\}/.test(node.textContent);
  }
  // 编译文本
  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1];

    this.update(node, RegExp.$1, "text");
  }
  //  编译元素 主要处理元素上的事件 及指令
  compileElement(node) {
    // 获取属性并遍历之
    const nodeAttr = node.attributes;
    Array.from(nodeAttr).forEach((attr) => {
      const attrName = attr.name; // k-xxx
      const exp = attr.value; // yyy

      if (this.isDirective(attrName)) {
        // 如果是我们自己的属性,直接调用
        const dir = attrName.substring(2);
        this[dir] && this[dir](node, exp);
      }
      console.log(attrName, exp);
    });
  }
  // 判断属性是不是以v-开头
  isDirective(attr) {
    return attr.indexOf("v-") === 0;
  }
  // v-text 对应的操作方法
  text(node, exp) {
    this.update(node, exp, "text");
  }
  textUpdater(node, val) {
    node.textContent = val;
  }
  // 提取updata, 初始化函数和更新函数创建

  update(node, exp, dir) {
    const fn = this[dir + "Updater"];
    // 初始化

    fn && fn(node, this.$vm[exp]);

    // 更新
    new Watcher(this.$vm, exp, function (val) {
      console.log(val);
      fn && fn(node, val);
    });
  }
}

// Wactch

const watchers = [];
class Watcher {
  constructor(vm, key, updaterFn) {
    this.vm = vm;
    this.key = key;
    this.updaterFn = updaterFn;

    // watchers.push(this);

    Dep.target = this;
    this.vm[this.key];
    Dep.target = null;
  }

  update() {
    this.updaterFn.call(this.vm, this.vm[this.key]);
  }
}

// 管理Watcher 和某个key对应,
class Dep {
  constructor() {
    this.desp = [];
  }
  addDep(watcher) {
    this.desp.push(watcher);
    console.log("desp", this.desp);
  }

  notify() {
    this.desp.forEach((w) => w.update());
  }
}
