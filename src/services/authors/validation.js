// i have to install express-validator
// then import it
import {body} from "express-validator"


// i should import validationResult in my index :)
// add this middlewere to the router params
export const postValidator = [
    body("category").exists().isLength({ min: 3 }).withMessage("Add the category of your article please :)"),
    body("title").exists().isLength({ min: 3 }).withMessage("Add the title of your article please :)"),
    body("author.name").exists().isLength({ min: 3 }).withMessage("Add the author of your article please :)")
]