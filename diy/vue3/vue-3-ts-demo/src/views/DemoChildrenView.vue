<template>
  <!-- 挂载dom元素 -->
  <div class="msg" :class="$style.msg">
    子路由、

    <router-view />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
  reactive,
  toRef,
  toRefs,
  watch,
  watchEffect,
  computed,
  useCssModule,
} from "vue";
import type { ComputedRef } from "vue";
import Tab from "@cp/Tab.vue";
import Child from "@cp/Child.vue";
interface Member {
  id: number;
  name: string;
}
export default defineComponent({
  name: "DemoView",
  components: {},
  setup() {
    const msg = ref<string>("Hello world");

    const phoneNumber = ref<number | string>(1380013800);

    const userInfo = reactive<Member>({
      id: 1,
      name: "jack",
    });

    const uids = ref<number[]>([1, 2, 3]);

    const names = ref<string[]>(["tom", "petter", "andy"]);

    // 定义挂载节点，声明类型
    const msgref = ref<HTMLElement | null>(null);
    const child = ref<typeof Child | null>(null);

    const memberList = ref<Member[]>([
      { id: 1, name: "Jack" },
      { id: 2, name: "emme" },
    ]);

    const memberList2: Member[] = reactive([
      {
        id: 4,
        name: "anna",
      },
      {
        id: 5,
        name: "duo",
      },
    ]);
    // 不破坏 reactive 的响应性操作
    memberList2.length = 0;
    memberList2.push({ id: 6, name: "jarry" });
    // reactive的数据解构后会失去响应性

    // toRef 创建一个新的 ref 变量，转换 reactive对象的某个字段为ref变量
    // 接收两个参数，第一个参数是 reactive 对象，第二个参数是要转换的key
    // const name: string = toRef(userInfo, "name");
    // 修改 name.value 值会同同时修改 name 和 userInfo.name 的值

    // toRefs 创建一个新的 对象， 它的每个字段都是reactive 对象各个字段的ref变量
    // 接收一个参数 就是 ractive 对象
    const userInforefs = toRefs(userInfo);

    setTimeout(() => {
      userInfo.id = 20;
      userInfo.name = "小土豆";
      firstName.value = "petter";
      foo.value = "perter2";
    }, 2000);
    // 每个字段都是ref变量

    const firstName = ref<string>("bill");

    const lastName = ref<string>("gates");

    // 定义出来的 computed 变量 和 ref 变量的用法一样， 也是需要通过.value 才能拿到它的值
    // computed的 value 是只读的
    // 计算属性，数据的计算是基于它的响应依赖关系缓存的，只在相关响应式依赖发生改变时他们才重新求值；

    // 应用场景
    // 数据拼接和计算
    // 复用组件的动态数据
    // 获取多级对象的值 可以结合 try catch 无需处理判断
    // 不同数据类型的数据转换

    const fullName: ComputedRef<string> = computed(
      () => `${firstName.value} ${lastName.value}`
    );

    // setter 的使用
    const foo = computed({
      // 需要明确返回值
      get() {
        return `${firstName.value} ${lastName.value}`;
      },
      // 这里需要接收参数，赋值给下面的值
      set(newValue: string) {
        firstName.value = newValue;
      },
    });

    const tags = ref<string[]>([]);

    const tagsStr = computed({
      get() {
        return tags.value.join(",");
      },
      set(newValue: string) {
        tags.value = newValue.split(",");
      },
    });

    function changeMsg() {
      msg.value = "Hi Vue3";
    }

    const pageInit = () => {
      console.log("pageinit");
    };

    // 保证视图渲染完毕后在执行节点操作  onMounted/ nextTick
    onMounted(() => {
      pageInit();
      console.log(msgref?.value?.innerText);

      // 或者操作子组件里的数据
      if (child.value) {
        child.value.isShowDialog = true;
      }
    });
    console.log(1);

    onBeforeMount(() => {
      console.log("onBeforeMount", 2);
    });

    onMounted(() => {
      console.log("onmounted", 3);
    });
    console.log(4);

    // 监听
    watch(msg, (newValue, oldValue) => {
      console.log("监听整个 ref", msg.value, newValue, oldValue);
    });

    watch(
      () => msg.value,
      () => {
        console.log("只监听value");
      }
    );
    // 如果一个函数里包含了多个需要监听的数据，一个一个数据去监听太麻烦了， 可以使用 watchEffect,
    // 它立即执行传入的函数，同时响应式追踪其依赖，并在依赖变更时重新运行该函数

    const getMsg = (): void => {
      console.log("watcheffect", msg.value);
    };

    watchEffect(getMsg);
    // 1\ watch 可以访问监听变化前后的值，而 watchEffect 没有，
    // 2、 watch默认是在属性变化的时候才执行设置 immediate 可以启动默认执行，而watchEffect 则默认会执行一次，然后属性变化的时候也执行

    // 动态绑定 css
    const activeClass = "activeClass";
    const activeClass1 = "activeClass1";
    const activeClass2 = "activeClass2";
    const isActive = true;

    // :syle 动态修改内联样式 绑定对象
    // key 是 css 的小驼峰写法，或者短横线， value 是css的合法值

    const style1 = {
      fontSize: "13px",
      "line-height": 2,
      "text-align": "center",
    };
    const style2 = {
      color: "#ff00FF",
    };

    // 使用 v-vind 动态修改style 绑定到 <style/> 3.2.0 版本后才有的功能
    // 利用现代浏览器支持的CSS变量来实现这个功能 使用时需要注意兼容性
    // 修改不会触发模版重新渲染
    const fontColor = ref<string>("#ffffff");

    // 样式表的组件作用域
    // style scoped
    // style module 把css 修改成随机hash

    // useCssModule全新api 面向 script 部分操作Css Modules 只能在 setup 或者 scriopt setup 里使用

    setTimeout(() => {
      fontColor.value = "red";
    }, 2000);

    // 可以指定modules名称
    //<style module="classes"></style>
    // const style = useCssModule('classes')
    const style = useCssModule();
    console.log(style);

    const content = `<p class="${style.msg}">
      <span class="${style.textColor}">HelloWorld -- from v-html</span>
    </p>`;

    // 深度操作符
    // 为了方便修改子组件的样式 通过 ::v-deep 或者 ：deep 操作符来修改

    return {
      msg,
      phoneNumber,
      msgref,
      child,
      ...userInforefs,
      changeMsg,
      fullName,
      foo,
      tagsStr,
      tags,
      activeClass,
      activeClass1,
      activeClass2,
      isActive,
      style1,
      style2,
      fontColor,
      content,
    };
  },
});
</script>
<style module>
.msg {
  font-size: 40px !important;
}
.textcolor {
  color: #ff0000;
}
.msg ::v-deep(.b) {
  background-color: red;
}
</style>
<style lang="stylus" scoped>
// 定义颜色
$color-black = #333
$color-red = #ff000
.msg
  font-size 14px
  color v-bind(fontColor)
  :deep(.b)
    background-color $color-red
</style>
