import fs from "fs-extra"
import { join, dirname } from "path"
 import { fileURLToPath } from "url"


const { writeFile, readJSON, writeJSON } = fs

 const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
// const currentFilePath = fileURLToPath(import.meta.url)
// const currentDirPath = dirname(currentFilePath)

const authorsJSONPath = join(dataFolderPath, "authors.json")  // position authors
const blogPostsJSONPath = join(dataFolderPath, "blogPosts.json")  // position posts
const publicJSONFilePath = join(process.cwd(), "./public/img")

 const publicFolderPath = join(publicJSONFilePath, "../../public/img")  // where the pics will join

 export const getAuthors = () => readJSON(authorsJSONPath)
export const getPosts = () => readJSON(blogPostsJSONPath)

export const writeAuthors = content => writeJSON(authorsJSONPath, content)
export const writePosts = content => writeJSON(blogPostsJSONPath, content)

 export const savePicture = (name, contentAsBuffer) => writeFile(join(publicFolderPath, name), contentAsBuffer)
