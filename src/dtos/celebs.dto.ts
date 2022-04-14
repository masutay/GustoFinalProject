import { IsEmail, IsString, Length, Min } from "class-validator";

export class celebsCreateDto {
    @IsString()
    public celebsName: string;

    @IsString()
    public description: string;

    @IsString()
    public image?: string;

    @IsString()
    public visibility: any;
}

export class CelebsCommentDto {
    @IsString()
    public writerName: string;

    @IsString()
    public text: string;
}

