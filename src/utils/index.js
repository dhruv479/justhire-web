const parseJwt = token => {
  const base64Url = token.split('.')[1];
  if (typeof base64Url === 'undefined') {
    location = `${process.env.VUE_APP_LOGIN_URL}?redirect=${window.location.href}`;
  }
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
};

const updateJwt = (sid, value, index) => {
  const jsObj = parseJwt(sid);
  const sidSplit = sid.split('.');
  jsObj[index] = value;
  sidSplit[1] = window.btoa(JSON.stringify(jsObj));
  localStorage.setItem('sid', sidSplit.join('.'));
  return jsObj;
};

export default {
  parseJwt,
  updateJwt,
  getUserId() {
    return parseJwt(localStorage.getItem('sid')).id;
  },
  getUserType() {
    return parseJwt(localStorage.getItem('sid')).userType;
  }
};
