'use strict';
//npm modules
// custom module import
const models = require("../../../models");
const argon2 = require('argon2');
const { generateToken } = require('../../../utils/helpers');
const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userRecord = await models.users.findOne({ where: { username: username, userType: "normal" } });
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

const signUp = async (req, res) => {

    const { username, password } = req.body;

    try {
        const userRecord = await models.users.findOne({ where: { username: username} });
        if (userRecord) {
            return res.status(500).json({
                success: false,
                message: "user already registered."
            })
        }
        const hashedPassword = await argon2.hash("@dmin124");

        const newuserRecord = await models.users.create({
            username,
            password: hashedPassword,
            userType: 'normal'
        });
        if (!newuserRecord) {
            return res.status(500).json({
                success: false,
                message: "System error, something went wrong"
            })
        }

        delete newuserRecord.password;
        const payload = {
            id:newuserRecord.id,
            username:newuserRecord.username,
            userType:newuserRecord.userType
        }
        const token = generateToken(payload);
        return res.status(200).json({ success: true, data: { user:payload, token } });
        
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "System error, something went wrong"
        })
    }
   
}

module.exports = {
    signIn,
    signUp
};