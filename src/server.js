import  express  from "express";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./services/authors/index.js";

// import cors from "cors"

const server = express()


 
const port = 3001

// server.use(cors())
server.use(express.json()) // for handle the body and avoid undefined 
// then i have to declare the endpoints
server.use("/posts", authorsRouter) // same prefix in mine endpoints
console.table(listEndpoints(server))
server.listen(port, () => {
    console.log(`my first running server on port ${port}`)
})