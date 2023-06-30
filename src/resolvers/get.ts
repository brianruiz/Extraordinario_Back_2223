import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import { RouterContext } from "oak/router.ts";
import { EventSchema } from "../db/schemas.ts";
import { EventCollection } from "../db/mongo.ts";
import { ObjectId } from "mongo";



type eventContext = RouterContext<
"/event/:id",{
    id:string
} &
Record<string | number, string | undefined>,
Record<string, any>
>;

export const event = async (context: eventContext) => {
    try{ 
    if(context.params?.id){
        const event: EventSchema | undefined = await EventCollection.findOne({
            _id: new ObjectId(context.params.id)
        });

        if(event){
            const {_id} = event as EventSchema;

            context.response.body = {
                id: _id.toString(),
            };
        }else{
            context.response.status = 404;
            context.response.body= {message: "No se ha encontrado el evento"}
        }
    }

    }catch(e){
        console.log(e);
        context.response.status = 404;
    }
}