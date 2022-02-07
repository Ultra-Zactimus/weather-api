import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// function kelvin_Fahrenheit(k) {
//   return ((k-273.15)*9/5+32)
// }

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    // const city = $('#location').val();
    const zipcode = $('#zip').val();
    // $('#location').val("");
    $('#zip').val("")

    let request = new XMLHttpRequest();
    let geoRequest = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&appid=${process.env.API_KEY}`;
    let zipLat = ''
    let zipLon = ''
    let response = ''
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        response = JSON.parse(this.responseText);
        zipLat = response.coord.lat
        zipLon = response.coord.lon
        const geoCode = `http://api.openweathermap.org/geo/1.0/reverse?lat=${zipLat}&lon=${zipLon}&limit=5&appid=${process.env.API_KEY}`;
        geoRequest.open("GET", geoCode, true);
        geoRequest.send();
      } else if (this.status !== 200) {
      }
    };

    geoRequest.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const geoResponse = JSON.parse(this.responseText);
        getElements(response, geoResponse);
      } else if (this.status !== 200) {
      }
    };
    
    request.open("GET", url, true);
    request.send();

    function getElements(response, geoResponse) {
      console.log(geoResponse)
      console.log(response)
      console.log(zipLat)
      console.log(zipLon)
      $('.showLocale').text(`${response.name}, ${geoResponse[0].state}, ${response.sys.country}`)
      $('.showHumidity').text(`The humidity is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature is ${Math.round(response.main.temp)} degrees Fahrenheit.`);
    }
  });
});
