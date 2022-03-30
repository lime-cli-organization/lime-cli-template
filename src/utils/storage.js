/**
 *
 * @param { string }  name 键
 * @param { any } value 值
 * @param { number } delay 失效时间
 */
export const setCookie = (name, value, delay = 8) => {
  const exp = new Date();
  exp.setTime(exp.getTime() + 1000 * 60 * 60 * delay);
  document.cookie = `${name}=${escape(
    value
  )};expires=${exp.toGMTString()};path=/`;
};

export const getCookie = (name) => {
  //匹配字段
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) return arr[2];
  else return null;
};

export const delCookie = (name) => {
  setCookie(name, ' ', -1);
};

export const setSessionStorage = (key, value) => {
  if (typeof value === 'string') {
    sessionStorage.setItem(key, value);
  } else {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getSessionStorage = (key) => {
  return JSON.parse(getSessionStorage(key));
};
