// Variables
let numeroMaximoPosible = 30;
let numeroSecreto = Math.floor(Math.random() * numeroMaximoPosible) + 1;
let intentos = 1;
let maximosIntentos = 6;

// Selección de elementos del DOM
const userInput = document.getElementById("userInput");
const guessButton = document.getElementById("guessButton");
const message = document.getElementById("message");
const attempts = document.getElementById("attempts");
const selectedNumbers = document.getElementById("selectedNumbers");
const victoryContainer = document.getElementById("victoryContainer");

// Función para reiniciar el juego
const reiniciarJuego = () => {
    numeroSecreto = Math.floor(Math.random() * numeroMaximoPosible) + 1;
    intentos = 1;
    message.textContent = "Ingresa un número entre 1 y 30.";
    message.style.color = "#333";
    attempts.textContent = "";
    selectedNumbers.innerHTML = "";
    userInput.value = "";
    userInput.disabled = false;
    guessButton.disabled = false;
    victoryContainer.classList.add("hidden"); // Ocultar contenedor de victoria
    userInput.focus();
};

// Función para manejar el intento del usuario
const manejarAdivinanza = () => {
    let numeroUsuario = parseInt(userInput.value);

    // Validar entrada
    if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > numeroMaximoPosible) {
        message.textContent = `Por favor, ingresa un número válido entre 1 y ${numeroMaximoPosible}.`;
        userInput.value = "";
        return;
    }

    // Añadir número a la lista de seleccionados
    const numeroElemento = document.createElement("li");
    numeroElemento.textContent = numeroUsuario;
    selectedNumbers.appendChild(numeroElemento);

    // Comparar con el número secreto
    if (numeroUsuario === numeroSecreto) {
        message.textContent = `¡Correcto! El número secreto era ${numeroSecreto}. Lo lograste en ${intentos} intento${intentos > 1 ? 's' : ''}.`;
        message.style.color = "green";
        userInput.disabled = true;
        guessButton.disabled = true;

        // Mostrar contenedor de victoria
        victoryContainer.classList.remove("hidden");

        // Reiniciar el juego después de 5 segundos
        setTimeout(reiniciarJuego, 5000);
    } else {
        message.textContent = numeroUsuario > numeroSecreto ? "El número secreto es menor." : "El número secreto es mayor.";
        message.style.color = "red";
        intentos++;
        attempts.textContent = `Intentos: ${intentos}/${maximosIntentos}`;
        userInput.value = "";
    }

    // Revisar si alcanzó el límite de intentos
    if (intentos > maximosIntentos) {
        message.textContent = `¡Has alcanzado el máximo de intentos! El número secreto era ${numeroSecreto}.`;
        userInput.disabled = true;
        guessButton.disabled = true;

        // Reiniciar el juego después de 5 segundos
        setTimeout(reiniciarJuego, 5000);
    }
};

// Eventos
guessButton.addEventListener("click", manejarAdivinanza);
userInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        manejarAdivinanza();
    }
});
