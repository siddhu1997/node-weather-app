const request = require("postman-request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=b03d4f9410dccd2f66983ad26a29a8f5&query="+ encodeURIComponent(latitude) + "," + encodeURIComponent(longitude)
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect Weather Service!")
        }  else if (body.error) {
            callback("Unable to find location!")
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast