const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const exiteRol = await Role.findOne({rol});
    if(!exiteRol){
        throw new Error(`El rol ${ rol} no esta registrado en la base de datos`)
    }

}

const emailExiste = async(correo = '') => {
    //Verificar si el correo existe
    const exiteEmail = await Usuario.findOne({correo});
    if(exiteEmail){
        throw new Error(`El correo ${correo} ya está registrado`)
    }
  
}

const existeUsuarioPorID = async(id) => {
    //Verificar si el id existe
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id no existe  ${id} `)
    }
  
}

module.exports= {
    esRoleValido,
    emailExiste,
    existeUsuarioPorID
}

