const btnPlayGame = document.querySelector('.btn-grad');

// Start game al click del bottone
btnPlayGame.addEventListener('click',function() {
  // console.log('clicco sul bottone');
  playGame();
});


// Funzione che contiene l'intero gioco
function playGame () {

  let leavelDifficulty = document.getElementById('form-select');

  const title = document.querySelector('main > span');
  title.classList.add('d-none');

  const gameContainer = document.querySelector('.game-container');
  gameContainer.classList.remove('d-none');
  gameContainer.innerHTML = '';

  let bombs = generateBombs (16, 1, 49);


  if (leavelDifficulty.value === '1') {
    console.log('easy');
    howManySquare(gameContainer,'square easy', 100);
    let bombs = generateBombs (16, 1, 100);
    console.log('easy bombe', bombs);
  } else if (leavelDifficulty.value === '2') {
    console.log('hard');
    howManySquare(gameContainer,'square hard', 81);
    let bombs = generateBombs (20, 1, 81);
    console.log('hard bombe', bombs);
  } else if (leavelDifficulty.value === '3') {
    console.log('crazy');
    howManySquare(gameContainer,'square crazy', 49);
    let bombs = generateBombs (25, 1, 49);
    console.log('crazy bombe', bombs);
  } else {
    title.classList.remove('d-none');
    gameContainer.classList.add('d-none');
  }

  


  /**
   * Funzione che crea un quadrato con una classe e lo inserisce nell'elemento HTML scelto
   * @param {div} elementInHtml 
   * @param {string} className 
   * @returns Elemento creato
   */
  function createSquare(elementInHtml, className) {
    const square = document.createElement('div');
    square.className = className;
    elementInHtml.append(square);
    return square;
  };

  /**
   * Funzione che genera un numero max di quadrati 
   * @param {div} elementInHtml 
   * @param {string} className 
   * @param {number} max 
   */
  function howManySquare (elementInHtml, className, max) {
    for (let i = 0; i < max; i++) {
      square = createSquare(elementInHtml, className);
      square.innerHTML += [i+1];

      square.addEventListener('click',clickSquare);

    };
  };


  function clickSquare (event) {
    this.classList.toggle('clicked');

    const numberClick = parseInt(event.target.innerText);
    console.log ('numero cliccato', numberClick);
    console.log('arrey bombe', bombs);
    console.log(this);

    if (bombs.indexOf(numberClick) !== -1) {
      this.classList.add('bomb');
      console.log(this);
      console.log('end',this);
    } 
  };

  /**
   * Funzione che genera un numero random di bombe
   * @param {number} bombNumber 
   * @param {number} min 
   * @param {number} max 
   * @returns 
   */
  function generateBombs (bombNumber, min, max) {
    const bombs = [];

    while (bombs.length < bombNumber) {
      const n = generateRandomNumber(min, max)
      if (bombs.indexOf(n)) {
        bombs.push(n);
      }
    }
    return bombs;
  }

  function generateRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}







