renderRandomStone();
renderRandomImage();
const stones = document.querySelectorAll('.audio-stone');
const placeholders = document.querySelectorAll('.placeholder');
const rhythms = document.querySelectorAll('.rhythm');
const stone1 = document.querySelector('.stone-1');
const stone2 = document.querySelector('.stone-2');
const stone3 = document.querySelector('.stone-3');
const stone4 = document.querySelector('.stone-4');
const stone5 = document.querySelector('.stone-5');
const stone6 = document.querySelector('.stone-6');
const audio1 = document.querySelector('.play-0');
const audio2 = document.querySelector('.play-1');
const audio3 = document.querySelector('.play-2');
const audio4 = document.querySelector('.play-3');
const audio5 = document.querySelector('.play-4');
const audio6 = document.querySelector('.play-5');
const btnCheck = document.querySelector('.check-btn');
const btnReset = document.querySelector('.reset-btn');

const background = document.querySelector('.background');
const clue = document.querySelector('.clue');
const error = document.querySelector('.error');
const failure = document.querySelector('.failure');
const hello = document.querySelector('.hello');
const stone = document.querySelector('.stone');
const stone_fell = document.querySelector('.stone_fell');
const victory = document.querySelector('.victory');
const playGame = document.querySelector('.dwarf__play-game');

playGame.addEventListener('click', function (e) {
  hello.play();
  background.play();
  playGame.style.display = 'none';
});

stones.forEach((item) => {
  item.addEventListener('dragend', dragend);
  item.addEventListener('dragstart', dragstart);
});

function dragstart(evt) {
  evt.target.classList.add('dragging');
  setTimeout(() => evt.target.classList.add('hidden'));
  stone_fell.play();
}

function dragend(evt) {
  evt.target.classList.remove('dragging', 'hidden');
  evt.target.style.backgroundColor = 'transparent';
}

placeholders.forEach((item, i) => {
  item.addEventListener('dragover', dragover);
  item.addEventListener('dragenter', dragenter);
  item.addEventListener('dragleave', dragleave);
  item.addEventListener('drop', (evt) => {
    if (item.children.length === 0) {
      item.append(document.querySelector('.dragging'));
      stone_fell.pause();
      stone_fell.currentTime = 0.0;
      stone.play();
    }
    evt.target.classList.remove('hovered');
    evt.target.style.border = 'none';
    const { finish, right } = checkGame();
    if (finish) {
      btnCheck.disabled = false;
      btnCheck.classList.remove('disabled');
      btnCheck.addEventListener('click', function () {
        if (right) {
          victory.play();

          setTimeout(function () {
            clue.play();
          }, 3000);

          document.querySelector('.dwarf__text').textContent =
            'Молодец! Твой ключ - буква П. Сохрани его, воспользуешься им позднее.';
          setTimeout(function () {
            document.querySelector('.dwarf__clue').classList.remove('hidden');
          }, 2000);
          // document.body.innerHTML = '<h1>Молодец. Ту-ру-ту-ту!!!</h1>';
          // document.body.style.background = 'green';
        } else {
          failure.play();
          error.play();
          document.querySelector('.dwarf__text').textContent =
            'Послушай внимательнее еще разок, где-то ты ошибся...';
          // document.body.innerHTML =
          //   '<h1>Лопух. Выгоняем тебя из музыкалки!!!</h1>';
          // document.body.style.background = 'red';
        }
      });
    }
  });
});

function checkGame() {
  let finish = true; //игра закончена
  let right = true; //верный ответ

  rhythms.forEach((item, i) => {
    const stone = placeholders[i].querySelector('.audio-stone')?.dataset?.stone; //атрибуты вставки

    const image = item.dataset.image; //атрибуты картинок
    if (!stone) {
      finish = false;
    } else if (stone !== image) {
      //если не верно вставлено
      right = false;
    }
  });
  return { finish, right };
}

function dragover(evt) {
  evt.preventDefault();
}

function dragenter(evt) {
  evt.target.classList.add('hovered');
}

function dragleave(evt) {
  evt.target.classList.remove('hovered');
}

btnReset.addEventListener('click', function () {
  window.location.reload();
});

function renderRandomStone() {
  const stones = ['1', '2', '3', '4', '5', '6'];
  const randonStone = stones
    .map((stone, i) => ({ [i + 1]: stone }))
    .sort(() => Math.random() - 0.5)
    .map(
      (stone) => `
    <div data-stone="${Object.keys(
      stone
    )}" class="audio-stone" draggable="true"><button type="button"
                        class="audio-stone__btn stone-${Object.values(
                          stone
                        )}"></button></div>`
    )
    .join('\n');

  document
    .querySelector('.audio-stones')
    .insertAdjacentHTML('afterbegin', randonStone);
}

//рандом

// создайте массив целых чисел нужной вам длины.
// Заполните массив числами в порядке возрастания и убывания (начальное число и шаг прогрессии выбирите какие угодно).
// Перемешайте массив случайным образом. Для получения случайных чисел просто последовательно перебирайте массив.

function stopSoundBackground() {
  background.pause();
  background.currentTime = 0.0;
  hello.pause();
  hello.currentTime = 0.0;
}

stone1.addEventListener('click', function () {
  stopSoundBackground();
  audio1.play();
});

stone2.addEventListener('click', function () {
  stopSoundBackground();
  audio2.play();
});

stone3.addEventListener('click', function () {
  audio3.play();
});

stone4.addEventListener('click', function () {
  stopSoundBackground();
  audio4.play();
});

stone5.addEventListener('click', function () {
  stopSoundBackground();
  audio5.play();
});

stone6.addEventListener('click', function () {
  stopSoundBackground();
  audio6.play();
});

function renderRandomImage() {
  const images = ['1', '2', '3', '4', '5', '6'];
  const randomImage = images
    .map((image, i) => ({ [i + 1]: image }))
    .sort(() => Math.random() - 0.5)
    .map(
      (image) => `
      <div data-image="${Object.keys(image)}" class="rhythm"></div>
  `
    )
    .join('\n');

  console.log(randomImage);
  document
    .querySelector('.rhythms')
    .insertAdjacentHTML('afterbegin', randomImage);
}
