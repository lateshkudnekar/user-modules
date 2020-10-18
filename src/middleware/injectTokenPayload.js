/* 
* Middleware to used for forms submission to check if token present,
 * inject decode and inject payload into req
*/
module.exports = async (req, res, next) => {
    //
    const authHeader = req.headers.authorization;
    const audience = req.headers.origin || "";
    let options = {
        issuer: process.env.HOST,
        audience: audience || "",
        algorithm:  ["RS256"],
    }
    // return res.status(200).send({})
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log(token);
        const verifiedToken = await require("../auth/auth").verifyToken(token, options);
        console.log(verifiedToken, "token");
        if(verifiedToken) {
            req.user = verifiedToken.user
            next();
        } else {
            next();
        }
    } else {
        next();
    }
}