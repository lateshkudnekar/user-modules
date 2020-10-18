'use strict';
const models = require("../../../models");
const fs   = require('fs');
const jwt  = require('jsonwebtoken');
const b64 = require("base64url");
let privateKEY  = fs.readFileSync(appRoot+'/keys/private.key', 'utf8');
let publicKEY  = fs.readFileSync(appRoot+'/keys/public.key', 'utf8'); 




const signIn = (payload) => {

}

const signUp = (payload) => {

} 


const signToken = (payload,options) => {
    let signOptions = {
        issuer: '',
        audience: '',
        // expiresIn: '2d',
        algorithm:  "RS256",
        ...options
    }
    return jwt.sign(payload, privateKEY, signOptions);
}

const verifyToken = async (token, options) => {
    let verifyOptions = {
        issuer: '',
        audience: '',
        algorithm:  "RS256",
        ...options
    }
    try{
        let authTokenRes =  await jwt.verify(token, publicKEY, verifyOptions);
        if(!authTokenRes) {
            return false;
        }
        let authToken = await models.auth_token.findOne({ where: {tokenId: token }});
        /** Check verify if this token was generated */
        if(authToken === null) {
            return false;
        }

        /** Verify if the token is valid */
        if(authToken.get("inValid")) {
            return false;
        }
        if(new Date(authToken.get("validTill")) < new Date()) {
            return false;
        }
        return authTokenRes
    } catch (err){
        return false;
    }
}

const decodeToken = (token) => {
    return jwt.decode(token, {complete: true});
}

module.exports = { signToken, verifyToken, decodeToken };s