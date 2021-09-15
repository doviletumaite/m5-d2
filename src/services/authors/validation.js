// i have to install express-validator
// then import it
import {body} from "express-validator"

// this validation list is provided by a middleware funciotn
// i should import validationResult in my index :)
// add this middlewere to the router params
export const postValidator = [
    body("category").exists().withMessage("Add the category of your article please :)"),
    body("title").exists().withMessage("Add the title of your article please :)"),
    body("author.name").exists().withMessage("Add the author of your article please :)")
]