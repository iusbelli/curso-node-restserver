const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario =require('../models/usuario');
const usuario = require('../models/usuario');



const usuariosGet = async (req = request, res = response ) => {    
const {limite=5, desde=0} = req.query;
const query = {estado:true};


const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
])
    res.json({
        total, 
        usuarios
    });
}
//status(400)
const usuariosPut = async(req, res = response ) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

//TODO validar contra la base de datos

if( password ){
    //Encript password
    const salt = bcryptjs.genSaltSync();
    resto.password= bcryptjs.hashSync( password, salt);
}


console.log(req.body);

const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({ usuario });
}
const usuariosPost = async (req, res = response ) => {
    
    

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario ({nombre, correo, password, rol});

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password= bcryptjs.hashSync( password, salt)

    //Guardar DB
    await usuario.save();

    res.json({
        msg:'post API - usuariosPost', 
        usuario
    });
}
const usuariosDelete = async (req, res = response ) => {
   
   const {id} = req.params;
   //fisicamente lo borramos
   //const usuario = await Usuario.findByIdAndDelete(id);

   const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
       id
    });
}
const usuariosPatch = (req, res = response ) => {
    res.json({
        msg:'patch API - usuariosPatch'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}