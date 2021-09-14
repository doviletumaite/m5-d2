// here i'm gonna to create the endpoints with routers (= set of endpoints that share the same PREFIX)
// authors CRUD 
// http://localhost:3001/posts 
// let's create a ROUTER

import express from "express"

const authorsRouter = express.Router()

// create routers for each methods (5 endpoinds with 5 methods)

// POST (+ body)
authorsRouter.post("/")

// GET
authorsRouter.get("/")

// GET by id
authorsRouter.get("/")

// PUT (id + body)
authorsRouter.put("/")

// DELETE (id)
authorsRouter.delete("/")

export default authorsRouter