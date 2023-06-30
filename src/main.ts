import {Application, Router } from "oak"




const router = new Router

router
    .get("/getStatus", (ctx) => {
        ctx.response.body = "Todo OK "
        ctx.response.status = 200
        //date today
        const date = new Date()
        console.log(date)
        //format dd-mm-yyyy
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const dateFormated = ${day}-${month}-${year}
        console.log(dateFormated)
        ctx.response.body = dateFormated

    })




const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 7777 })
console.log("Server running on port 7777")