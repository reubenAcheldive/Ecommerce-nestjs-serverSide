import { IsNumber } from "class-validator"


export class ICart { 
    @IsNumber()
    date:number
}