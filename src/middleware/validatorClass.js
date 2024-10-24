const Joi = require('joi');

class validatorClass {

  static userSignUpSchema = Joi.object({
    firstname: Joi.string()
              .min(3)
              .max(50)
              .required(),
    lastname: Joi.string()
              .min(3)
              .max(50),
    email: Joi.string()
            .email()
            .required(),
    password: Joi.string()
              .min(8)
              .max(50)
              // .pattern(new RegExp('^[a-zA-Z0-9]{8,50}$')) // requires minimum length of 8, max of 50. alphabet and numbers
              // .pattern(new RegExp('(?=.*[A-Z])')) // minimum of one capital letter
              // .pattern(new RegExp('(?=.*[0-9])')) // minimum one number
              .required()
  });

  static userLoginSchema = Joi.object({
    email: Joi.string()
            .email()
            .required(),
    password: Joi.string()
              .min(8)
              .max(50)
              // .pattern(new RegExp('^[a-zA-Z0-9]{8,50}$')) // requires minimum length of 8, max of 50. alphabet and numbers
              // .pattern(new RegExp('(?=.*[A-Z])')) // minimum of one capital letter
              // .pattern(new RegExp('(?=.*[0-9])')) // minimum one number
              .required()
  });

  static async validateUserSignUp(req, res, next) {
    const {error} = validatorClass.userSignUpSchema.validate(req.body)
    if (error) {
      res.status(401).send(error.details[0].message)
    } else {
      next()
    }
  }

  static async validateUserLogin(req, res, next) {
    const {error} = validatorClass.userLoginSchema.validate(req.body)
    if (error) {
      res.status(401).send(error.details[0].message)
    } else {
      next()
    }
  }

}

module.exports = validatorClass;
