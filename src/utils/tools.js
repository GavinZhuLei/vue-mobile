export const getRect = (el) => {
  if (el instanceof window.SVGElement) {
    const rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    }
  }
  return {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight,
  }
}

export const getQueryStringByName = (name) => {
  const result = window.location.search.match(new RegExp(`[\?\&]${name}=([^\&]+)`, 'i'));

  if (result == null || result.length < 1) {
    return '';
  }

  return result[1];
}

export default { getRect, getQueryStringByName }
