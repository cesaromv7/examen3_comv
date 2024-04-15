// Generamos un número aleatorio entre 1 y 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

// Obtenemos referencias a los elementos del DOM
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

// Obtenemos referencias a los elementos del formulario y al botón
const guessField = document.querySelector('.guessField');
const guessSubmit = document.querySelector('.guessSubmit');

// Inicializamos las variables de conteo y reiniciamos el juego
let guessCount = 1;
let resetButton;

// Función para comparar el intento del usuario con el número generado
function checkGuess() {
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Intentos anteriores: ';
  }
  guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = '¡Felicidades! ¡Lo has adivinado!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = '¡Fin del juego!';
    setGameOver();
  } else {
    lastResult.textContent = '¡Incorrecto!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = '¡El número es muy bajo!';
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = '¡El número es muy alto!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}

// Asociamos la función checkGuess con el evento de enviar el formulario
guessSubmit.addEventListener('click', checkGuess);

// Función para finalizar el juego y ofrecer la opción de reiniciar
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Iniciar nuevo juego';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

// Función para reiniciar el juego
function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = '';
  }
  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();
  lastResult.style.backgroundColor = 'white';
  randomNumber = Math.floor(Math.random() * 100) + 1;
}
