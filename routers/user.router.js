const router = require('express').Router();
const users = require('../dataBase/users.json');
const util = require('util');
const fs = require('fs');


const writeFilePromise = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);


router.get('/:user_id',(req,res)=>{
    const { user_id } = req.params;
    const query = req.query;

    console.log(query)

    res.json(users[user_id]);
});

router.get( '/', async (req, res) => {
    const {email, password} = req.body;

    const content = await readFilePromise(path.join(__dirname, 'dataBase', 'users.json'));

    let parseN = JSON.parse(content);

    parseN.push({email, password});

    await writeFilePromise(path.join(__dirname, 'dataBase', 'users.json'), JSON.stringify(parseN));

    res.send('nice');
});

router.get('/', (req,res) =>{
    res.json(users);
});
module.exports = router;