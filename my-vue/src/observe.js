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
  //   循环遍历进行相应式拦截处理
  for (const key in obj) {
    defineReative(obj, key, obj[key]);
  }
}

let obj = {
  name: "码不停息",
};

observe(obj);
