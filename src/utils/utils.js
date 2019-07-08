export const isMobile = () => {
  let isMobile = false;
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    isMobile = true;
  }
  return isMobile;
}

export const getQueryStringByName = () => {
  let result = window.location.search.match(
    new RegExp('[?&]' + name + '=([^&]+)', 'i'),
  );
  if (!result || result.length < 1) {
    return ''
  }
  return result[1];
}