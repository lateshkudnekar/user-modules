
const { Sequelize } = require("sequelize");
const models = require("../../../models");


const getUserModule = async (req, res) => {
    try {
        const { id } = req.user;
        let modulesres = await models.users.findOne({
            attributes: ['id', 'username'],
            where: { id: id },
            include: [
                {
                    model: models.modules,
                    attributes: ['id', 'name'],

                    as: 'modules'
                }
            ]
        })
s
        return res.status(200).json({ modules: modulesres })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            messageg: "somthing went wrong"
        })
    }
}



module.exports = {
    getUserModule,
}