//importing all the necessary modules that are required.
const jwt = require('jsonwebtoken');

//secret key that will use to verify the jwt token and it should be same with the sceret key that is used while creating the jwt token
const jwtSecretKey = "qwertyuiopasdfghjklzxcvbnmqwerty";



/*this function has req,res,next as it has accesss to it beacuse will decare it is a midleware.
The function extract the token with key name authorization and verify it if it success it will give the decoded object access which is the decrypted from jwt token that is payload
and we have assign it to the data object and moved to the next midlleware by calling next().
*/
function checkJwt(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' }); // this will be send whe the token is not sent in headers.
  }
  jwt.verify(token, jwtSecretKey, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: 'Failed to authenticate token' }); // this will be send when the token failed the verification processs.
    }
    req.data = decoded;
    next();
  });
}


//exporting it so that we can use outside functions.
module.exports = {checkJwt};
