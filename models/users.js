//importing all the necessary modules that are required.
const mongoose = require('mongoose');


// this is the collection for user collection that is admin,doctor,patient
const userSchema = new mongoose.Schema(
    {
        name: {
            required: true, // required true means its a necessary field while inserting the document.
            type: String,
        },
        email: {
            required: true,
            type: String,
            unique: true, // it means one document per email
            trim: true,
            lowercase: true,
            match: [/.+\@.+\..+/, 'Please fill a valid email address'] //regex for checking the email format
        },
        password: {
            required: true,
            type: String,
        },
        role: {
            required: true,
            type: String,
            enum: ['admin', 'patient', 'doctor'] // allowed values are these only for role.
        },
        phone: {
            type: Number,
            validate: {
                validator: function(v) {
                    return /\d{10}/.test(v);
                },
                message: props => `${props.value} is not a valid 10 digit phone number!` // checking the phone numebr format.
            }
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other']  // allowed values are these only for gender.
        },
        dob: {
            type: String 
        },
        marital_status: {
            type: String,
            enum: ['single', 'married']  // allowed values are these only for marital_status.
        },
        qualification: {
            type: String
        },
        work_experience: {
            type: String
        },
        specialization: {
            type: String
        },
        adhar_no: {
            type: Number,
      
        },
        father_name: {
            type: String
        },
        mother_name: {
            type: String
        },
        approval: {
            type: Number,
            default: 0,  // default value 0 means normal user ,1 means profile approval pending , 2 mens profile approved.
        },
        profile_image: {
            type: String // will store the path of the image where it is stored.
        },
        fee_per_consultation: {
            type: Number,
            default: 0
        },
        user_verify:{
            type:Number
        },otp: { type: String },
        otpExpires: { type: Date },
    },
    {
        timestamps: true  // this is done to automatically create createdAt and updatedAt field.
    }
);

const User = mongoose.model('User', userSchema);

// exporting the User object to be used outside.
module.exports = User;
