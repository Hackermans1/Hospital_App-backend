//importing all the necessary modules that are required.
const mongoose = require('mongoose');


//this is the schema for doctoravability collection.
const doctorAvalability = new mongoose.Schema({
    doctor_id: {
        type: String,
        required: true
    },
    time_slot: {
        type: Number
    },
    morning: {
        from: {
            type: String
        },
        to: {
            type: String
        },
    },
    afternoon: {
        from: {
            type: String
        },
        to: {
            type: String
        },
    },
    evening: {
        from: {
            type: String
        },
        to: {
            type: String
        },
    }
});

const doctoravailability = new mongoose.model("doctoravailability",doctorAvalability);

//importing the doctoravailabiltity to use outside.
module.exports = doctoravailability;