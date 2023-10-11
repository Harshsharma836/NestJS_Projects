import { Schema , Prop , SchemaFactory } from "@nestjs/mongoose";
import { Date } from "mongoose";

@Schema()
export class Books{
    @Prop()
    title : string;

    @Prop({type : String , ref:'Author'})
    AuthorId : string;

    @Prop()
    description : string;
    
    @Prop()
    price : number
}

export const BookSchema = SchemaFactory.createForClass(Books); 