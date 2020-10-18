const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'admin',
      database : 'smartbrain'
    }
  });





const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


const port = 3000;





app.post('/signin', signin.handleSignin(db, bcrypt))



app.post('/register', register.handleRegister(db, bcrypt))



app.get('/profile/:id', profile.handleProfile( db))



app.put('/image', image.handleImage(db))








app.listen(port,()=> {
    console.log(`app is running on port ${port}`);
})

