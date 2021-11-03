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

  const resultFinal = document.querySelector('.game-result');
  resultFinal.classList.add('d-none');
  resultFinal.innerHTML = '';

  // Variabile che stabilisce se il gioco è finito
  let isGiocoFinito = false;
  let textResult = '';

  let cellsNumber;
  let bombsNumber;
  let levelString;
  let click = 0;


  if (leavelDifficulty.value === '1') {
    // console.log('easy');
    cellsNumber = 100;
    bombsNumber = 16;
    levelString = 'easy';
  } else if (leavelDifficulty.value === '2') {
    // console.log('hard');
    cellsNumber = 81;
    bombsNumber = 16;
    levelString = 'hard';
  } else if (leavelDifficulty.value === '3') {
    // console.log('crazy');
    cellsNumber = 49;
    bombsNumber = 1;
    levelString = 'crazy';
  } else {
    title.classList.remove('d-none');
    gameContainer.classList.add('d-none');
  }

  howManySquare(gameContainer,`square ${levelString}`, cellsNumber);
  let bombs = generateBombs (bombsNumber, 1, cellsNumber);



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
   * Funzione che genera un numero massimo di quadrati con una classe 
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


  // Funzione che gestisce il click del quadrato
  function clickSquare (event) {

    if (isGiocoFinito === false) {

      this.classList.add('clicked');

      const numberClick = parseInt(event.target.innerText);
      console.log ('numero cliccato', numberClick);
      console.log('arrey bombe', bombs);
      console.log(this);

      if (bombs.indexOf(numberClick) !== -1) {
        this.classList.add('bomb');
        console.log('Hai perso!');
        isGiocoFinito = true;
        textResult = `
        <p>
          HAI TROVATO LA BOMBA, <br>
          IL PUNTEGGIO OTTENUTO E' <span>${click}</span>.
        </p>
        `;
        endGame();
      } else if (click < (cellsNumber - bombsNumber)) {
        console.log('Continua');
        click++;
      } else {
        isGiocoFinito = true;
        textResult = `
        <p>
          HAI COMPLETATO IL GIOCO, <br>
          IL PUNTEGGIO OTTENUTO E' <span>${click}</span>.
        </p>
        `;
        console.log('complimenti hai vinto');
        endGame();
      }
      console.log('qunati click',click);
    } else {
      // endGame();
      console.log('inutile che fai click, il gioco è finito');
    }
     
  }

  function endGame() {
    resultFinal.classList.remove('d-none');
    resultFinal.innerHTML = textResult;
    

  }

  /**
   * Funzione che genera un numero random di bombe
   * @param {number} bombNumber 
   * @param {number} min 
   * @param {number} max 
   * @returns Un Array con i numeri generati 
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
  };

  /**
   * Funziona che genera un numero random to, from
   * @param {number} min 
   * @param {number} max 
   * @returns Numero randrom
   */
  function generateRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

};







