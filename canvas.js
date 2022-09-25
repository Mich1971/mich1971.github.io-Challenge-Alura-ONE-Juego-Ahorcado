let tablero = document.getElementById("miCanvas");
let pincel = tablero.getContext("2d");

function limpiarTablero() {
    pincel.clearRect(0,0,300,150);
    dibujarPoste(88, 9);
}
function dibujarPoste(x, estado) {
    pincel.lineWidth= 4;
    pincel.lineCap= "round";
    pincel.lineJoin= "round";
    pincel.fillStyle= "#F3F5FC";
    pincel.strokeStyle= "#0A3871";

    if (estado == 9) {
        pincel.fillRect(0, 0, 300, 150);
        pincel.beginPath();
        pincel.moveTo(x, 148);
        pincel.lineTo(x+125, 148);
    } else {
        pincel.beginPath();
        if (estado == 8) {
            pincel.moveTo(x+35, 148);
            pincel.lineTo(x+35, 2);
        }
        if (estado == 7) {
            pincel.moveTo(x+35, 2);
            pincel.lineTo(x+110, 2);
        }
        if (estado == 6) {
            pincel.moveTo(x+110, 2);
            pincel.lineTo(x+110, 22);
        }
    }
    pincel.stroke();
    pincel.closePath();
}
function dibujarHombre(x, y, color, estado) {
    pincel.lineWidth= 2;
    pincel.lineCap= "round";
    pincel.lineJoin= "round";
    pincel.strokeStyle= color;

    pincel.beginPath();
    if (estado == 9) {
        pincel.moveTo(x-30, y+15);
        pincel.lineTo(x+17, y+15);
        pincel.font= "15px Inter";
        pincel.fillStyle= color;
        pincel.fillText("¡Ganaste, Felicidades!", x-75, y-25);
    }
    if (estado == 5 || estado == 9) {
        pincel.arc(x,y,13,0,2*Math.PI);
    }
    if (estado == 4 || estado == 9) {
        pincel.moveTo(x, y+13);
        pincel.lineTo(x, y+70);
    }
    if (estado == 3 || estado == 9) {
        pincel.moveTo(x, y+70);
        pincel.lineTo(x-15, y+95);
    }
    if (estado == 2 || estado == 9) {
        pincel.moveTo(x, y+70);
        pincel.lineTo(x+15, y+95);
    }
    if (estado == 1) {
        pincel.moveTo(x, y+15);
        pincel.lineTo(x-15, y+40);
    }
    if (estado == 0) {
        pincel.moveTo(x, y+15);
        pincel.lineTo(x+15, y+40);
        pincel.font= "15px Inter";
        pincel.fillStyle= color;
        pincel.fillText("¡Fin del Juego!", x-190, y+30);
    }
    pincel.stroke();
    pincel.closePath();
}