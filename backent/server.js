'use strict'
const cors = require('cors');
const express = require('express');
const authRoutes=require('./routes/auth.routes');
const propierties=require('./config/propetis');
const DB =require('./config/db');

DB()

;

const app= express();
const router=express.Router();

const bodyParser=require('body-parser');
const bodyParserJSON=bodyParser.json();
const bodyParserURLEncoded= bodyParser.urlencoded({extended: true});

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);



app.use(cors());

app.use('/api',router);
authRoutes(router);
router.get('/',(req,res)=>{
    res.send('Hello from home');
});

app.use(router);
app.listen(propierties.PORT,()=>console.log(`Server running on port ${propierties.PORT}`)
);

