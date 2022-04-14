import { IsEmail, IsString, Length, Min } from 'class-validator';

export class movieCreateDto {  
    @IsString()   
    public movieName: string;

    @IsString()    
    public description: string;

    @IsString()    
    public image?: string;

    @IsString()   
    public visibility: any;
}
export class movieCommentDto {  
    @IsString()   
    public writerName: string;

    @IsString()    
    public text: string;
}

