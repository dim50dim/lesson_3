const express = require('express');
const path = require('path');
const expHbs = require('express-handlebars');


const { PORT } = require('./configs/configs')


const app = express();
const staticPath = path.join(__dirname,'static');

const { authRouter ,
    userRouter,
    pingRouter,
   healthRouter } = require('./routers');


app.use('/ping',pingRouter);
app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use('/health',healthRouter);

// app.use('/health',healthRouter);


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(staticPath));

app.set('view engine', '.hbs');
app.engine('.hbs',expHbs({defaultLayout: false}));
app.set('views',staticPath);




//////////  Render endpoints
app.get('/login',(req,res) =>{
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





