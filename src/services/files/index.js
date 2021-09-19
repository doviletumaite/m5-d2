// here i can create a router for upload pics
import express from "express"
import multer from "multer"
import createHttpError from "http-errors"
import { savePicture } from "../../tools/fs-tools.js"
const filesRouter = express.Router()

//http://localhost:3001/files/upload/posts/:id
// POST PICS

filesRouter.post("/upload/posts/:id",
// i should use multer: middleware for handling form-data / upload files basically
multer({
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "image/jpeg") cb (createHttpError(400), { errorsList: "Format not supported!" }, false)
        else cb (null, true)
    },
}).single("img"),
async(req, res, next) => {
try {
  await savePicture(file.originalname, req.file.buffer)  
  res.send("OK")
} catch (error) {
    next(error)
}
})

export default filesRouter

// const {originalname}=req.file;

//       const [name,extension] = originalname.split(".")
//       const filename = `${req.params.id}.${extension}`
//       const port = isProduction?"":":3001"

//       const baseURL = `${req.protocol}://${req.hostname}${port}`
//       const url = `${baseURL}/img/authors/${filename}`
