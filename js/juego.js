function fotografiar() {
    p_mapa_complejidad = JSON.parse(JSON.stringify(mapa_complejidad));
    mapa_complejidad = [];
    mapa_verificados = [];
    fotografia = [];
    if (!p_mapa_complejidad.length) {
        primeraFoto();
    } else {
        demasFotos();
    }
}

function demasFotos() {
    for (let x in p_mapa_complejidad) {
        for (let y in p_mapa_complejidad[x]) {
            try {
                let celula = document.getElementById(`celula-${x + "-" + y}`);
                if (!fotografia[x]) {
                    fotografia[x] = [];
                    mapa_verificados[x] = [];
                }
                fotografia[x][y] = celula.style.background == "black";
                calcularMapaComplejidad(Number(x), Number(y));
            } catch (e) { }
        }
    }
    p_mapa_complejidad = [];
}

function primeraFoto() {
    for (let x = 0; x < columnas; x++) {
        fotografia.push([]);
        mapa_verificados.push([]);
        for (let y = 0; y < filas; y++) {
            let celula = document.getElementById(`celula-${x + "-" + y}`);
            fotografia[x][y] = celula.style.background == "black";
            calcularMapaComplejidad(x, y);
        }
    }
}

function calcularMapaComplejidad(x, y) {
    if (fotografia[x][y]) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (!mapa_complejidad[x + i]) {
                    mapa_complejidad[x + i] = [];
                }
                mapa_complejidad[x + i][y + j] = true;
            }
        }
    }
}

function contarVivas(x, y) {
    let vivas = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            try {
                if (fotografia[x + i][y + j]) {
                    vivas++;
                }
            } catch (e) { }
            if (vivas > 3) {
                return vivas;
            }
        }
    }
    return vivas;
}

function siguienteEstado() {
    fotografiar();
    for (const x in mapa_complejidad) {
        for (const y in mapa_complejidad[x]) {
            try {
                if (mapa_verificados[x][y]) {
                    continue;
                }
                mapa_verificados[x][y] = true;

                let vivas = contarVivas(Number(x), Number(y));
                let celula = document.getElementById(`celula-${x + "-" + y}`);
                if (fotografia[x][y]) { //celula está viva
                    if (vivas < 2 || vivas > 3) {
                        celula.style.background = ""; // Muere por sobrepoblación o soledad
                    }
                } else { //celula está muerta
                    if (vivas == 3)
                        celula.style.background = "black";
                }
            } catch (e) { }
        }
    }
}