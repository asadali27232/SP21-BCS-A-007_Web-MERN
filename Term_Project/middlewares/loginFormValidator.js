const Joi = require('joi');

function loginFormValidator(req, res, next) {
    const emailSchema = Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
        .required()
        .error(new Error('Please enter a valid email address!'));

    const passwordSchema = Joi.string()
        .min(8)
        .required()
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/
        )
        .error(new Error('Wrong password!'));

    const schema = Joi.object({
        email: emailSchema,
        password: passwordSchema,
    });

    const { email, password } = req.body;

    const user = {
        email,
        password,
    };

    const validationResult = schema.validate(user);

    if (validationResult.error) {
        // Handle validation errors
        return res.status(500).send({ error: validationResult.error.message });
    } else {
        // User input is valid
        next();
    }
}

module.exports = loginFormValidator;
