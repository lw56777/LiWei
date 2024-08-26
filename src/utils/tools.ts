export function getRandomInt (min: number, max: number) {
  min = Math.ceil(min); // 确保最小值是整数
  max = Math.floor(max); // 确保最大值是整数
  return Math.floor(Math.random() * (max - min + 1)) + min; // 加1是因为包括最大值
}