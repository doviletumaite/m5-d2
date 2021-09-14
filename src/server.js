import  express  from "express";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./services/authors/index.js";


const server = express()


 server.use(express.json())
const port = 3001
// then i have to declare the endpoints
server.use("/posts", authorsRouter) // same prefix
console.table(listEndpoints(server))
server.listen(port, () => {
    console.log(`my first running server on port ${port}`)
})