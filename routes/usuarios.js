const { Router } = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');



const router = Router();

router.get('/', usuariosGet);
router.put('/:id',   [
check('id', 'No es un ID válido').isMongoId(),
check('id' ).custom( existeUsuarioPorID),
check('rol' ).custom( esRoleValido),
validarCampos
],  usuariosPut );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol' ).custom( esRoleValido),
    check('correo' ).custom( emailExiste),
    validarCampos
],usuariosPost );
router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id' ).custom( existeUsuarioPorID),
    validarCampos
], usuariosDelete );
router.patch('/', usuariosPatch );

module.exports = router;