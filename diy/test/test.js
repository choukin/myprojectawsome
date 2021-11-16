
function f(x) {
    console.log('=====');
    console.log(x);
    var x = 200;
  }
  // 由于“非惰性求值”，所以下面的代码在函数调用上完全等义于上例中`f(a = 100)`
  f(100);



  function foo(x = 100) {
    console.log(x);
  }
  foo();