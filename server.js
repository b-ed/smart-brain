const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const corsOptions ={
    origin: 'https://git.heroku.com/enigmatic-brook-30570.git',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1404',
      database : 'smartbrain'
    }
});


const app = express();

app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req, res) => {
    res.json('it is working')
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfile(db))

app.put('/image', image.handleImage(db))

app.post('/imageurl', image.handleApiCall)

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}, db hosted on 127.0.0.1`);
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user obj
/profile/:userId --> GET = user obj
/image --> PUT = updated rank

*/