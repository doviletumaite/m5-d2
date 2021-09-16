// here i'm gonna to create the endpoints with routers (= set of endpoints that share the same PREFIX)
// posts CRUD 
// http://localhost:3001/blogPosts 
// let's create a ROUTER

import express from "express"
import fs from "fs" // CORE MODULE => utilities for interact with file system 
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid" // for generate unique id
import createHttpError from "http-errors" // this is useful for deal whit error in validation list
import { validationResult } from "express-validator"
import { checkBlogPost, checkValidationResult } from "./validation.js"


const authorsRouter = express.Router()
// i need the path of my file: first file path (c:/../src/services/authors/index.js) => i need to import fileURLToPath
// then the folder path (c:/../src/services/authors) => import Dirname for give back the directory
// then i have to concatenate folder path with posts.json (c:/../src/services/authors/posts.json)
const currentFilePath = fileURLToPath(import.meta.url) // way that node use internally to indentify path and convert in url

const currentDirPath = dirname(currentFilePath)
// then i have to concatenate them with node.js => import join from "path"
const postsJSONFilePath = join(currentDirPath, "blogPosts.json")
console.log("path of my posts.json:", postsJSONFilePath)
// create routers for each methods (5 endpoinds with 5 methods)
// implement with the handle function that provide the behavior 
// it takes two parameters = request & response

// implement with the handleErrors

// POST (+ body)
authorsRouter.post("/", checkValidationResult, checkBlogPost, (req, res, next) => {  // for handle the error i have to add next as a parameter
    console.log("REQUEST BODY: ", req.body) // we want to read the body of the new post
   // implement with the validation sistem 
//    const errorList = validationResult(req)
   // add if statement to check if the error list is NOT empty
   // if is full use the next function to create the 400 error 
//    if (!errorList.isEmpty()){
//        next(createHttpError(400, {errorList}))
//    } else {
       // if is empty (no validation error) then go forward :)

       // implement the function whit try&catch method to handle errors
       try {
           const newPost = {
                id: uniqid(),
                ...req.body,
               
                 createdAt: new Date(),
                 updatedAt: new Date(),
                 } // create a new post the new post + VALIDATION
       console.log("my new post", newPost)
       const postsContent = JSON.parse(fs.readFileSync(postsJSONFilePath)) // grab the array of posts
       postsContent.push(newPost) // push the new post in my array
       fs.writeFileSync(postsJSONFilePath, JSON.stringify(postsContent))
       res.status(201).send(newPost) // set two new properties of the body of my new post
       } catch (error) {
           next(error).send(500).send({ message: error.message }); 
       }
       
   }
)


// GET
authorsRouter.get("/", (req, res, next) => {
    try {
        const postsContent = fs.readFileSync(postsJSONFilePath)  // look at the correct file and save it in a variable
const posts = JSON.parse(postsContent) // "translate" it in json
res.send(posts) // send back array of posts
    } catch (error) {
        next(error)
    }
})

                      

// GET by id
authorsRouter.get("/:id", (req, res, next) => {
    console.log(" my :id", req.params.id)
   try {
    const postsContent = JSON.parse(fs.readFileSync(postsJSONFilePath)) // take the array and translate it 
    // console.log("this is the content of posts.json", postsContent )
    console.log("check posts.json path again", postsJSONFilePath)
     const myPost = postsContent.find(p => p.id === req.params.id)
     console.log("body of my post", myPost)
    res.send(myPost)
   } catch (error) {
    next(error)
   }
})



// PUT (id + body)
authorsRouter.put("/:id", (req, res, next) => {
    try {
        const postsContent = JSON.parse(fs.readFileSync(postsJSONFilePath))
    const remainingPost = postsContent.filter(post => post.id !== req.params.id) // all the post except post that i'm looking for based on the id
    const updatedPost = { ...req.body, id: req.params.id} // take whatewer is in the body of my new post based on id
    remainingPost.push(updatedPost) // push the new post back in the array 
    // another way
    // const updatedPost = { ...postsContent[index], ...req.body }
    //  postsContent[index] = updatedPost
    console.log("updated post:",updatedPost )
    fs.writeFileSync(postsJSONFilePath, JSON.stringify(postsContent)) // rewrite the array whit the updated post
    res.send(updatedPost) // send back the updated post
    } catch (error) {
        next(error)
    }
})



// DELETE (id)
authorsRouter.delete("/:id", (req, res, next) => {
   try {
    const postsContent = JSON.parse(fs.readFileSync(postsJSONFilePath)) // grab the array 
    const remainingPost = postsContent.filter(post => post.id !== req.params.id) // grab everything except the post.id that we want to delete
    fs.writeFileSync(postsJSONFilePath, JSON.stringify(remainingPost)) // write the remaining array of posts
    res.send() // we don't have to send nothing back because we're just deleting :)
   } catch (error) {
    next(error)
   }
})

export default authorsRouter