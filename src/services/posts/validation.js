// i have to install express-validator
// then import it
import { checkSchema, validationResult} from "express-validator"


// i should import validationResult in my index :)
// add this middlewere to the router params
// export const postValidator = [
//     body("category").exists().isLength({ min: 3 }).withMessage("Add the category of your article please :)"),
//     body("title").exists().isLength({ min: 3 }).withMessage("Add the title of your article please :)"),
//     body("name").exists().isLength({ min: 3 }).withMessage("Add the author name of your article please :)")
// ]

const schema = {    // list of validation objects
    title: {
        in: ["body"],
        isString: {
            errorMessage: "title validation failed, you should type a string"
        }
    },
    category: {
        in: ["body"],
        isString: {
          errorMessage: "category validation failed , you should type a string ",
        },
      },
      content: {
        in: ["body"],
        isString: {
          errorMessage: "content validation failed ,  you should type a string",
        },
      },
      "author.name": {
        in: ["body"],
        isString: {
          errorMessage: "author.name validation failed ,  you should type a string",
        },
      },
      "author.avatar": {
        in: ["body"],
        isString: {
          errorMessage: "author.avatar validation failed ,  you should type a string",
        },
      },
      "readTime.value": {
        in: ["body"],
        isNumeric: {
          errorMessage: "readTime.value  validation failed ,  you should type numeric",
        },
      },
      "readTime.unit": {
        in: ["body"],
        isString: {
          errorMessage: "readTime.unit  validation failed ,  you should type a string ",
        },
      },
      cover: {
        in: ["body"],
        isString: {
          errorMessage: "cover validation failed , you should type a string",
        },
      },

}

const searchSchema = {   // validation for the search bar
    title: {
      in: ["query"],
      isString: {
        errorMessage:
          "title must be in query and type must be  string to search!",
      },
    },
  };

export const checkSearch = checkSchema(searchSchema);  // export and assign a new const with checkSchema method
export const checkBlogPost = checkSchema(schema);

// i can build up my checkResuld function here instead of in my router

export const checkValidationResult = (req, res, next) => {   // then add checkValidatioResult to the props of my router
    const errors = validationResult(req);  // i shoul add validationResul in the import section
    if (!errors.isEmpty()) {
      const error = new Error("Your post request is failed :/");
      error.status = 400;
      error.errors = errors.array();
      next(error);
    }
    next();
  };
  