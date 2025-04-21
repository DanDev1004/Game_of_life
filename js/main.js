// Iniciar el tablero al cargar
generarTablero();

// Bucle principal del juego
setInterval(() => {
    if (reproducir) {
        siguienteEstado();
    }
}, 1000 / 60);