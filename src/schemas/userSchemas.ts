import JoiDate from "@joi/date";
import Joi from "joi";

Joi.extend(JoiDate);
export const createUserSchema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirm_password: Joi.any().valid(Joi.ref("password")).required(),
  bird_date: Joi.date().format("YYYY-MM-DD").required(),
  cpf: Joi.string().required(),
  cep: Joi.string().required(),
  uf: Joi.string().max(2).required(),
  city: Joi.string().required(),
  district: Joi.string().required(),
  street: Joi.string().required(),
  identification_number: Joi.string().required(),
});
