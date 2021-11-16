/**
 * 获取Url参数中指定name的值
 * @param name 参数名称
 * @returns {string}
 */
export const getURLParam = (name: string) => {
  let re = new RegExp('(^|&)' + name + '=([^&#]*)(&|$)')
  let value = ''
  let arrHash = window.location.hash.split('?')
  let arrSearch = window.location.search.substr(1).split('?')
  arrHash.shift()
  let arr = arrSearch.concat(arrHash)

  for (let i = 0; i < arr.length; i++) {
    let r = arr[i].match(re)
    if (r !== null && r[2]) {
      value = r[2]
      break
    }
  }
  return value
}

//延时函数
export const sleep = function(delay: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(1)
      } catch (e) {
        reject(0)
      }
    }, delay)
  })
}

/**
 * 覆盖历史记录跳转页面
 * @param url 
 */
export function replaceURL(routerName:string):void{
  let url = window.location.protocol + '//' +window.location.host+window.location.pathname+'#/'+routerName
  window.location.replace(url)
}


//<转义为<
export function escapeHTML(str: string){
  str = "" + str;
  return str.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, "'").replace(/'/g, "'");
}
//<还原为<
export function unescapeHTML(str: string){
  str = "" + str;
  return str.replace(/& lt;/g, "<").replace(/& gt;/g, ">")
}

/**
 * 预加载图片
 * @param imgsrc 
 */
export function preLoadImg(imgsrc:string){
  const img = new Image()
  img.src=imgsrc; 
  return img.decode()
  
}