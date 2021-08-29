const router = require('express').Router();

router.get('/',(req,res) =>{
    res.send('<h2>now we are going to play ping-pong</h2>');
})

module.exports = router;