// here i can build up my list of function that handle errors 
// those functions are actually MIDDLEWARE functions because they have to be called inside the router flow
// they define the type of error and stop the process with a proper error message that help us to fix the problem 
// the function MUST HAVE 4 PARAMS
// ERR, REQUEST, RESPONSE, NEXT
// NEXT is a function that allows to move forward through flow if the error doesn't exist

// i also have to install http-errors and import it in my index.js


// import the errorHandlers list in server.js and call the function after the endpoints, in the end of the flow
export const badRequestErrorHandler = ( err, req, res, next) => {
    if (err.status === 400) {                     // if there is a 400 error 
        res.status(400).send({sucess: false, message: err.errorsList})  // response with 400 status and send a proper message
    } else {                                        // else
        next(err)                                  // go on checking for other errors
    }
}
