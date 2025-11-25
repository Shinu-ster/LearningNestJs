import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

// 32. created login and register dtos