const { response, request } = require('express');
const User = require('../../models/user');
const bcryptjs = require('bcryptjs');
const generateJWT = require('../../utils/generateJWT');
const Role = require('../../models/role');
const jwt = require('jsonwebtoken');

const register = async (req = request, res = response) => {
    try {
        const { name, lastname, email, password, phone } = req.body;

        // Validate if the user exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'El correo electrónico ya existe en el sistema',
                error: true
            });
        }

        // Check if the default role exists
        const defaultRole = await Role.findOne({ where: { name: 'cliente' } });

        if(!defaultRole) {
            return res.status(500).json({
                success: false,
                message: "El rol predeterminado no existe en el sistema",
                error: true            
            });
        }

        const userData = {
            name,
            lastname,
            email,
            password,
            phone,
            role_id: defaultRole.id,
            image_url: null
        };

        // Create user in db
        const user = new User(userData);

        // Hash the password
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(user.password, salt);

        // Save the user in DB
        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id);

        const dataUser = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            password: user.password,
            role: defaultRole.name,
            token
        };

        return res.status(201).json({
            success: true,
            data: dataUser,
            message: 'Te has registrado con éxito'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Error al registrarte'
        });
    }
};

const login = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;

        // Validate exists email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                error: true,
                message: 'Las credenciales de acceso son incorrectas'
            });
        }

        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
      
        if (!validPassword) {
            return res.status(400).json({
                error: true,
                message: 'Las credenciales de acceso son incorrectas'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);
      
        const { name, lastname, phone, email: emailUser, image_url, role_id } = user;

        const dataUser = { name, lastname, phone, email: emailUser, image_url, role_id, token: token };

        return res.status(200).json({
            success: true,
            data: dataUser,
            message: 'Has iniciado sesión con éxito',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: true,
            message: 'Error al iniciar sesión'
        });
    }
}

const validateToken = async (req = request, res = response) => {
    const authHeader = req.headers['authorization'];

    // Separate the token from the 'Bearer' prefix
    token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No tienes token'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(id);

        const {
            name,
            lastname,
            phone,
            email,
            image_url,
            role_id
        } = user;

        const dataUser = { id, name, lastname, phone, email, image_url, role_id, token: token };

        if (user) {
            return res.status(200).json({
                success: true,
                message: 'Token válido',
                data: dataUser
            })
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expirado',
                expired: true,
                error
            });
        }
        return res.status(401).json({
            success: false,
            message: 'Token inválido',
            error
        });
    }
}

module.exports = {
    login,
    register,
    validateToken
}