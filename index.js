const path = require('path');
const crypto = require('crypto');
const express = require('express');
const app = express();
app.use(express.json());

//Beginning strict content security policy
app.use((_req, res, next) => {
    res.set("Content-Security-Policy", "default-src 'self'");
    next();
});
//End strict content security policy

//Beginning React
app.use(express.static(path.join(__dirname, 'react', 'build')));
//End React

//Beginning api integration
//Sesion ID Validation
app.use((req, res, next) => {
    if(req.path.includes('/api')){
        //Validate session id
        if(!req.headers.cookie.includes('_csid')){
            res.status(401).send('You are no authenticated');
        }else{
            //Check IP
            //Validate token
            next();
        }
    }else{
        next();
    }
});

app.get('/api/current-date', (_req, res) => {
    res.status(200).json({currentDate: new Date()});
});
//End api integration

//Beginning oidc token integration
app.get('/token/callback/:token', (_req, res) => {
    //This settings must match your OIDC Settings
    res.cookie('_csid', crypto.randomUUID(), {
        domain: 'localhost',
        expires: new Date(Date.now() + (60000 * 15)),
        httpOnly: true,
        sameSite: 'none',
        secure: true
    }).redirect('/');
});
//End token integration

app.listen(8080, () => {
    console.log('React APP Started 8080');
});