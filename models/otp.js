//importing all the necessary modules that are required.
const mongoose = require('mongoose');


//this is the schema that is made for otp collection.
const userSchema = new mongoose.Schema(
    {
        email: {
            required: true,
            type: String,
            unique: true,  // only one document per email address.
            trim: true,
            lowercase: true,
            match: [/.+\@.+\..+/, 'Please fill a valid email address'] //regex for checking the sytanx for email.
        },
        otp: { type: String },
        otpExpires: { type: Date }, // it saves the opt expireres time.
    },
    {
        timestamps: true  // this is done to automatically create createdAt and updatedAt field.
    }
);

const User = mongoose.model('otp', userSchema);

//export the User object so that it can be used outside.
module.exports = User;
