console.log('matando la liga ')

const URL ='https://api.thecatapi.com/v1/images/search';

fetch(URL)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));