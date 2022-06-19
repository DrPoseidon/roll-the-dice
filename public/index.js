const ws = new WebSocket(`ws://${window.location.host}`);

const divValue1 = document.querySelector('.value1');
const divValue2 = document.querySelector('.value2');
const helloDiv = document.querySelector('.hello');
const images = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six'
]

  ws.onopen = () => {
  console.log('ONLINE');
};

ws.onclose = () => {
  console.log('DISCONNECTED');
};

ws.onmessage = response => {
  const json = JSON.parse(response.data);

  helloDiv.style.display = 'none';

  divValue1.src = `./public/images/${images[json[0] - 1]}.png`;
  divValue2.src = `./public/images/${images[json[1] - 1]}.png`;
};

const rollTheDice = () => {
  const json = {
    0: getRandomArbitrary(),
    1: getRandomArbitrary()
  };

  helloDiv.style.display = 'none';

  ws.send(JSON.stringify(json));
};

const getRandomArbitrary = (min = 1, max = 6) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};