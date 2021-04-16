const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

//creating express app
const app = express();


//MagoDB connect
const dbURI ='mongodb+srv://netninja:test123@nodetut.0fren.mongodb.net/nodetut?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


// register view engine in node environment 
app.set('view engine', 'ejs');

// middleware -> rendering static files to the browser 
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//Blogroutes
app.use('/blogs',blogRoutes)

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
})