import { getCustomRepository } from "typeorm";

import { compare } from "bcryptjs";

import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        const user = await usersRepository.findOne({
            email
        });

        if(!user) {
            throw new Error("Email/Password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect");
         }

        const token = sign({
            email: user.email
        }, "d037f3a087f7c783792d92727d3c73f7", {
            subject: user.id,
            expiresIn: "1d"
         });

         return token;
    }
}

export { AuthenticateUserService }