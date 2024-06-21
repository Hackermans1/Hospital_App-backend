//importing all the necessary modules that are required.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema for prescription in the booking collection.
const medicine = new Schema({
    name:{ 
    type :String
    },
    qunatity: 
    {
        type:Number
    },
    morning:{
        type:String
    },
    afternoon:{
        type:String
    },
    evening:{
        type:String
    }
  });
  
//booking collection schema.
const bookingSchema = new mongoose.Schema({
    doctor_id: {
        type: Schema.Types.ObjectId, ref: 'User' // the doctor_id will be type objectid and referencing _id from User collection.
    },
    patient_id: {
        type: Schema.Types.ObjectId, ref: 'User' // the patient_id will be type objectid and referencning _id from User collection.
    },
    bookingDate: {
        type: Date //this will contain the booking date.
    },
    bookingTime: {
        type: String
    },
    prescription:{
        type:[medicine] // this contain the array of medicine schema that is defiend above.
    }


});

const bookings = new mongoose.model("bookings",bookingSchema);

//exporting the bookings so that it can be used outside .
module.exports = bookings;