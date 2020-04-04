const express = require('express')
const appConfig = require('./config/appConfig')
var fs = require('fs')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
const globarErrorMiddleware = require('./middlewares/appErrorHandler')
const routeLoggerMiddleware = require('./middlewares/routeLogger')

const app = express()

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use(globarErrorMiddleware.globalErrorHandler)
app.use(routeLoggerMiddleware.logIp)

let modelsPath = './models';
fs.readdirSync(modelsPath).forEach(function(file) {
    if(~file.indexOf('.js')) {
        console.log('Including Models file')
        console.log(modelsPath + '/' + file)
        require(modelsPath + '/' + file)
    }
})

let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function(file) {
    if (~file.indexOf('.js')) {
        console.log('Including Routes file')
        console.log(routesPath + '/' + file)
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});

app.use(globarErrorMiddleware.globalNotFoundHandler)



app.listen(appConfig.port, () => {
    console.log(`Example app listening at http://localhost:${appConfig.port}`)
    // creating mongodb connection
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true });
})

mongoose.connection.on('error', function(err) {
    console.log('database connection error');
    console.log(err);
})

mongoose.connection.on('open', function(err) {
    if(err) {
        console.log('database error');
        console.log(err);
    }else {
        console.log('database connection open success');
    }
})