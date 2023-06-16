
function success(pos){
  const lat = pos.coords.latitude;   //緯度を取得して定数latに代入
  const lon = pos.coords.longitude;  //経度を取得して定数lonに代入

  const key = '601fe0278b2b16f811a9184a1be872d5';
  const lang = 'ja';
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    // console.log(data);
    drawWeather(data);
  })
  .catch(function() {
    // catch any errors
  });
}


function fail(error){
  window.alert('位置情報の取得に失敗しました。エラーコード：' + error.code)
}

//成功した時にsuccess function　失敗した時にfail functionを呼び出す
navigator.geolocation.getCurrentPosition(success,fail);


// function weatherBalloon(lat, lon) {
//   const key = '601fe0278b2b16f811a9184a1be872d5';
//   const lang = 'ja';
//   fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + key)  
//   .then(function(resp) { return resp.json() }) // Convert data to json
//   .then(function(data) {
//     // console.log(data);
//     drawWeather(data);
//   })
//   .catch(function() {
//     // catch any errors
//   });
// }

function threeWeather() {
  const key = '601fe0278b2b16f811a9184a1be872d5';
  const lang = 'ja';
  fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + key + '&lang=' + lang)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
}

window.onload = function() {
  threeWeather();
}


function drawWeather( d ) {
	const celcius = Math.round(parseFloat(d.main.temp)-273.15);
	const fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
  const description = d.weather[0].description;
  const iconID = d.weather[0].icon;
	
	// document.getElementById('description').innerHTML = d.weather[0].description;
	document.getElementById('temp').innerHTML = celcius + '&deg;';
	document.getElementById('location').innerHTML = d.name;
  document.getElementById('temp-icon').src = 'https://openweathermap.org/img/wn/'+ iconID + '@2x.png';

  if( description.indexOf('rain') > 0 ) {
    currentWeather.classList.add('rainy');
  } else if( description.indexOf('cloud') > 0 ) {
    currentWeather.classList.add('cloud');
  } else if( description.indexOf('sunny') > 0 ) {
    currentWeather.classList.add('sunny');
  } else if( description.indexOf('snow') > 0 ) {
    currentWeather.classList.add('snow');
  }
}


//毎秒更新させてる時間
function timeClock() {
  const timeTarget = document.getElementById('time');
  // const dateTarget = document.querySelector(".js-date");

  let weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const now = new Date();

  const year =  now.getFullYear();
  const month =  now.getMonth() + 1;
  const date =  now.getDate();
  const iWeek =  now.getDay();

  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  if( hour < 10 ) {
    hour = '0' + hour;
  }
  if( minute < 10 ) {
    minute = '0' + minute;
  }
  if (second < 10 ) {
    second = '0' + second;
  }

  timeTarget.innerHTML = hour + ":" + minute;
  // dateTarget.innerHTML = weeks[iWeek] + "." + date + "." + month + "." + year;
}
window.addEventListener('load', timeClock)
setInterval(timeClock, 1000);



//ランダムな壁紙

function randomWall() {
  const min = 1 ;
  const max = 4 ;
  const a = Math.floor( Math.random() * (max + 1 - min) ) + min ;

  const windowBG = document.querySelector('.js-random-wall')
  windowBG.style.backgroundImage = 'url(/assets/img/bg-img' + a + '.jpg)';

  console.log(windowBG)
  console.log(a)
}

window.addEventListener('load', randomWall);

