
const { Sequelize } = require("sequelize");
const models = require("../../../models");


const getUserModule = async (req,res) => {
    try {
        const {id} = req.user;
        const modulesres = await models.modules.findAll({
            include:[
                {
                    model:models.user_modules,
                    where:{
                        userId:id
                    }
                }
            ]
        },)
        return res.status(200).json({modules:modulesres})
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            messageg:"somthing went wrong"
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

module.exports = {
    getUserModule,
    getAllModules,
}