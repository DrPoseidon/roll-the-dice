const port = window.location.host;

const ws = new WebSocket(`ws://${port}`);

const divValue1 = document.querySelector('.value1');
const divValue2 = document.querySelector('.value2');
const helloDiv = document.querySelector('.hello');
const rollBtn = document.querySelector('.roll-btn');
const dicesDiv = document.querySelector('.dices');

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
  setSrc(json[0], json[1]);
};

const rollTheDice = () => {
  rollBtn.setAttribute('disabled', '');
  rollBtn.classList.add('disabled');
  dicesDiv.style.display = 'flex';

  let json = {};
  helloDiv.style.display = 'none';

  let timerId = setInterval(() => {
    json = {
      0: getRandomArbitrary(),
      1: getRandomArbitrary()
    };

    ws.send(JSON.stringify(json));
  }, 250);


  setTimeout(() => {
    clearInterval(timerId);
    rollBtn.removeAttribute('disabled');
    rollBtn.classList.remove('disabled');
  }, 2500);
};

const getRandomArbitrary = (min = 1, max = 6) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const setSrc = (first, second) => {
  divValue1.src = `./public/images/${images[first - 1]}.png`;
  divValue2.src = `./public/images/${images[second - 1]}.png`;
};