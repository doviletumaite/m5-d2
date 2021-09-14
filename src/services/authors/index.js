// here i'm gonna to create the endpoints with routers (= set of endpoints that share the same PREFIX)
// authors CRUD 
// http://localhost:3001/posts 
// let's create a ROUTER

import express from "express"
import fs from "fs" // CORE MODULE => utilities for interact with file system 
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const authorsRouter = express.Router()
// i need the path of my file: first file path (c:/../src/services/authors/index.js) => i need to import fileURLToPath
// then the folder path (c:/../src/services/authors) => import Dirname for give back the directory
// then i have to concatenate folder path with posts.json (c:/../src/services/authors/posts.json)
const currentFilePath = fileURLToPath(import.meta.url) // way that node use internally to indentify path and convert in url
const currentDirPath = dirname(currentFilePath)
// then i have to concatenate them with node.js => import join from "path"
const postsJSONFilePath = join(currentDirPath, "posts.json")

// create routers for each methods (5 endpoinds with 5 methods)
// implement with the handle function that provide the behavior 
// it takes two parameters = request & response

// POST (+ body)
authorsRouter.post("/", (req, res) => {
res.send("this is the POST route")
})

// GET
authorsRouter.get("/", (req, res) => {
 const postsContent = fs.readFileSync(postsJSONFilePath)  // look at the correct file and save it in a variable
const post = JSON.parse(postsContent)
res.send(post)
})

// GET by id
authorsRouter.get("/:id", (req, res) => {
    console.log("the current id is:", id)
    const postsContent = JSON.parse(fs.readFileSync(postsJSONFilePath))
    const myPost = postsContent.find(p => p.id === req.params.id)
    res.send(myPost)
})

// PUT (id + body)
authorsRouter.put("/:id", (req, res) => {

})

// DELETE (id)
authorsRouter.delete("/:id", (req, res) => {

})

export default authorsRouter