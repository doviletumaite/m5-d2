import fs from "fs-extra"
import { join, dirname } from "path"
// import { fileURLToPath } from "url"


const { writeFile } = fs

// const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")

 const publicFolderPath = join(process.cwd(), "./public/img")
 export const savePicture = (name, contentAsBuffer) => writeFile(join(publicFolderPath, name), contentAsBuffer)
