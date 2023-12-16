let mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            index: true,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

let User = mongoose.model('User', modelSchema);
module.exports = User;
