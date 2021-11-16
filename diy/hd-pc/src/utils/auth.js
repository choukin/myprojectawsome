import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const MobileTokenKey = 'Mobile-Token'

export function getMobileToken() {
  return Cookies.get(MobileTokenKey)
}

export function setMobileToken(token) {
  return Cookies.set(MobileTokenKey, token, { expires: 3 })
}

export function removeMobileToken() {
  return Cookies.remove(MobileTokenKey)
}
const AvatarKey = 'AvatarKey'
export function getAvatar() {
  return Cookies.get(AvatarKey)
}

export function setAvatar(avatar) {
  return Cookies.set(AvatarKey, avatar)
}

export function removeAvatar() {
  return Cookies.remove(AvatarKey)
}
