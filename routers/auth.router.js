const router = require('express').Router();
const users = require('../dataBase/users.json');

router.get('/',(req,res) =>{ //make login process
    const{email,password} = req.body;



    const user = users.find(user => user.email === email );

    if(!user){
        res.status(404).end('email is not found');
        return;
    }else if(user.password !== password){
        res.status(404).end('password is not correct , please check it once more');
    }
    res.json(users);


});

module.exports = router;

