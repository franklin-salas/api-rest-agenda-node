const {response} = require('express');
const Usuario = require('../models/Usuario');
const bcrypt =  require('bcryptjs');
const generarJWT = require('../helpers/jwt');

const crearUsuario = async (req, res = response ) => {
     const {email, name, password} = req.body;
   
    try {

        let usuario =  await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg:'Existe un usuario con ese correo'
            });
        }

        usuario =  new Usuario({email, name, password});
        const salt =  bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        await usuario.save();
       const token = await generarJWT(usuario.id,usuario.name);
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        }); 
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Error de servidor: Hable con el adminsitrador '
        });
    }

};

const loginUsuario = async (req, res = response) => {
    const {email, password} = req.body;
   
    try {

        const usuario =  await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg:'Correo o contraseña no coincide'
            });
        }

        const validPassword = bcrypt.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg:'Correo o contraseña no coincide'
            });
        }
       
        const token = await generarJWT(usuario.id,usuario.name);
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        }); 
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Error de servidor: Hable con el adminsitrador '
        });
    }
}

const revalidarToken = async(req, res = response) => {

    const {uid, name} = req;

    const token = await generarJWT(uid,name);
    res.json({
		uid,
		name,
        ok: true,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}