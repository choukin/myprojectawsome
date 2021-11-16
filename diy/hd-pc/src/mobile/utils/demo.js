
// import dayjs from 'dayjs'
// import { JSEncrypt } from 'jsencrypt'
// import sha1 from 'sha1'
// import CryptoJS from 'crypto-js'
const CryptoJS = require('crypto-js')
const iv = '21520baeed8a48eb'
/**
 * 加密
 */
//  function encryptByAES (message, key) {
//     message = JSON.stringify(message)
//     key = key.substr(0, 16)
//     console.log(key, 'key')
//     var keyHex = CryptoJS.enc.Utf8.parse(key)
//     var encrypted = CryptoJS.AES.encrypt(message, keyHex, {
//       iv: CryptoJS.enc.Utf8.parse(iv),
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7
//     })
//     return encrypted.toString()
//   }

/**
   * 解密
   */
function decryptByAES(ciphertext, key) {
  var keyHex = CryptoJS.enc.Utf8.parse(key)

  var decrypted = CryptoJS.AES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    },
    keyHex,
    {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  )

  return decrypted.toString(CryptoJS.enc.Utf8)
}
const text = '+vqanz/YwFwInhujRR7d0jdLfJemDEobYnRuRoAXe/aLw7j4olF5UN9acYpL5n8fh+oFK9vBIket5hu/cO3vd7Gnp29X9580PtdSv+yjeXi/hk74PhLw3PlRkhcmbpXk00j3Xh4XsUQ9ow2Afon/zy6JN/QdGQGY3eD8eZ+rhIo='
const key = 'e0140300fd4f02007b84ec29fcd04d0f9eb47954c831f730'.substr(0, 16)
console.log(decryptByAES(text, key))
