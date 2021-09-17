import fs from "fs-extra"
import { join, dirname } from "path"
 import { fileURLToPath } from "url"


const { writeFile } = fs

// const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
const currentFilePath = fileURLToPath(import.meta.url)
const currentDirPath = dirname(currentFilePath)

const publicJSONFilePath = join(currentDirPath, "img.png")

 const publicFolderPath = join(publicJSONFilePath, "../../public/img")
 console.log("path of my public:", publicFolderPath )
 export const savePicture = (name, contentAsBuffer) => writeFile(join(publicFolderPath, name), contentAsBuffer)
