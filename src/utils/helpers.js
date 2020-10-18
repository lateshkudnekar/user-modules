
const fs   = require('fs');
const jwt  = require('jsonwebtoken');
const b64 = require("base64url");
let privateKEY  = fs.readFileSync(appRoot+'/keys/private.key', 'utf8');
let publicKEY  = fs.readFileSync(appRoot+'/keys/public.key', 'utf8'); 


const encryptStr = (str,salt) => {
    return crypt.encrypt(str);
};

const decryptStr = (str) => {
    return crypt.decrypt(str);
};

const generateToken = (payload) => {
    let signOptions = {
        expiresIn: '2d',
        algorithm:  "RS256",
    }
    return jwt.sign(payload, privateKEY, signOptions);
}

const verifyToken = async (token, options) => {
    let verifyOptions = {
        algorithm:  "RS256",
    }
    try{
        let authTokenRes =  await jwt.verify(token, publicKEY, verifyOptions);
        if(!authTokenRes) {
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

module.exports = {
    verifyToken,
    generateToken,
    decodeToken
}