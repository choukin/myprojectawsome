<template>
  <li :class="prefixClass" @click="clickhandle">
    <template v-if="link">
      <a :href="link" class="link">
        <div :class="prefixClass + '-box'">
          <label :class="prefixClass + '-label'">
            <slot name="icon" />
            <span v-if="label">{{ label }}</span>
          </label>

          <div :class="prefixClass + '-main'">
            <slot />
          </div>

          <div :class="prefixClass + '-arrow'">
            <slot name="right-icon" />
            <slot name="arrow"><i class="icon-base icon-xiangyoujiantoux" /></slot>
          </div>
        </div>
      </a>
    </template>

    <template v-else-if="!link" @click="clickhandle">
      <div :class="prefixClass + '-box'">
        <label :class="prefixClass + '-label'">
          <slot name="icon" />
          <span v-if="label">{{ label }}</span>
        </label>

        <div :class="prefixClass + '-main'">
          <slot />
        </div>

        <div :class="prefixClass + '-right-icon'" @click="rightIconhandle">
          <slot name="right-icon" />
        </div>
      </div>
    </template>
  </li>
</template>

<script>
/**
   * @desc 列表项 - Cell，依赖列表组件 - List
   * @module components/list/cell
   * @param {Object} props
   * @param {String} [props.label] - label描述
   * @param {Boolean}[props.link] - 跳转链接
   * @param {Object} slot
   * @param {Object} slot.default - 默认slot接收列表信息、input
   * @param {Object} slot.icon - label描述前的icon
   * @param {Object} slot.right-icon - 列表右边的icon
   * @param {Object} slot.arrow - 列表右边的icon、默认放的向右的箭头
   * @param {Object} event
   * @param {Function} event.click - 点击按钮回调
   * @param {Function} event.rightIconClick - 右边icon回调
   * @example
   * import { List, Cell } from '@/mobile/components/'
   *  // 输入框
   * <list>
   *   <cell>
   *      <i class="icon-base icon-jiagepaixu blue" slot="icon"></i>
   *      <input type="text" placeholder="请输入姓名" />
   *   </cell>
   *   <cell>
   *      <i class="icon-base icon-jiagepaixu blue" slot="icon"></i>
   *      <input type="tel" placeholder="请输入年龄" />
   *   </cell>
   * </list>
   *
   *  // 列表项
   * <list>
   *    <cell label="没有列表信息" link="/btn">
   *      <i class="icon-base icon-xiangyoujiantoux" slot="arrow"></i>
   *    </cell>
   *    <cell label="列表标题" @click="handle" link="javascript:void(0)">
   *      <div>带事件</div>
   *      <i class="icon-base icon-xiangyoujiantoux" slot="arrow"></i>
   *     </cell>
   *    <cell label="列表标题" link="/btn">
   *      <div>带连接</div>
   *      <i class="icon-base icon-xiangyoujiantoux" slot="arrow"></i>
   *    </cell>
   *  </list>
   *
   */
export default {
  name: '',
  props: {
    label: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixClass: 'nb-cell'
    }
  },
  methods: {
    clickhandle(evt) {
      this.$emit('click', evt)
    },
    rightIconhandle(evt) {
      this.$emit('rightIconClick', evt)
    }
  }
}

</script>

<style lang="scss">
  @import '~!/assets/style/base.scss';
  $prefixClass: nb-cell;

  .#{$prefixClass} {
    box-sizing: border-box;
    background-color: #fff;
    height: 1rem;
    display: block;

    &-box {
      box-sizing: border-box;
      display: flex;
      overflow: hidden;
      align-items: center;
      @include border(1px, solid, #EBEBEB, 'bottom');
      margin-left: .4rem;
      padding-right: .4rem;
      height: 1rem;
    }

    &:last-child &-box{
      border-bottom: none;
    }

    .link {
      height: 1rem;
      display: block;
      box-sizing: border-box;
      color: #2D2F46;
    }
    .link:visited &-box, a:active &-box{
      @include border(1px, solid, #EBEBEB, 'bottom');
    }

    .link:active{
      background-color: #FBFAFB;
    }

    &-label {
      color: #2D2F46;
      font-size: .28rem;
      max-width: 3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      align-items: center;
      .iconfont {
        font-size: .36rem;
        margin-right: .30rem;
      }
      span {
        margin-right: .4rem;
      }
    }

    &-main {
      flex: 1;
      font-size: .28rem;
      color: #B2B4C6;
      text-align: right;
      input {
        font-size: .28rem;
        padding: .2rem 0;
        display: block;
        width: 100%;
        color: #2D2F46;
      }
      input::-webkit-input-placeholder{
        color: #B2B4C6;
      }

    }

    &-arrow {
      .iconfont {
        padding-left: .3rem;
        font-size: .24rem;
        color: #B2B4C6;
      }
    }

    &-right-icon {
      .iconfont {
        padding-left: .3rem;
        font-size: .32rem;
        color: #B2B4C6;
      }
    }
  }
</style>
