$(document).ready(function() {
  
  $.getJSON("http://ip-api.com/json", function(d) {  
    var lat = d.lat;
    var long = d.lon;
    var country = d.country;
    var city = d.city;
    var state = d.regionName;
    var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+ long +"&appid=adf8b3e4ef496fe673ae90dfcac36576";
    
    $.getJSON(api, function(data) {      
     // var country = data.sys.country;
     // var city = data.name;
      // ^ removed openweathermap's country & name
      // used ip-api.com's country, city & state name
      var weather = data.weather[0].description;
      var genWeather = data.weather[0].main;
      var weatherIcon = data.weather[0].icon;
      var weatherIconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";      
      var kelTemp = data.main.temp;
      var farTemp = (kelTemp * (9 / 5) - 459.67).toFixed(2);
      var celTemp = (kelTemp - 273).toFixed(0);
      var tempSwap = true;  
      
      $("#place").animate({
        opacity: 0
      }, 300,
      function() {
        $(this).animate({
          opacity: 1
        }, 300);      
      $("#place").html(city + ", " + state + ", ")
      });
      
      if (state === null || state === "" || state === city) {
        $("#place").html(city + ",");
      } else if (city === null || city == "" || city === state) {
        $("#place").html(state + ",");
      }      
      
      $("#country").animate({
        opacity: 0
      }, 600,
      function() {
        $(this).animate({
          opacity: 1
        }, 600);      
      $("#country").html(country)
      });
      
      $("#weather").animate({
        opacity: 0
      }, 900,
      function() {
        $(this).animate({
          opacity: 1
        }, 900);
      $("#weather").html("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>" + " " + weather)
      });
      
      var tempButton1 = '<button class = "btn btn-outline-secondary txtStyle">';
      var tempButton2 = '</button>';      
      
      $("#temp").animate({
        opacity: 0
      }, 1200,
      function() {
        $(this).animate({
          opacity: 1
        }, 1200);
      $("#temp").html(tempButton1 + celTemp + " ℃" + tempButton2)
      });
      
      $("#temp").click(function() {
        
        if (tempSwap === false) {
          $("#temp").html(tempButton1 + celTemp + " ℃" + tempButton2);
          tempSwap = true;
        } else {
          $("#temp").html(tempButton1 + farTemp + " ℉" + tempButton2);
          tempSwap = false;
        }        
      });
      
      // background images courtesy of Zerochan.net!
      if (genWeather === "Rain" || genWeather === "Drizzle") {
        $("body").css({'background-image' : 'url(http://static.zerochan.net/Pok%C3%A9mon.Sun...Moon.full.2077477.jpg)', 'background-repeat': 'no-repeat', 'background-position' : 'center'});
      } else if (genWeather === "Clouds") {
        $("body").css({'background-image' : 'url(http://static.zerochan.net/Sakimori.full.2077033.jpg)', 'background-repeat': 'no-repeat', 'background-position' : 'center'});
      } else if (genWeather === "Thunderstorm") {
        $("body").css({'background-image' : 'url(http://static.zerochan.net/Pok%C3%A9mon.full.1940344.jpg)', 'background-repeat': 'no-repeat', 'background-position' : 'center'});         
      } else if (genWeather === "Snow") {
        $("body").css({'background-image' : 'url(http://static.zerochan.net/Pixiv.Id.5758007.full.2072558.jpg)', 'background-repeat': 'no-repeat', 'background-position' : 'center'});     
      } else if (genWeather === "Clear") {
        $("body").css({'background-image' : 'url(http://static.zerochan.net/Hatsune.Miku.full.1688245.jpg)', 'background-repeat': 'no-repeat', 'background-position' : 'center'});         
      } else {
        $("body").css({'background-color' : "black"});
      };

    });  
  });   
  
});