const express = require("express")
const path = require("path")
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)
app.use(express.static(publicDir))

app.get("",(req,res) => {
    res.render("index",{
        title: "Weather App!",
        name: "Siddharth"
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title:"About Me!!!",
        name: "Siddharth"
    })
})

app.get("/help", (req,res) => {
    res.render("help", {
        message: "Help will always be given at Hogwarts to those who deserve it",
        name: "Siddharth"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "address not provided"
        })
    }
    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecastData: "Temperature is "+forecastData.temperature+" but it feels like "+forecastData.feelslike,
                location
            })
        });
    });
})

app.get("/products",(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: "Provide a search item"
        })
    }
    res.send({
        products: req.query.search
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Oops!!!",
        name: "Siddharth",
        errorMessage: "Help Article not found!"

    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "Oops!!!",
        name: "Siddharth",
        errorMessage: "404!"

    });
})

app.listen(port, () => {
    console.log("Server is up!!!")
})