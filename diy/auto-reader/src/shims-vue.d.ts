
declare module 'vue-canvas-poster-yufan';
declare module 'vue-canvas-poster' {

}
declare module 'vue-introjs'{

}
declare module '*.vue' {
  import Vue from 'vue'
  import VueRouter, { Route } from 'vue-router'
  import { IUserBase, IUserState } from '@/utils/cookies'

  module 'vue/types/vue' {
    interface Vue {
      $route: Route
      $router: VueRouter
      $get: any
      $post: any
      $fetchGet: any
      $fetchPost:any
      $isAndroid: any
      $isIOS: any
      $toGeisWeChatt: any
      $isMiniProgram: any
      $Host: string
      $isWeChat: boolean
      token: string
      idCode: string
      resetType: number
      randomKey: string
      autoReader: boolean
      $channel: string
      $channelCode: string
      $isApp:boolean
      userBase: IUserBase
      $intro():any
      reset(): void
      start(): void
      $replaceURL(routerName:string):void
    }
  }
  // export default Vue
}
