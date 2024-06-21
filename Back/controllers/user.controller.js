import bcryptjs from 'bcryptjs';
import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// /api/v1/users/register  ruta para el registro
const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;

        // Validaciones
        if (!username || !email || !password) {
            return res.status(400).json({ ok: false, msg: "Falla en requerir los campos de usuario, email, password" });
        }

        const user = await UserModel.findOneByEmail(email);
        if (user) {
            return res.status(409).json({ ok: false, msg: "El email ya existe" });
        }
        
        // Hash de la contraseña
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Crear usuario
        const newUser = await UserModel.create(email, hashedPassword, username);

        // Generar token JWT
        const token = jwt.sign(
            { email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(201).json({ ok: true, msg: "Usuario registrado con éxito", newUser, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }
};

// /api/v1/users/login   ruta para el login
const login = async (req, res) => {
    try {
        // Implementa la lógica de inicio de sesión aquí
        const { username, email, password } = req.body;
        //
        if(!email || !password){
            return res.status(400).json({
                error: "Requiere los campos: email, password"
            })
        }
        const user = await UserModel.findOneByEmail(email)
        if(!user){
            return res.status(404).json({
                error: "Correo invalido"
            })
        }

        const isMatch = await bcryptjs.compare(password, user.password)
        if(!isMatch){
            return res.status(404).json({
                error: "Contraseña invalida"
            })
        }

         // Generar token JWT
         const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200 ).json({ ok: true, msg: "Usuario login con éxito", user, token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }
}

// Configurar la ruta protegida
const profile = async(req,res)=>{
    try {
        
        const user = await UserModel.findOneByEmail(req.email)
       return res.json({ ok: true, msg: user})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }
}

export const UserController = { register, login,profile };