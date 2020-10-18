// custom module import
const models = require("../../../models");
const argon2 = require('argon2');
const { generateToken } = require('../../../utils/helpers');
const { Sequelize } = require("../../../models");
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
        const userRecord = await models.users.findOne({ where: { id: userId , userType:'normal'} });
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
                message: "module already assigned."
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
const getAllModules = async (req,res) => {
    try {
        const modulesres = await models.modules.findAll();
        return res.status(200).json({modules:modulesres})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            messageg:"somthing went wrong"
        })
    }
}

const listAllUsers = async (req,res) => {
    try {
        const modulesres = await models.users.findAll({
            attributes:['id','username'],
            where:{
                userType:'normal',
            },
            include:[
                {
                    model:models.modules,
                    attributes:['id','name'],
                    as:"modules",
                }
            ]
        });
        return res.status(200).json({modules:modulesres})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"somthing went wrong"
        })
    }
}

const unAssignModule = async (req,res) => {
    try {
        const { userId, moduleId } = req.body;
        if(!userId) {
            return res.status(500).json({ success: false, message: "User is required" })
        }
        if(!moduleId) {
            return res.status(500).json({ success: false, message: "Module is required" })
        }
    
        // query users and modues if nboth record are available
        const userRecord = await models.users.findOne({ where: { id: userId , userType:'normal'} });
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
    

        const destroyLink = await models.user_modules.destroy({ where:{userId,moduleId}});
        return res.status(200).json({
            success: true,
            message:"success",
            data:{
                module:destroyLink
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
    getAllModules,
    signIn,
    assignModule,
    listAllUsers,
    unAssignModule
}