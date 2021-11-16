# svelte
https://www.sveltejs.cn/tutorial/declaring-props
1、 你可以使用特殊标记 {@html ...} 实现：转译 html
2、 属性简写 名字相同时简写 <img {src} alt="A man dances.">
3、 使用 `$：` 声明反应式的值和语句
4、 反应性是通过 赋值语句出发的 ，因此数组使用 `push` `splice` 之类的预发不会触发自动更新
```js
function addNumber() {
	numbers.push(numbers.length + 1);
	numbers = numbers;
}
function addNumber() {
	numbers = [...numbers, numbers.length + 1];
}
```
赋值给数组和对象的 属性（properties） （例如，obj.foo += 1 或 array[i] = x）与对值本身进行赋值的方式相同。

`被更新的变量的名称必须出现在赋值语句的左侧。`
