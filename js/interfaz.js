function intercambiarReproducción() {
    mapa_complejidad = [];
    reproducir = !reproducir;
    if (reproducir) {
        document.body.style.background = "white";
        document.getElementById("btn1").innerHTML = `<i class="fas fa-pause"></i>`;
    } else {
        document.body.style.background = "#f0f0ff";
        document.getElementById("btn1").innerHTML = `<i class="fas fa-play"></i>`;
    }
}

function centrar() {
    window.scrollTo(
        (lado * columnas - window.innerWidth) / 2,
        (lado * filas - window.innerHeight) / 2
    );
}

function minus() {
    lado--;
    if (lado <= 7) {
        lado = 7;
        return;
    }
    let tablero = document.getElementById("tablero");
    tablero.style.width = lado * columnas + "px";
    tablero.style.height = lado * filas + "px";
}

function plus() {
    lado++;
    let tablero = document.getElementById("tablero");
    tablero.style.width = lado * columnas + "px";
    tablero.style.height = lado * filas + "px";
}

function randomizar() {
    mapa_complejidad = [];
    for (let x = 0; x < columnas; x++) {
        for (let y = 0; y < filas; y++) {
            if (Math.random() < 0.2) {
                cambiarEstado(x, y);
            }
        }
    }
}

function limpiar() {
    mapa_complejidad = [];
    for (let x = 0; x < columnas; x++) {
        for (let y = 0; y < filas; y++) {
            let celula = document.getElementById(`celula-${x + "-" + y}`);
            celula.style.background = "";
        }
    }
    if (reproducir) {
        intercambiarReproducción();
    }
}

// Manejo de eventos de teclado
document.addEventListener("keydown", (e) => {
    e.preventDefault(); //Para evitar el movimiento del scroll
    switch (e.keyCode) {
        case 39:
            siguienteEstado();
            break;
        case 32:
            intercambiarReproducción();
            break;
        case 8:
            limpiar();
            break;
        default:
            break;
    }
});