const Joi = require('joi');

function registerFromValidator(req, res, next) {
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
        .error(
            new Error(
                'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character!'
            )
        );

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
        res.json({ message: validationResult.error.message });
    } else {
        // User input is valid
        next();
    }
}

module.exports = registerFromValidator;
