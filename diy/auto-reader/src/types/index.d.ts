export interface UploadFile{
  url: string
  status: string
  message: string
}
export interface Task{
  addInfo?: string,
  "beforeExposure"?: string
  "contId"?: number
  "contName"?: string
  "contType"?: string
  "contUrl"?: string
  "createTime"?: string
  "createUser"?: number
  "endExposure"?: string
  "exposureIng"?: number
  "id"?: number
  "orderPlatform"?: string
  "orderType"?: string
  "percentage_parent"?: string
  "percentage_top"?: string
  "price"?: number
  "remarks"?: string
  "siteCode"?: string
  "status"?: number
  "statusName"?: string
  "targetExposure"?: number
  "taskType"?: string
  "unitPrice"?: number
  audit?: string
  userPrice?: number
  userState?: string
  userTime?: string
  wxUserId?: string
}
/**
 * 收益排名
 */
export interface IRanking{
  index?:number
  headimgurl: string
  nickname: string
  sumamount: number
}

/**
 * 我的页面数据
 */
export interface MyPageInfo{
  earningsAmount: number
  subUserCount: number
  unWithdrawSumAmount:number
  yesterdaySubPayTribute:number
  headimgurl?:string
  nickname?:string
  idcode?:string
}

export interface ADInfo{
  adName?:string
  imageUrl?:string
  link?: string
  showType?:number // showType：0:App内url webview展示 1:app内路由 2外链http开头的 3无点击事件
  id?: number


}
/**
 * 未提现收益
 */
export interface WithdrawInfo{
  awardAmount: number
  earningsAmount: number
  endEarningsAmount: number
  minAmount: number
  subEarningsAmount: number
  sumAmount: number
  sumPrentice: number
}