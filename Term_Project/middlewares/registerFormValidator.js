const Joi = require('joi');

function registerFormValidator(req, res, next) {
    const nameSchema = Joi.string()
        .min(3)
        .max(50)
        .pattern(/^[A-Za-z\s]+$/)
        .error(
            new Error(
                'Name must be between 3 and 50 characters, and contain only letters and spaces!'
            )
        );

    const emailSchema = Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] },
        })
        .required()
        .error(new Error('Please enter a valid email address!'));

    const roleSchema = Joi.string()
        .valid('manager', 'cashier') // Add more valid roles as needed
        .required()
        .error(new Error('Please select a valid role!'));

    const passwordSchema = Joi.string()
        .min(8)
        .required()
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/
        )
        .error(
            new Error(
                'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character!'
            )
        );

    const schema = Joi.object({
        email: emailSchema,
        password: passwordSchema,
        name: nameSchema,
        role: roleSchema,
    });

    const { email, password, name, role } = req.body;

    const user = {
        name,
        email,
        role,
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

module.exports = registerFormValidator;
