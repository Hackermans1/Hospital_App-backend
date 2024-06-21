//importing all the necessary modules that are required.
const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt')
const admin = require("../controllers/adminController")


/*
this are all the end points for the admin
all the end points are restricted to the admin for that we are expecting a jwt token from the frontend so that we can validate its an admin 
to do so we have used jwt.checkJwt as a midleare which we first check the jwt token and then only request will be proced else response will be send back to the frontend from there itself.
*/

//this api will send the all the doctors whose approval = 1
router.get('/getApprovalRequestList',jwt.checkJwt,admin.getApprovalRequestList)
//this api will approve i.e approval = 2 or reject i.e approval=0 and save it to the database.
router.patch('/approveDoctor',jwt.checkJwt,admin.approveDoctor)
//this api will get the particular doctor details whose id is passed as query parameter in get request.
router.get('/getdoctordetails',jwt.checkJwt,admin.getDoctorDetails)
//this api will get the all the inventory documents from the inventory collection.
router.get('/getinventorydata',jwt.checkJwt,admin.getAllInventory)
//this api will update the particular medicine quantity.
router.patch('/updateinventory',jwt.checkJwt,admin.updateInventory)
//this api will be used when the bulk update will be done i.e importing from excel
router.post('/bulkinventory',jwt.checkJwt,admin.bulkInsertInventory)
//this api will get count of bookings and count of unique patient bookings group by doctor 
router.get('/getTotalPatientByDoctor',jwt.checkJwt,admin.getTotalPatientByDoctor)
//this api will get the total numbr of bookings of past 10 days group by date.
router.get('/getTotalPAtientByDate',jwt.checkJwt,admin.getTotalPAtientByDate)



// exporting the router object so that can be used in index.js file.
module.exports = router;