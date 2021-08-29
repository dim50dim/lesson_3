const users = require('../dataBase/users.json');
const util = require('util');
const fs = require('fs');
const path = require('path');


module.exports = {
    getUresById  : (req,res) =>{
        const { user_id } = req.params;

        res.json(user[user_id]);
    },

    getUserByEmail : async (req,res)=>{
        const {email, password} = req.body;
        const writeFilePromise = util.promisify(fs.writeFile);
        const readFilePromise = util.promisify(fs.readFile);


        const content = await readFilePromise(path.join(__dirname, 'dataBase', 'users.json'));

        let parseN = JSON.parse(content);

        parseN.push({email, password});

        await writeFilePromise(path.join(__dirname, 'dataBase', 'users.json'), JSON.stringify(parseN));

        res.send('nice');
    }

}