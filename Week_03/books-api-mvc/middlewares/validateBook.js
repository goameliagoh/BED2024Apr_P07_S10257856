//This file will house the validation logic using Joi.

//npm install joi INSIDE THE TERMINAL
const Joi = require("joi");

const validateBook = (req, res, next) => { // 'next' is passing from 1 middleware to another middleware 
  
  //-------------------------------------------------------------------------------------------------
  // Conditions that book info must fulfill to be able to be validated!!!
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    author: Joi.string().min(3).max(50).required(),
  });
  //----------------------------------------------------------------------------------------------------

  const validation = schema.validate(req.body, { abortEarly: false }); // Saying: Based on the schema aka conditions I created above, I will refer to it to validate my req.body. + I will validate the data's title and author and not validate halfway (thats why abortEarly = false)
  // 'validate' is a JOI method ++++ 'validation' output will be the details of those data that are NOT validated.

  if (validation.error) { // <--- write this to check if hv any validation error...
    const errors = validation.error.details.map((error) => error.message); // Basically: 'validation.error.details' contains all details about your error ++ 'map((error)=>error.message)' will make sure that the correct type of error is mapped tgt with the details abt the error
    res.status(400).json({ message: "Validation error", errors });
    return; // Terminate middleware execution on validation error so that client will be aware of validation error before processing further ++ This is referring to my WHOLE DATASET and hence different from abortEarly = false (???)
  }

  next(); // If validation passes, proceed to the next route handler
};

module.exports = validateBook;
