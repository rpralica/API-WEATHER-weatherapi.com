'use strict';
const result = 'Nema Opisa za navedeni grad';
const inpGrad = document.getElementById('grad');
const btnPrikazi = document.getElementById('prikazi');
const trenutnoContainer = document.getElementById('trenutno-container');

btnPrikazi.addEventListener('click', function (e) {
  e.preventDefault();

  if (inpGrad.value === '') {
    Swal.fire({
      position: 'top-end',
      icon: 'warning',
      title: 'Upišite grad',
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    trenutnoContainer.innerHTML = '';
    const brojDana = +brDana.value + 1;
    currentWeather(inpGrad.value);
    forecastWeather(inpGrad.value, brojDana);
    console.log(optDani.value);
    prognozaContainer.innerHTML = '';
  }
});

function currentWeather(city) {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=bc0b0bc6a6694e50b0a93928230806&q=${city}&aqi=no&lang=sr`
  )
    .then(res => res.json())
    .then(data => {
      console.log(data)
      renderTrenutno(data);
    });
}

function renderTrenutno(data) {
  const code = data.current.condition.code;
  const nema = data.alerts?.alert[0]?.desc;
  const result = nema ?? ' Za danas nema upozorenja';
  const el = `
<div class="col-4">
<br><br>
<img src="/Assets/${code}.png" alt="">
<br><br>
</div>
<div class="col-8">
<br><br>
<h5>Lokacija: <span class="opis">${data.location.name} (${data.location.country})</span></h5>
<h5>Vrijeme: <span class="opis">${data.current.condition.text}</span></h5>
<h5>Temper: <span class="opis">${data.current.temp_c} °C</span></h5>
<h5>Vlažnost: <span class="opis">${data.current.humidity}</span></h5>
<h5>Alert:<span class="opis">${result}</span></h5>

<br>

</div>

`;
  trenutnoContainer.insertAdjacentHTML('beforeend', el);
}
currentWeather('Banja Luka');

//Prognoza
const optDani = document.getElementById('optDani');
const table = document.getElementById('tBody');
const brDana = document.getElementById('brDana');
const prognozaContainer = document.getElementById('prognoza-container');

function forecastWeather(city, days) {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=bc0b0bc6a6694e50b0a93928230806&q=${city}&days=${days}&aqi=no&alerts=yes&lang=sr`
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);

      return renderPrognoza(data);
    });
}

function renderPrognoza(data) {
  data.forecast.forecastday.forEach((el, i) => {
    const code = data.forecast.forecastday[i].day.condition.code;
    
      let datum = new Date(data.forecast.forecastday[i].date);

      el = `
    <div class="row  border border-light border-top-5 trenutni-css rounded">
    <br><br>
    <h1 class="mt-5" style="text-align:center">${datum.toLocaleDateString('sr-SR')}</h1>
  
    <div class="col-4 ">
    <br><br>
    <img src="/Assets/${code}.png" alt="">
</div>
<div class="col-8">

<table id="table" class="table table-striped" style="font-size: larger;">
<thead>


</thead>
<tbody id="tBody">

<tr>
<td class="td-bold" strong>Prognoza</td>
<td>${data.forecast.forecastday[i].day.condition.text}</td>
</tr>

   <tr>
<td class="td-bold">Temperatura</td>
<td>${data.forecast.forecastday[i].day.avgtemp_c} °C</td>
</tr>

<tr>
<td class="td-bold">Vjerovatnoća kiše</td>
<td>${data.forecast.forecastday[i].day.daily_chance_of_rain} %</td>
</tr>
<tr>
<td class="td-bold">Vjerovatnoća snijega</td>
<td>${data.forecast.forecastday[i].day.daily_chance_of_snow} %</td>
</tr>


    
<tr>
<td class="td-bold">Izlazak sunca</td>
<td>${data.forecast.forecastday[i].astro.sunrise}</td>
</tr>
<tr>
<td class="td-bold">Zalazak sunca</td>
<td>${data.forecast.forecastday[i].astro.sunset}</td>
</tr>
<tr>
<td class="td-bold">UV index</td>
<td>${data.forecast.forecastday[i].day.uv}</td>
</tr>
<br><br><br>

</tbody>
</table>
<br><br><br>
</div>
<br>
</div>


<br>
    `;
      prognozaContainer.insertAdjacentHTML('beforeend', el);
    
  });
}

forecastWeather('Banja Luka', 5);
//
/* 
      const nema = data.alerts.alert[0]?.desc;
      const result = nema ?? 'Nema Opisa za navedeni grad';
      console.log(data);
      console.log(data.forecast.forecastday[0].astro.sunrise);
      console.log(data.forecast.forecastday[0].astro.sunset);
      console.log(data.forecast.forecastday[0].hour[0].temp_c + ' C');
      console.log(data.forecast.forecastday[0].hour[0].condition.text);
      console.log(data.forecast.forecastday[0].hour[0].condition.icon);
      console.log(data.forecast.forecastday[0].hour[0].condition.code);
      console.log(nema);
      document.getElementById('test').value = result; */

const a = 'Nema Opisa za navedeni grad';

function optionDani() {
  for (let i = 1; i < 11; i++) {
    const el = `
    <option value="${i}" selected>${i} </option>
    `;
    optDani.insertAdjacentHTML('beforebegin', el);
  }
}

optionDani();

function ikone() {
  fetch('/weather_conditions.json')
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}

ikone();
