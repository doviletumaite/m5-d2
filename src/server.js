import  express  from "express";
import authorsRouter from "./services/authors/index.js";

const server = express()
const port = 3001
// then i have to declare the endpoints
server.use("/posts", authorsRouter) // same prefix
server.listen(3001, () => {
    console.log(`my first running server on port ${port}`)
})