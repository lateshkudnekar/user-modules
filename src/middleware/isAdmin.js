module.exports  = async (req, res, next) => {
    const authHeader = req.headers.authorization;
   
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const verifiedToken = await require("../utils/helpers").verifyToken(token);
        console.log(verifiedToken);
        if(verifiedToken) {
            if(verifiedToken.userType =="admin") {
               return  next();
            }
            return res.status(200).send({
                success:false,
                message: "Invalid access",
                data: {}
            })   
        } else {
            return res.status(200).send({
                success:false,
                message: "invalid token",
                data: {}
            })   
        }
    } else {
        return res.status(200).send({
            success:false,
            message: "invalid token",
            data: {}
        })   
    }
};
