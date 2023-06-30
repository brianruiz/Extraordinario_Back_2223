import { RouterContext } from "oak/router.ts";
import { EventCollection } from "../db/mongo.ts";
import { Event } from "../types.ts"
import { BODY_TYPES, getBoundary } from "https://deno.land/x/oak@v11.1.0/util.ts";
import { EventSchema } from "../db/schemas.ts";


type addEventContext = RouterContext<
"/addEvent",
Record<string | number, string | undefined>,
Record<string, any>
>;




const isValidDate = (year:number, month:number,day:number): boolean => {

    const date = new Date (year,month-1,day);
    return (

        date.getFullYear()=== year &&
        date.getMonth()===month &&
        date.getDay() === day 

    );
}

export const addEvent =async (context: addEventContext) => {

    try {
        const body: Event = await context.request.body({type: "json"}).value
        

        if(!body?.Fecha ||!body?.Inicio || !body?.Fin || body.Titulo|| body.Invitados ){
            context.response.status=400
            return;
        }

        const fecha= body.Fecha.split('-');
        const year = +fecha[0];
        const month = +fecha[1];
        const day= +fecha[2];

        if(!isValidDate(year, month,day)){
        context.response.status = 400
    }

    if(body.Inicio === body.Fin || body.Inicio > body.Fin){
        context.response.status =400
    }   
    const fechadate= new Date(year, month,day);
    
    const foundEvent: EventSchema | undefined = await EventCollection.findOne(fechadate)
        if(foundEvent){
            
            context.response.status = 400;
        }else{
            context.response.status = 200;
            return;
        }
    
    const newEvent: Partial<Event> ={
       ...body
    }


    await EventCollection.insertOne(newEvent as EventSchema);
    const {_id} = newEvent as EventSchema;
    context.response.status=200
        
    } catch (error) {
        context.response.status=400;
        console.log(error);
        
    }

}