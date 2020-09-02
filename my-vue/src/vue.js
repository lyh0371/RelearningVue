// 响应式核心
function defineReative(obj, key, val) {
  // 如果val 是对象, 需要在执行observe做响应式
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key, val);
    },
    set(oldval, newval) {
      // 如何新值也是对象,还需要对新值做响应式处理
      observe(newval);
      console.log("set", key, newval);
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
  }
}

//

class Compile {
  // 数组元素
  constructor(el, vm) {}
}
