import { IsEmail, IsString, Length, Min } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @Length(6, 32)
    public email: string;

    @IsString()
    @Length(6, 32)
    public userName: string;

    @IsString()
    @Length(5, 32)
    public password: string;   
}

export class LoginUserDto {
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}
