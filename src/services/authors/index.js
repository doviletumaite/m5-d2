// here i'm gonna to create the endpoints with routers (= set of endpoints that share the same PREFIX)
// posts CRUD 
// http://localhost:3001/authors 
// let's create a ROUTER

import express from "express"
import fs from "fs" // CORE MODULE => utilities for interact with file system 
import { fileURLToPath } from "url"
import { dirname, join } from "path"
import uniqid from "uniqid" // for generate unique id
import createHttpError from "http-errors" // this is useful for deal whit error in validation list

// import { checkBlogPost, checkValidationResult } from "../authors/validation.js"


const authorsRouter = express.Router()
// i need the path of my file: first file path (c:/../src/services/authors/index.js) => i need to import fileURLToPath
// then the folder path (c:/../src/services/authors) => import Dirname for give back the directory
// then i have to concatenate folder path with posts.json (c:/../src/services/authors/posts.json)
const currentFilePath = fileURLToPath(import.meta.url) // way that node use internally to indentify path and convert in url

const currentDirPath = dirname(currentFilePath)
// then i have to concatenate them with node.js => import join from "path"
const authorsJSONFilePath = join(currentDirPath, "authors.json")
console.log("path of my posts.json:", authorsJSONFilePath)
// create routers for each methods (5 endpoinds with 5 methods)
// implement with the handle function that provide the behavior 
// it takes two parameters = request & response

// implement with the handleErrors

// POST (+ body)
authorsRouter.post("/", (req, res, next) => {  // for handle the error i have to add next as a parameter
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
           const newAuthor = {
                id: uniqid(),
                ...req.body,
               
                 createdAt: new Date(),
                 updatedAt: new Date(),
                 } // create a new post the new post + VALIDATION
       console.log("my new post", newAuthor)
       const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath)) // grab the array of posts
       authors.push(newAuthor) // push the new post in my array
       fs.writeFileSync(authorsJSONFilePath, JSON.stringify(authors))
       res.status(201).send(newAuthor) // set two new properties of the body of my new post
       } catch (error) {
           next(error).send(500).send({ message: error.message }); 
       }
       
   }
)


// GET
authorsRouter.get("/", (req, res, next) => {
    try {
        const authors = fs.readFileSync(authorsJSONFilePath)  // look at the correct file and save it in a variable
const allAuthors = JSON.parse(authors) // "translate" it in json
res.send(allAuthors) // send back array of posts
    } catch (error) {
        next(error)
    }
})

                      

// GET by id
authorsRouter.get("/:id", (req, res, next) => {
    console.log(" my :id", req.params.id)
   try {
    const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath)) // take the array and translate it 
    // console.log("this is the content of posts.json", postsContent )
    // console.log("check posts.json path again", authorsJSONFilePath)
     const thatAuthor = authors.find(p => p.id === req.params.id)
     console.log("body of my post", thatAuthor)
    res.send(thatAuthor)
   } catch (error) {
    next(error).send({ message: error.message });
   }
})



// PUT (id + body)
authorsRouter.put("/:id", (req, res, next) => {
    try {
        const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath))
    const remainingAuthors = authors.filter(post => post.id !== req.params.id) // all the post except post that i'm looking for based on the id
    const updatedAuthor = { ...req.body, id: req.params.id} // take whatewer is in the body of my new post based on id
    remainingAuthors.push(updatedAuthor) // push the new post back in the array 
    // another way
    // const updatedAuthor = { ...authors[index], ...req.body }
    //  authors[index] = updatedAuthor
    console.log("updated post:",updatedAuthor )
    fs.writeFileSync(authorsJSONFilePath, JSON.stringify(authors)) // rewrite the array whit the updated post
    res.send(updatedAuthor) // send back the updated post
    } catch (error) {
        next(error).send({ message: error.message });
    }
})



// DELETE (id)
authorsRouter.delete("/:id", (req, res, next) => {
   try {
    const authors = JSON.parse(fs.readFileSync(authorsJSONFilePath)) // grab the array 
    const remainingAuthors = authors.filter(post => post.id !== req.params.id) // grab everything except the post.id that we want to delete
    fs.writeFileSync(authorsJSONFilePath, JSON.stringify(remainingAuthors)) // write the remaining array of posts
    res.send() // we don't have to send nothing back because we're just deleting :)
   } catch (error) {
    next(error).send({ message: error.message });
   }
})

export default authorsRouter