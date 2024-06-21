//importing all the necessary modules that are required.
const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt')
const patient = require('../controllers/patientController')

//this api will get all the doctors that has approve = 2 and it is open because it may be access in home screen in future.
router.get('/getapproveddoctors',patient.getApprovedDoctors)
//this api will get the doctors timming of the particular doctor id that is sent in query.
router.get('/getdoctoravailability',patient.getDoctorAvailablity)
//this api will get the doctors already booked slots of the paritcular doctor id that is sent in query.
router.get('/getalreadybookedslots',patient.getAlreadyBookedslots)
//this api will save the necessary booking details in booking collections and it is restricted to only patient that why we have added checkjwt midlleware.
router.post('/submitbookings',jwt.checkJwt,patient.submitBookings)
//this api will get all the bookings that has been done by patient and it is restricted because we only want to send the details of booking of the calling request patient.
router.get('/getAllBookings',jwt.checkJwt,patient.getAllBookings)



//exporting the router object so that can be used in index.js file.
module.exports=router;
