export const isEmpty = (data) => {
  if (
    data === null ||
    data === undefined ||
    data === '' ||
    data === 'undefined' ||
    data === 'null'
  ) {
    return true;
  }
  // 空对象、数组
  if (
    typeof data === 'object' &&
    (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]')
  ) {
    return true;
  }
  return false;
};

/**
 * 将对象转换成&拼接的字符串
 * @param {object} obj 需要转换的对象
 * @returns 转换后的字符串
 */
export const obj2params = (obj) => {
  const arr = [];
  for (const key in obj) {
    arr.push(key + '=' + obj[key]);
  }
  return arr.join('&');
};
