// custom module import
const models = require("../../../models");
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

const assignModule = async (req,res) => {
    try {
        const { userId, moduleId } = req.body;
        if(!userId) {
            return res.status(500).json({ success: false, message: "User is required" })
        }
        if(!moduleId) {
            return res.status(500).json({ success: false, message: "Module is required" })
        }
    
        // query users and modues if nboth record are available
        const userRecord = await models.users.findOne({ where: { id: userId } });
        if (!userRecord) {
            return res.status(500).json({
                success: false,
                message: "user does not exists."
            })
        }
    
        const moduleRecord = await models.modules.findOne({ where: { id: moduleId } });
        if (!moduleRecord) {
            return res.status(500).json({
                success: false,
                message: "modules is does not exists."
            })
        }
    
        const usermoduleRecord = await models.user_modules.findOne({ where: { moduleId, userId } });
        if (usermoduleRecord) {
            return res.status(500).json({
                success: false,
                message: "modules already exists."
            })
        }
        const usermoduleLink = await models.user_modules.create({ userId,moduleId});
        return res.status(200).json({
            success: true,
            data:{
                module:moduleRecord
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Somthing went wrong."
        })
    }
   


}
module.exports ={
    signIn,
    assignModule
}