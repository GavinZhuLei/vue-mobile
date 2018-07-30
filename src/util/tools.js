export const getAuthUrl = () => {
  return location.href.replace(location.hash, '')
}

export const getOrigin = () => {
  let baseUrl
  if (typeof location.origin === 'undefined') {
    baseUrl = `${location.protocol}//${location.host}`
  } else {
    baseUrl = window.location.origin
  }

  return baseUrl
}
