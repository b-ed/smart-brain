const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

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

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json(database.users)
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfile(db))

app.put('/image', image.handleImage(db))

app.post('/imageurl', image.handleApiCall)

app.listen(PORT, ()=> {
    console.log(`app is running on port 30001, db hosted on 127.0.0.1`);
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user obj
/profile/:userId --> GET = user obj
/image --> PUT = updated rank

*/