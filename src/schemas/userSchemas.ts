import DateExtension from "@joi/date";
import joi from "joi";

const Joi = joi.extend(DateExtension);

export const createUser = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  password_confirmation: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .options({ messages: { "any.only": "Confirm password does not match" } }),
  bird_date: Joi.date().format("YYYY/MM/DD").utc().required(),
  cpf: Joi.string().required(),
  cep: Joi.string().required(),
  uf: Joi.string().max(2).min(2).required(),
  city: Joi.string().required(),
  district: Joi.string().required(),
  street: Joi.string().required(),
  identification_number: Joi.string().required(),
});
export const login = joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
