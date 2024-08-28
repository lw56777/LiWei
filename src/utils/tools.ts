export function getLocalStorage (key: string) {
  const value = localStorage.getItem(key);
  if (!value) return;
  return JSON.parse(value);
}

// 获取指定区间内的随机整数
export function getRandomInt (min: number, max: number) {
  min = Math.ceil(min); // 确保最小值是整数
  max = Math.floor(max); // 确保最大值是整数
  return Math.floor(Math.random() * (max - min + 1)) + min; // 加1是因为包括最大值
}

// 数组转策略
export function arrayToStrategy (arr: any[], labelKey: string | Function, valueKey: string | Function) {
  const strategy: { [key: string]: any } = {};

  const labelKeyFn = typeof labelKey === 'function' ? labelKey : (item: any) => item[labelKey];
  const valueKeyFn = typeof valueKey === 'function' ? valueKey : (item: any) => item[valueKey];

  arr.forEach(item => {
    strategy[labelKeyFn(item)] = valueKeyFn(item);
  });

  return strategy;
}