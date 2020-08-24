const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express configuration
const pulicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebar view engine and views directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(pulicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Soheil Yousefi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Soheil Yousefi'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Soheil Yousefi',
        message: 'This message will help  you.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(longitude, latitude, (error, {forecast, temperature, cloud_percent} = {}) => {
            if (error) {
                return res.send({ error });
            }
            
            res.send({
                address: req.query.address,
                location,
                forecast,
                temperature,
                cloud_percent
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Soheil Yousefi',
        errorMessage: 'Help article not found!'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Soheil Yousefi',
        errorMessage: 'Page not found!'
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});