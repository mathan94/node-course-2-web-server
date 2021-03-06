const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express()

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs')


// middlewear
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if (err){
            console.log('Unable to append to serve.log.');
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance')
// })

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    //response.send('<h1> Hello from express! </h1>');
    response.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'namaskaram'
    })
})

app.get('/about', (request, response) => {
    //response.send('<h1> Hello from express! </h1>');
    response.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.get('/projects', (request, response) => {
    //response.send('<h1> Hello from express! </h1>');
    response.render('projects.hbs', {
        pageTitle: 'Projects Page'
    })
})

app.get('/bad', (request, response) => {
    response.send({
        error:'bad route'
    })
})

app.get('/yo' , (request, response) => {
    response.send('<h1>Yo</h1>');
})

app.listen(port, () => {
    console.log('Server is up on port ${port}');
});