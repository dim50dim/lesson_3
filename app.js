const express = require('express');
const path = require('path');
const expHbs = require('express-handlebars');
const fs = require('fs');
const util = require('util');
const { PORT } = require('./configs/configs')
const users = require('./dataBase/users.json');

const app = express();

const writeFilePromise = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);


const staticPath = path.join(__dirname,'static');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(staticPath));

app.set('view engine', '.hbs');
app.engine('.hbs',expHbs({defaultLayout: false}));
app.set('views',staticPath);

app.get('/users', (req,res) =>{ // another route to users file
    res.json(users);
});

app.post('/auth',(req,res) =>{ //make login process
    const{email,password} = req.body;


    const user = users.find(user => user.email === email );

    if(!user){
        res.status(404).end('email is not found');
        return;
    }else if(user.password !== password){
        res.status(404).end('password is not correct , please check it once more');
    }
    res.json(users)

    });

app.post('/users', (async (req, res) => {
    const{email, password} = req.body;

    const content = await readFilePromise(path.join(__dirname,'dataBase','users.json'));

      let parseN  = JSON.parse(content);

    parseN.push({email,password});

    await writeFilePromise(path.join(__dirname,'dataBase','users.json'),JSON.stringify(parseN));

    res.send('nice');
}))

/// ENDPOINT
app.get('/users/:user_id' , (req,res) => {
    const {user_id} = req.params  
    const query = req.query;

    console.log(query)

    res.json(users[user_id]); // this is dinamic paramets
})
//////////  Render endpoints
app.get('/login',(req,res) =>{ // Now we can see our page
    res.render('login');
})
app.get('/authorisation',(req, res) =>{
    res.render('authorisation')
})
app.get('/success',((req, res) => {
    res.render('success');
}))











app.listen(PORT, () => {
    console.log('app listen',PORT)
});





