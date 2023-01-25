const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(1).max(50).required().messages({
      "string.base": `"a" should be a type of 'text'`,
      "string.empty": `使用者名稱不能為空字段。`,
      "any.required": `"a" is a required field`,
    }),
    email: Joi.string().min(6).max(50).required().email().messages({
      "string.base": `"a" should be a type of 'text'`,
      "string.empty": `電子郵件不能為空字段。`,
      "string.min": `電子郵件最小長度應為 {#limit}。`,
      "string.email": `請輸入有效的電子郵件地址。`,
      "any.required": `"a" is a required field`,
    }),
    password: Joi.string().min(6).max(1024).required().messages({
      "string.base": `"a" should be a type of 'text'`,
      "string.empty": `密碼不能為空字段。`,
      "string.min": `密碼最小長度應為 {#limit}。`,
      "any.required": `"a" is a required field`,
    }),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email().messages({
      "string.base": `"a" should be a type of 'text'`,
      "string.empty": `電子郵件不能為空字段。`,
      "string.min": `電子郵件最小長度應為 {#limit}。`,
      "string.email": `請輸入有效的電子郵件地址。`,
      "any.required": `"a" is a required field`,
    }),
    password: Joi.string().min(6).max(1024).required().messages({
      "string.base": `"a" should be a type of 'text'`,
      "string.empty": `密碼不能為空字段。`,
      "string.min": `密碼最小長度應為 {#limit}。`,
      "any.required": `"a" is a required field`,
    }),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;

module.exports.loginValidation = loginValidation;
