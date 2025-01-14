export const validateSchoolEmail = (email: string): boolean => {
  // 校园邮箱格式验证
  const schoolDomains = ['edu.cn']; // 可配置的学校域名列表
  return schoolDomains.some(domain => email.endsWith(domain));
};

export const sendVerificationEmail = async (email: string): Promise<void> => {
  // 发送验证邮件
}; 