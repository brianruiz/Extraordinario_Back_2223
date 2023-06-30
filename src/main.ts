import {Application, Router} from "oak";
import { addEvent } from "./resolvers/post.ts";
import { event } from "./resolvers/get.ts";
import { deleteEvent } from "./resolvers/delete.ts";


const router = new Router();
router
    .get("/test", (context) =>{
        context.response.body = "Funcionandoooo"

    })
    .post("/addEvent", addEvent)
    .get("/event/:id", event)
    .delete("/deleteEvent/:id", deleteEvent)

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.info("Server waiting for request on port 7777");
await app.listen({port: 7777});