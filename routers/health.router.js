const router = require('express').Router();

router.get('/',(req,res) =>{
    res.send('<h2>for sure -- health makes sense</h2>');
})

module.exports = router;