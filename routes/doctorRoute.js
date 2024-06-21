//importing all the necessary modules that are required.
const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt')
const doctor = require("../controllers/doctorController")


/*
this are all the end points for the doctor
all the end points are restricted to the doctor for that we are expecting a jwt token from the frontend so that we can validate its an doctor. 
to do so we have used jwt.checkJwt as a midleare which we first check the jwt token and then only request will be proced else response will be send back to the frontend from there itself.
*/

//this api will insert or update the doctors timmings in doctoravalability collections.
router.post("/submitdoctoravailability",jwt.checkJwt,doctor.submitDoctorAvailability)
//this api will get the details of all the current by bookings that are scheduled today.
router.get("/getCurrentBookings",jwt.checkJwt,doctor.getCurrentBookings)
//this api will update the prescription towards the particular booking.
router.post("/addDetailsToPatient",jwt.checkJwt,doctor.addDetailsToPatient)

// export the router object so that can be used in index.js file.
module.exports=router