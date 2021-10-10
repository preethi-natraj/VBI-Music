'use strict';

const responsesCommon = require('../response/response');
// const authValidateCommon = require('../common/auth-validate-common');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');

module.exports = async function (req, res, next) {

  try {

    console.log(`[${new Date().toUTCString()}]`, `${req.method} ${req.originalUrl} routed from ${req.hostname}`);

    // get the token from the header if present
    const token = req.headers['x-access-token'];

    console.log(token)
    var decoded = jwt_decode(token);
  
    console.log(decoded);

    // if no token found, return response (without going to the next middelware)
    if (!token) return res.status(400).send(responsesCommon.formatErrorMessage('Access denied. No token provided.'));

    const dataToken = token.split(' ')

    jwt.verify(dataToken[1],'secret', function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: err }); 
      
      console.log(decoded)
      if (new Date() >= new Date(decoded.exp * 1000)) {
        return res.status(400).send(responsesCommon.formatErrorMessage('Token expired. Please login again.'));
      } else {
        return next();
      }
    });


    

  } catch(e) {
    console.log(e);
    return res.status(400).send(responsesCommon.formatErrorMessage(e.message, 400, null));
  }
};
