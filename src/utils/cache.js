const np = '__saleRecord#$__';

export function storeCache(name, value) {
  localStorage.setItem(`${np}${name}`, value);
}

export function getCache(name) {
  return localStorage.getItem(`${np}${name}`);
}

export function removeCache(name) {
  return localStorage.removeItem(`${np}${name}`);
}
