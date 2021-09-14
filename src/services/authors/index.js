// here i'm gonna to create the endpoints with routers (= set of endpoints that share the same PREFIX)
// authors CRUD 
// http://localhost:3001/posts 
// let's create a ROUTER

import express from "express"
import fs from "fs" // CORE MODULE => utilities for interact with file system 
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid" // for generate unique id

const authorsRouter = express.Router()
// i need the path of my file: first file path (c:/../src/services/authors/index.js) => i need to import fileURLToPath
// then the folder path (c:/../src/services/authors) => import Dirname for give back the directory
// then i have to concatenate folder path with posts.json (c:/../src/services/authors/posts.json)
const currentFilePath = fileURLToPath(import.meta.url) // way that node use internally to indentify path and convert in url

const currentDirPath = dirname(currentFilePath)
// then i have to concatenate them with node.js => import join from "path"
const postsJSONFilePath = join(currentDirPath, "posts.json")
console.log("path of my posts.json:", postsJSONFilePath)
// create routers for each methods (5 endpoinds with 5 methods)
// implement with the handle function that provide the behavior 
// it takes two parameters = request & response

// POST (+ body)
authorsRouter.post("/", (req, res) => {
    console.log("REQUEST BODY: ", req.body) // we want to read the body of the new post
    const newPost = { ...req.body,  id: uniqid(), createdAt: new Date() } // create a new post the new post
    console.log("my new post", newPost)
    const postsContent = JSON.parse(fs.readFileSync(postsJSONFilePath)) // grab the array of posts
    postsContent.push(newPost) // push the new post in my array
    fs.writeFileSync(postsJSONFilePath, JSON.stringify(postsContent))
res.send({id: newPost.id, date: newPost.createdAt}) // set two new properties of the body of my new post
})

// GET
authorsRouter.get("/", (req, res) => {
 const postsContent = fs.readFileSync(postsJSONFilePath)  // look at the correct file and save it in a variable
const posts = JSON.parse(postsContent) // "translate" it in json
res.send(posts) // send back array of posts
})

// GET by id
authorsRouter.get("/:id", (req, res) => {
    console.log(" my :id", req.params.id)
    const postsContent = JSON.parse(fs.readFileSync(postsJSONFilePath)) // take the array and translate it 
    // console.log("this is the content of posts.json", postsContent )
    console.log("check posts.json path again", postsJSONFilePath)
     const myPost = postsContent.find(p => p.id === req.params.id)
     console.log("body of my post", myPost)
    res.send(myPost)
})

// PUT (id + body)
authorsRouter.put("/:id", (req, res) => {
    const postsContent = JSON.parse(fs.readFileSync(postsJSONFilePath))
    const remainingPost = postsContent.filter(post => post.id !== req.params.id) // all the post except post that i'm looking for based on the id
    const updatedPost = { ...req.body, id: req.params.id} // take whatewer is in the body of my new post based on id
    remainingPost.push(updatedPost) // push the new post back in the array 
    // another way
    // const updatedPost = { ...postsContent[index], ...req.body }
    //  postsContent[index] = updatedPost
    console.log("updated post:",updatedPost )
    res.send(updatedPost) // send back the updated post
})

// DELETE (id)
authorsRouter.delete("/:id", (req, res) => {
    const postsContent = JSON.parse(fs.readFileSync(postsJSONFilePath)) // grab the array 
    const remainingPost = postsContent.filter(post => post.id !== req.params.id) // grab everything except the post.id that we want to delete
    fs.writeFileSync(postsJSONFilePath, JSON.stringify(remainingPost)) // write the remaining array of posts
    res.send() // we don't have to send nothing back because we're just deleting :)
})

export default authorsRouter