import { IsNotEmpty } from "class-validator";

export class createAuthDto{
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;
}