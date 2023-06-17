'use strict';
const result = 'Nema Opisa za navedeni grad';
const inpGrad = document.getElementById('grad');
const btnPrikazi = document.getElementById('prikazi');
const trenutnoContainer = document.getElementById('trenutno-container');
const cords = [];
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
    `https://api.weatherapi.com/v1/current.json?key=293d337328c946e5a86153625231306&q=${city}&aqi=no&lang=sr`
  )
    .then(res => res.json())
    .then(data => {
      //console.log(data)
      renderTrenutno(data);
    });
}

function renderTrenutno(data) {
  const code = data.current.condition.code;
  const nema = data.alerts?.alert[0]?.desc;
  const result = nema ?? ' Za danas nema upozorenja';
  const el = `
<div class="col-3">
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
//currentWeather('Banja Luka');

//Prognoza
const optDani = document.getElementById('optDani');
const table = document.getElementById('tBody');
const brDana = document.getElementById('brDana');
const prognozaContainer = document.getElementById('prognoza-container');

function forecastWeather(city, days) {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=293d337328c946e5a86153625231306&q=${city}&days=${days}&aqi=no&alerts=yes&lang=sr`
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
    function imeDana(day) {
      const dan = [
        'Nedelja',
        'Ponedeljak',
        'Utorak',
        'Srijeda',
        'Četvrtak',
        'Petak',
        'Subota',
        
      ];

      let dayName = dan[day ];
      return dayName;
    }
    let datum = new Date(data.forecast.forecastday[i].date);

    el = `
    <div class="row shadow-lg p-3 mb-5 bg-body  border border-light border-top-5 trenutni-css rounded">
    <br><br>
    <h1 class="fw-bold text-light nasl" class="mt-5" style="text-align:center"><span class="text-info">${imeDana(
      new Date(data.forecast.forecastday[i].date).getDay()
    )}</span>  ${datum.toLocaleDateString('sr-SR')}</h1>
  
    <div class="col-4 ">
    <br><br>
    <img src="/Assets/${code}.png" alt="">
</div>
<div class="col-8">

<table id="table" class="table " style="font-size: larger;">
<thead>


</thead>
<tbody id="tBody">

<tr>
<td  strong>Prognoza</td>
<td class="text-primary">${data.forecast.forecastday[i].day.condition.text}</td>
</tr>

   <tr>
<td >Temperatura</td>
<td class="text-primary" >${data.forecast.forecastday[i].day.avgtemp_c} °C</td>
</tr>

<tr>
<td >Vjerovatnoća kiše</td>
<td class="text-primary">${data.forecast.forecastday[i].day.daily_chance_of_rain} %</td>
</tr>
<tr>
<td >Vjerovatnoća snijega</td>
<td class="text-primary">${data.forecast.forecastday[i].day.daily_chance_of_snow} %</td>
</tr>


    
<tr>
<td >Izlazak sunca</td>
<td class="text-primary">${data.forecast.forecastday[i].astro.sunrise}</td>
</tr>
<tr>
<td >Zalazak sunca</td>
<td class="text-primary">${data.forecast.forecastday[i].astro.sunset}</td>
</tr>
<tr>
<td >UV index</td>
<td class="text-primary">${data.forecast.forecastday[i].day.uv}</td>
</tr>
<br><br><br>
</tbody>
</table>
<br><br><br>

</div>
<br>




</div>

<br>
</div>

<div class="container collapse"id="collapseExample" >
<div class="row  ">
<div class="col-2 card shadow-lg p-3 mb-5 bg-light   border border-5 border-info">
<label class=" form-control bg-warning fw-bold text-center">04:00</label>
<img src="${data.forecast.forecastday[i].hour[3].condition.icon}" alt="">
<h5 class="text-danger"><span class="text-info">Prognoza:</span> ${data.forecast.forecastday[i].hour[3].condition.text}</h5>
<h5 class="text-danger"><span class="text-info">Temperat.:</span> ${data.forecast.forecastday[i].hour[3].temp_c} °C</h5>
<h5 class="text-danger"><span class="text-info">Kiša: </span>${data.forecast.forecastday[i].hour[3].chance_of_rain} %</h5>
<h5 class="text-danger"><span class="text-info">Snijeg:</span> ${data.forecast.forecastday[i].hour[3].chance_of_snow} %</h5>
</div>
 
<div class="col-2  card shadow-lg p-3 mb-5 bg-light   border border-5 border-info">
<label class=" form-control bg-warning fw-bold text-center">07:00</label>
<img src="${data.forecast.forecastday[i].hour[6].condition.icon}" alt="">
<h5 class="text-danger"><span class="text-info">Prognoza:</span> ${data.forecast.forecastday[i].hour[6].condition.text}</h5>
<h5 class="text-danger"><span class="text-info">Temperat.:</span> ${data.forecast.forecastday[i].hour[6].temp_c} °C</h5>
<h5 class="text-danger"><span class="text-info">Kiša: </span>${data.forecast.forecastday[i].hour[6].chance_of_rain} %</h5>
<h5 class="text-danger"><span class="text-info">Snijeg:</span> ${data.forecast.forecastday[i].hour[6].chance_of_snow} %</h5>

</div>

<div class="col-2 shadow-lg p-3 mb-5 bg-light border border-5 border-info  card">
<label class=" form-control bg-warning fw-bold text-center">11:00</label>
<img src="${data.forecast.forecastday[i].hour[10].condition.icon}" alt="">
<h5 class="text-danger"><span class="text-info">Prognoza:</span> ${data.forecast.forecastday[i].hour[10].condition.text}</h5>
<h5 class="text-danger"><span class="text-info">Temperat.:</span> ${data.forecast.forecastday[i].hour[10].temp_c} °C</h5>
<h5 class="text-danger"><span class="text-info">Kiša: </span>${data.forecast.forecastday[i].hour[10].chance_of_rain} %</h5>
<h5 class="text-danger"><span class="text-info">Snijeg:</span> ${data.forecast.forecastday[i].hour[10].chance_of_snow} %</h5>
</div>

<div class="col-2 shadow-lg p-3 mb-5 bg-light border border-5 border-info  card">
<label class=" form-control bg-warning fw-bold text-center">15:00</label>
<img src="${data.forecast.forecastday[i].hour[14].condition.icon}" alt="">
<h5 class="text-danger"><span class="text-info">Prognoza:</span> ${data.forecast.forecastday[i].hour[14].condition.text}</h5>
<h5 class="text-danger"><span class="text-info">Temperat.:</span> ${data.forecast.forecastday[i].hour[14].temp_c} °C</h5>
<h5 class="text-danger"><span class="text-info">Kiša: </span>${data.forecast.forecastday[i].hour[14].chance_of_rain} %</h5>
<h5 class="text-danger"><span class="text-info">Snijeg:</span> ${data.forecast.forecastday[i].hour[14].chance_of_snow} %</h5>
</div>

<div class="col-2 shadow-lg p-3 mb-5 bg-light border border-5 border-info  card">
<label class=" form-control bg-warning fw-bold text-center">19:00</label>
<img src="${data.forecast.forecastday[i].hour[18].condition.icon}" alt="">
<h5 class="text-danger"><span class="text-info">Prognoza:</span> ${data.forecast.forecastday[i].hour[18].condition.text}</h5>
<h5 class="text-danger"><span class="text-info">Temperat.:</span> ${data.forecast.forecastday[i].hour[18].temp_c} °C</h5>
<h5 class="text-danger"><span class="text-info">Kiša: </span>${data.forecast.forecastday[i].hour[18].chance_of_rain} %</h5>
<h5 class="text-danger"><span class="text-info">Snijeg:</span> ${data.forecast.forecastday[i].hour[18].chance_of_snow} %</h5>
</div>

<div class="col-2 shadow p-3 mb-5 bg-body border border-5 border-info  card">
<label class=" form-control bg-warning fw-bold text-center">23:00</label>
<img src="${data.forecast.forecastday[i].hour[22].condition.icon}" alt="">
<h5 class="text-danger"><span class="text-info">Prognoza:</span> ${data.forecast.forecastday[i].hour[22].condition.text}</h5>
<h5 class="text-danger"><span class="text-info">Temperat.:</span> ${data.forecast.forecastday[i].hour[22].temp_c} °C</h5>
<h5 class="text-danger"><span class="text-info">Kiša: </span>${data.forecast.forecastday[i].hour[22].chance_of_rain} %</h5>
<h5 class="text-danger"><span class="text-info">Snijeg:</span> ${data.forecast.forecastday[i].hour[22].chance_of_snow} %</h5>
</div>
<div class="col-1">

</div>
</div>
<br>
    `;
    prognozaContainer.insertAdjacentHTML('beforeend', el);
  });
}
//Auto populate option number of days
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

//Search sugestions

let suggestions = [];
async function fetchData() {
  await fetch(`/world-cities.json`)
    .then(res => res.json())
    .then(data => {
      suggestions.push(...data);
    });
}
fetchData();
// Retrieve the input and results elements
const input = document.getElementById('autocomplete-input');
const resultsContainer = document.getElementById('autocomplete-results');

// Event listener for input changes
inpGrad.addEventListener('input', function () {
  const inputValue = this.value.toLowerCase();
  const filteredSuggestions = suggestions.filter(function (suggestion) {
    return suggestion.name.toLowerCase().startsWith(inputValue);
  });

  // Clear previous results
  resultsContainer.innerHTML = '';

  // Display filtered suggestions
  filteredSuggestions.forEach(function (suggestion) {
    const item = document.createElement('div');
    item.textContent = suggestion.name;
    item.classList.add('autocomplete-item');
    item.addEventListener('click', function () {
      inpGrad.value = suggestion.name;
      resultsContainer.innerHTML = '';
    });
    resultsContainer.appendChild(item);
  });
});

//Current position

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};


function success(pos) {
  const crd = pos.coords;

  const cordsa = [crd.latitude, crd.longitude];

  currentWeather([cordsa[0], cordsa[1]]);
  forecastWeather([cordsa[0], cordsa[1]], 3);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);


//forecastWeather('Banja Luka',2)



