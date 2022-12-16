const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "8c3950d9cd8abc6ce0000f9d76f8eba3";
  const unit = "metrics";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){
    console.log(response);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temparature in " +query+ " is " + temp + " degrees celcius.</h1>");
      res.write("<h3>The weather is currently " + description + "</h3>");
      res.write("<img src="+imageURL+"> ");
      res.send();
    })
  })

})



app.listen(process.env.PORT || 3000, function(req, res){
  console.log("Server is running on port 3000.");
})
