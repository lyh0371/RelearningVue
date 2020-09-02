class Vue {
  constructor(options) {
    this.data = options.data;
    new observe(this.data);
  }
}

// 处理响应式
class observe {
  constructor(data) {
    this._data = data;
    this.walk(data);
  }
  walk(data) {
    for (const key in data) {
      this.defactive(data, key, data[key]);
    }
  }
  defactive(obj, key, val) {
    Object.defineProperty(obj, key, {
      set(oldval, newval) {
        if (typeof val === Object) {
          // 如果还是个对象,在进行依赖收集
          walk(val);
        }
        console.log("set", newval);
      },
      get() {
        console.log("get");
      },
    });
  }
}

let v = new Vue({
  data: {
    name: {
      love: "哈哈",
    },
    age: 20,
  },
});
console.log(v.data.name.love);
// v.data.age = "22";
