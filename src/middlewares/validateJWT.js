const { response } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req, res = response, next) => {
    const authHeader = req.headers["authorization"];

    token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            success:false,
            error:true,
            message:"No tienes token"
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(id);

        if(!user){
            return res.status(401).json({
                success:false,
                error:true,
                message:"Token inválido"
            });
        }
        
        req.user = user;
        next();

    } catch (error) {
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({
                success:false,
                error:true,
                message:"Token expirado"
            });
        }
        return res.status(401).json({
            success:false,
            error:true,
            message:"Token inválido"

        });
    }
}

module.exports = { validateJWT };