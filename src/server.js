import  express  from "express";
import listEndpoints from "express-list-endpoints";
import { badRequestErrorHandler, forbiddenErrorHandler, genericServerErrorHandler, notFoundErrorHandler } from "./errorHandlers.js";
import authorsRouter from "./services/authors/index.js";
import postsRouter from "./services/posts/index.js";

 import cors from "cors"
import filesRouter from "./services/files/index.js";

const server = express()

const port = 3001


// first the GLOBAL MIDDLEWARES
// middlewares are functions with THREE PARAMETERS 
// REQUEST, RESPONSE, NEXT
// let's create a global middleware that console log something for each routers
const loggerMiddleware = (req, res, next) => {
    console.log(`Request method ${req.method} +++++ Request URL ${req.url}`)
    next()  // don't forget the NEXT() not to get stuck in sending request :)
}
const publicFolderPath = join(process.cwd(), "public")
// here i can call my GLOBAL MIDDLEWARES
server.use(express.static(publicFolderPath))
server.use(cors())
server.use(express.json()) // for handle the body and avoid undefined 
server.use(loggerMiddleware)

// then i have to declare the endpoints
// ENDPOINTS
server.use("/blogPosts", postsRouter) // same prefix in mine endpoints
server.use("/authors", authorsRouter )
server.use("/files", filesRouter)
// then ERROR MIDDLEWARES
server.use(badRequestErrorHandler)
server.use(notFoundErrorHandler)
server.use(forbiddenErrorHandler)
server.use(genericServerErrorHandler)

console.table(listEndpoints(server))
server.listen(port, () => {
    console.log(`my first running server on port ${port}`)
})