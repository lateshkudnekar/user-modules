// custom module import
const models = require("../../../models");l
const argon2 = require('argon2');
const { generateToken } = require('../../../utils/helpers');
const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password ) {
            return res.status(500).json({
                success: false,
                message: "Please provide valid username and password"
            })
        }
        const userRecord = await models.users.findOne({ where: { username: username, userType: "admin" } });
        if (!userRecord) {
            return res.status(500).json({
                success: false,
                message: "user does not exists."
            })
        }

        // verify password
        const validPassword = await argon2.verify(userRecord.password, password);
        if (validPassword) {
            delete userRecord.password;
            const payload = {
                id:userRecord.id,
                username:userRecord.username,
                userType:userRecord.userType
            }
            const token = generateToken(payload);
            return res.status(200).json({ success: true, data: { user:payload, token } });
        } else {
            return res.status(500).json({ success: false, message: "Invalid pasword" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "System error, something went wrong"
        })
    }
}
module.exports ={
    signIn
}