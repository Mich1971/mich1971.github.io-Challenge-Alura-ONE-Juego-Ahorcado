const correcto = document.querySelector("#correcto");
const incorrecto = document.querySelector("#incorrecto");
const nuevaPalabra = document.querySelector("#nuevaPalabra");
let palabras = ["ALURA"];
let secreto = "";
let ltrCorrecta = [];
let ltrIncorrecta = [];

function finalJuego(ganaste) {
    document.removeEventListener("keypress", logKey);
    if (ganaste) {
        limpiarTablero();
        dibujarHombre(150, 50, "green", 9);
    }
}
function dibujarPalabra() {
    var $elem = correcto;
    let conteo = 0;
    $elem.innerHTML = "";
    for (let ltr of secreto) {
        let $span = document.createElement("span");
        let $txt = document.createTextNode("");
        if (ltrCorrecta.indexOf(ltr) >= 0) {
            $txt.nodeValue = ltr;
            conteo++;
        }
        $span.setAttribute("class", "letra correcta");
        $span.appendChild($txt);
        $elem.appendChild($span);
    }
    if (conteo == secreto.length) {
        finalJuego(true);
    }
}
function dibujarLetras() {
    var $elem = incorrecto;
    let conteo = 9;
    $elem.innerHTML = "";
    for (let ltr of ltrIncorrecta) {
        let $span = document.createElement("span");
        let $txt = document.createTextNode(ltr);
        $span.setAttribute("class", "letra incorrecta");
        $span.appendChild($txt);
        $elem.appendChild($span);
        conteo--;
        if (conteo > 5) {
            dibujarPoste(88, conteo);
        } else {
            dibujarHombre(88+110, 37, "red", conteo);
        }
    }
    if (conteo == 0) {
        finalJuego(false);
    }
}
function buscar(letra) {
    if (secreto.includes(letra)) {
        if (ltrCorrecta.indexOf(letra) < 0) {
            ltrCorrecta.push(letra);
            dibujarPalabra();
        }
    } else {
        if (ltrIncorrecta.indexOf(letra) < 0) {
            ltrIncorrecta.push(letra);
            dibujarLetras();
        }
    }
}
function logKey(tecla) {
    var caracter = tecla.key.toUpperCase();
    if ((caracter != caracter.toLowerCase()) && (caracter.length == 1)) {
        buscar(caracter);
    }
}
function palabraSecreta() {
    let alea = Math.round((palabras.length - 1) * Math.random());
    return palabras[alea];
}
function juego() {
    ltrCorrecta = [];
    ltrIncorrecta = [];
    secreto = palabraSecreta();
    limpiarTablero();
    dibujarPalabra();
    incorrecto.innerHTML = "";
    document.addEventListener("keypress", logKey);
}
function mostrar(elementoID) {
    document.getElementById(elementoID).style.display = "block";
}
function ocultar(elementoID) {
    document.getElementById(elementoID).style.display = "none";
}
function prepPalabra() {
    const noPermitido = /[^A-ZÑ]/g;
    let texto = nuevaPalabra.value.trim().toUpperCase();
    noPermitido.lastIndex = 0;
    if (noPermitido.test(texto)) {
        //Separa y elimina los acentos diacriticos del string (excepto "ñ")
        texto = texto.normalize("NFD").replace(/[\u0300-\u0302,\u0304-\u036f]/g, "");
        texto = texto.normalize().replace(noPermitido, "");
    }
    return texto;
}
function inputVerificar() {
    nuevaPalabra.addEventListener("keypress", function (tecla) {
        var caracter = tecla.key.toUpperCase();
        if (!((caracter != caracter.toLowerCase()) && (caracter.length == 1))) {
            tecla.preventDefault();
        }
    });
}

// Seccion de funciones activadas por "onClick" en los botones.
function iniciar() {
    ocultar("div-agregar");
    ocultar("home-button");
    mostrar("div-juego");
    setTimeout(function(){ alert("Ingrese las letras vía el teclado."); }, 500);
    juego();
}
function nuevo() {
    document.getElementById("bot-nuevo").blur();
    juego();
}
function desistir() {
    secreto = "";
    ocultar("div-juego");
    mostrar("home-button");
}
function agregar() {
    mostrar("div-agregar");
    nuevaPalabra.value= "";
    nuevaPalabra.focus();
    inputVerificar();
}
function newWord() {
    let palabra = prepPalabra();
    let cantLetras = palabra.length;
    if (cantLetras < 1 || cantLetras > 10) {
        alert("¡La palabra ingresada no es válida!");
    } else {
        if (palabras.indexOf(palabra) < 0) {
            palabras.push(palabra);
            alert("La palabra " + palabra + " fue agregada!");
            nuevaPalabra.value= "";
            nuevaPalabra.focus();
        } else {
            alert("La palabra " + palabra + " ya existe!");
        }
        console.log(palabras);
    }
}
function revelar() {
    if (secreto != "") {
        alert("La palabra secreta es " + secreto + ".");
    } else {
        alert("Muestra la palabra secreta cuando se inicia el juego.");
    }
}