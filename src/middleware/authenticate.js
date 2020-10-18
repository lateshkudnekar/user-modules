
const DEFAULT_CODES = require("../../../utils/defaultCode").DEFAULT_CODES;

module.exports  = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const audience = req.headers.origin;
    let options = {
        issuer: process.env.HOST,
        audience: audience,
        algorithm:  ["RS256"],
    }
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const verifiedToken = await require("../auth/auth").verifyToken(token, options);
        console.log(verifiedToken, "------- token");
        if(verifiedToken) {
            req.user = verifiedToken.user
            next();
        } else {
            return res.status(200).send({
                code:DEFAULT_CODES.INVALID_TOKEN.code,
                success:false,
                message: DEFAULT_CODES.INVALID_TOKEN.message,
                data: {}
            })   
        }
    } else {
        return res.status(200).send({
            code:DEFAULT_CODES.INVALID_TOKEN.code,
            success:false,
            message: DEFAULT_CODES.INVALID_TOKEN.message,
            data: {}
        })   
    }
};

