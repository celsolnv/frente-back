import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

import { PasswordNotMatch } from "../errors/PasswordNotMatch";
import { UserAlreadyExists } from "../errors/UserAlreadyExists";
import { UserDoesNotExists } from "../errors/UserDoesNotExist";
import { AddressRepository } from "../repositories/AddressRepository";
import { UserRepository } from "../repositories/UserRepository";

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ICreateUserData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  bird_date: Date;
  cpf: string;
  cep: string;
  uf: string;
  city: string;
  district: string;
  street: string;
  identification_number: string;
}

export async function createUser(data: ICreateUserData) {
  const userRepository = getCustomRepository(UserRepository);
  const addressRepository = getCustomRepository(AddressRepository);
  const userAlreadyExist = await userRepository.findOne({
    where: [{ cpf: data.cpf }, { email: data.email }],
  });
  if (userAlreadyExist) {
    throw new UserAlreadyExists();
  }
  const address = addressRepository.create({
    cep: data.cep,
    uf: data.uf,
    city: data.city,
    district: data.district,
    street: data.street,
    identification_number: data.identification_number,
  });

  await addressRepository.save(address);

  const passwordHash = await hash(data.password, 8);
  const user = userRepository.create({
    name: data.name,
    address,
    cpf: data.cpf,
    birdDate: data.bird_date,
    email: data.email,
    password: passwordHash,
  });
  await userRepository.save(user);

  return user;
}

interface ILogin {
  email: string;
  password: string;
}
export async function login({ email, password }: ILogin) {
  const userRepository = getCustomRepository(UserRepository);
  const userExist = await userRepository.findOne({
    where: { email },
    select: ["id", "email", "password"],
  });

  if (!userExist) {
    throw new UserDoesNotExists();
  }

  const passwordMatch = await compare(password, userExist.password);

  if (!passwordMatch) {
    throw new PasswordNotMatch();
  }

  const token = jwt.sign({ id: userExist.id }, process.env.JWT_SECRET);

  return token;
}

export async function getUser(id: string) {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.findOne(id);

  if (!user) {
    throw new UserDoesNotExists();
  }

  return user;
}

export async function getUsers() {
  const userRepository = getCustomRepository(UserRepository);

  const user = await userRepository.find({
    relations: ["address"],
  });

  return user;
}
