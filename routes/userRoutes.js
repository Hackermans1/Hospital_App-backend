//importing all the necessary modules that are required.
const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt')
const user = require('../controllers/userController')
const multer = require('multer');
const path = require('path');

// multer is used to upload the image on the server.
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Specify the directory where the uploaded files will be stored
        cb(null, './uploads');
      },
      filename: function(req, file, cb) {
        // Specify a unique filename for uploaded files
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
});
const uploadImage = multer({ storage: storage });

//this api will register the user to the platform.
router.post('/register',user.register)
//this api will login the user to the platform.
router.post('/login',user.login)
//this api will send the otp to both registered and unregistered users on the platform.
router.post('/sendotp',user.sendOtp)
//this api will resend the otp to both registered and unregistered users on the plaform.
router.post('/resendotp',user.resendOtp)
//this api will verify the otp and this api is only called when the user tries to login.
router.post('/verifyOtp',user.verifyOtp)
//this api will send the details of the user and it is restricted because as we only want to send the details of the calling api user.
router.get('/getuserdetails',jwt.checkJwt,user.userDetails)
//this api will update the details of user and can upload the profile for this we use form not body while calling api and it is restricted because we want to update the profile of the calling api user.
router.patch('/updateuserdetails',jwt.checkJwt, uploadImage.single('profile_image'),user.updateDetails)
//thus api will change the password.
router.post('/changePassword',user.changePassword)
//this api will send the otp when user tries to change the password.
router.post('/sendOtppassword',user.sendOtppassword)


//exporting the router object so that can be used in index.js file.
module.exports = router;