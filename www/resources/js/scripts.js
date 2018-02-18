var xmlhttp;
var $appid = '00de164de018150d983d520a81e61b45';

window.onload = function(){

  //document.addEventListener('deviceready', init);
  init();
}

function init(){

  document.getElementById('btnGetForecast').addEventListener('click', getData);
}

function getData(){

  xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange =  processResult;
  var $zipCode =  document.getElementById('zip').value;

  var $url = 'http://api.openweathermap.org/data/2.5/forecast?zip=' + $zipCode + ',us&appid=' + $appid ;

//  url+= document.getElementById('zip').value;

  //xmlhttp.open('GET', url, false);
  //xmlhttp.send();
  $.getJSON($url)
   .done(processResult)
   .fail(handleErr);





}


function handleErr(jqxhr, textStatus, err) {

  console.log("Request Failed: " + textStatus + ", " + err);
}

function convertKelvinToFahrenheit(kelvin){
   return (kelvin * (9/5) - 459.67).toFixed(1);
}

function convertKelvinToCelsius(kelvin){
   return (kelvin -273.15).toFixed(1);
}


function processResult(theResponse){
  var city ;
  var country;
  var temperature;
  var relativeHumidity;
  var description;
  var wind;
  var forecastIcon;
  var output;
  var theDate;
  var theTime;

  city = theResponse.city.name;
  country = theResponse.city.country;
  output = "Weather For:   " ;
  output = city + ", " + country;

  for (var i = 0; i < theResponse.list.length; i++){

    temperature =  convertKelvinToFahrenheit(theResponse.list[i].main.temp) + ' F/'  +  convertKelvinToCelsius(theResponse.list[i].main.temp) + 'C';
    relativeHumidity = theResponse.list[i].main.humidity;
    description =  theResponse.list[i].weather[0].description;
    wind = theResponse.list[i].wind.speed;
    forecastIcon = theResponse.list[i].weather[0].icon;
    theDate = forecastDate(theResponse.list[i].dt);
    theTime = forecastTime(theResponse.list[i].dt);

    output  = "<div id='weatherResults'>";
    output += '<img src = ./resources/images/icons/' + forecastIcon + '.png align="left" id="weatherImage-" + i ></img>'
    output += "<br/>" + theDate + " " + theTime;
    output += "<br/>Temperature : " + temperature;
    output += "<br/>Humidity    : " + relativeHumidity + '%';
    output += "<br/>Description : " + description;
    output += "<br/>Wind        : " + wind;
    output += "<br/>";
    output += "</div>";
    //$('#weatherImage-'+ i).attr('src','./resources/images/icons/' + forecastIcon + '.png');
    $('#result').append(output);

  }

  function forecastTime(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours() < 10 ? '0' + a.getHours(): a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes(): a.getMinutes();

    if( hour > 12){
      return ( (hour-12) + ':' + min + ' PM' );
    }else {
      return ( hour + ':' + min  + ' AM');
    }

  }


  function forecastDate(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate() < 10 ? '0' + a.getDate(): a.getDate();


    var time = month  + ' ' + date + ', ' + year ;

    return time;
  }


}
