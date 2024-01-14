/**
 * Todas las casillas tienen la clase .casilla
 * 
 */

/**
 * Almacenamos todas las casillas, es decir, todos los divs que tienen clase 'casilla'
 * En total tenemos 9 casillas que van desde la 0 hasta la 8
 */
let casillas = document.getElementsByClassName("casilla");
let main = document.getElementsByTagName('main')[0];
let turno = true;

let posO = [];
/**
 * Creamos un array con arrays que contienen todas las combinaciones ganadoras
 * 
 * [0] => [0, 1, 2]
 * [1] => [3, 4, 5]
 * ...
 */
let combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

let p = document.createElement('p');
var first = main.firstChild;

/**
 * Recorrer las casillas que tengo en array casillas
 * Comprobar el contenido de cada una
 */

/**
 * Utilizo el array posicionesLlenas para introducir aquellas posiciones que contienen
 * un texto igual a 'X'
 * 
 * Al realizar un push lo que hago es introducir en el array, el numero de la posicion
 */
// let posicionesLlenas = [];
// for(let i = 0; i < casillas.length; i++){
//     console.log('La casilla numero ' + i + ' contiene: ' + casillas[i].innerHTML);
//     if(casillas[i].innerHTML == 'X'){
//         posicionesLlenas.push(i);
//     }
// }
// console.log(posicionesLlenas);

/**
 * Una vez tengo un array con las posiciones que contienen una 'X',
 * me interesa poder comparar si en el contenido de 'posicionesLlenas' esta incluido
 * alguna de las combinaciones de 'combinacionesGanadoras'.
 * 
 * En este caso en 'posicionesLlenas' tenemos:
 * [0] ---> 0
 * [1] ---> 1
 * [2] ---> 2
 * [3] ---> 5
 * 
 * En este caso en 'combinacionesGanadoras' tenemos:
 * [0] ---> [0, 1, 2]           // CORRECTA
 */


/**
 * -------------------------------------------------------------------------
 * CONTENIDO NUEVO
 * -------------------------------------------------------------------------
 */
let contador = 0;
let empate = document.createElement('p');
empate.textContent = "Han empatado";
p.textContent = 'Turno de las X';
main.insertBefore(p, first);

function agregarFicha(numero) {

    console.log('Has hecho un click en la casilla ' + numero)

    /**
     * Cuando se activa esta funcion por el evento del click
     * es necesario eliminar el click del div
     */
    casillas[numero].removeAttribute('onclick')

    if (turno) {
        casillas[numero].textContent = 'X';
        turno = false;
        p.textContent = 'Turno de las O';

        main.insertBefore(p, first);
        
    } else {
        casillas[numero].textContent = 'O';
        turno = true;
        p.textContent = 'Turno de las X';

        main.insertBefore(p, first);
        posO.push(numero);
    }
    contador++;
    if (contador < 9) {
        ganador();
    } else {
        main.appendChild(empate);
    }


}



function ganador() {
    let botonReset = document.createElement('button');
    let ganar = document.createElement('p');
    let divGanar = document.createElement('div');
    let casilla0;
    let casilla1;
    let casilla2;
    let continuar = true;

    botonReset.addEventListener('click', reset);
    botonReset.textContent = 'Resetear Tablero';

    for (combinacion in combinacionesGanadoras) {

        casilla0 = combinacionesGanadoras[combinacion][0];
        casilla1 = combinacionesGanadoras[combinacion][1];
        casilla2 = combinacionesGanadoras[combinacion][2];

        if (!turno) {
            if (casillas[casilla0].textContent == 'X' && casillas[casilla1].textContent == 'X' && casillas[casilla2].textContent == 'X') {
                ganar.textContent = 'Han ganado las X';

                divGanar.appendChild(ganar);
                divGanar.appendChild(botonReset);
                main.appendChild(divGanar);
                continuar = false;
                break;
            }
        } else {
            if (casillas[casilla0].textContent == 'O' && casillas[casilla1].textContent == 'O' && casillas[casilla2].textContent == 'O') {
                ganar.textContent = 'Han ganado las O';

                divGanar.appendChild(ganar);
                divGanar.appendChild(botonReset);
                main.appendChild(divGanar);
                continuar = false;
                break;
            }
        }

    }

    if (!continuar) {
        pararJuego();
    }
}


function pararJuego() {
    let contador = 0;
    for (casilla in casillas) {

        if (contador < 9) {
            casillas[casilla].removeAttribute('onclick');
        }
        contador++;
    }
}

function reset() {

    let contador = 0;
    for (casilla in casillas) {
        if (contador < 9) {
            let a=contador;
            casillas[casilla].textContent='';
            casillas[casilla].addEventListener('click',  function(){ agregarFicha(a); });
        }

        contador++;
    }
    console.log(contador);
}

/**
 * Para acabar el juego necesitamos:
 * 1. Colocar ficha
 * 2. Comprobar en cada insercion de ficha si se ha ganado el juego
 * 3. Cambiar turno
 * 4. Cuando hay ganador, mostrar mensaje
 * 
 * OPCIONES EXTRA:
 * 1. Generar un contado de victorias y resetear el tablero
 */