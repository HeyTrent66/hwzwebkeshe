export const generateStudentId = (): string => {
  // 生成随机数字
  return Math.floor(Math.random() * 1000000).toString();
}; 