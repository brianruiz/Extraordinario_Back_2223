import { RouterContext } from "oak/router.ts";
import { EventCollection } from "../db/mongo.ts";
import { ObjectId } from "mongo";
import { EventSchema } from "../db/schemas.ts";
import { getQuery } from "https://deno.land/x/oak@v11.1.0/helpers.ts";
import { event } from "./get.ts";

type deleteEventContext = RouterContext<
  "/deleteEvent/:id",
  {
    id:string;
  } &
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export const deleteEvent = async (context: deleteEventContext) => {
    try{
        if(context.params?.id){
            const event = await EventCollection.findOne({
                _id: new ObjectId(context.params.id),
            });

            if(event){
                if(event){
                    await EventCollection.deleteOne({
                        _id: new ObjectId(context.params.id)
                    });
                    context.response.status = 200;
               }
            }else{
                context.response.status = 404;
                context.response.body = {message: "El evento no se ha encontrado"};
            }
        }
    }catch(e){
        console.error(e);
        context.response.status= 404;
    }
}