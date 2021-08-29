const router = require('express').Router();
const users = require('../dataBase/users.json');

const userController = require('../controlers/user.controller')




router.get('/:user_id', userController.getUresById );

router.get( '/', userController.getUserByEmail);

router.get('/', (req,res) =>{
    res.json(users);
});
module.exports = router;