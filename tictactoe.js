let casillas = document.getElementsByClassName("casilla");
let main = document.getElementsByTagName('main')[0];

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

let contadorEmpate = 0;
let empate = document.createElement('p');
empate.textContent = "Han empatado";
let p = document.createElement('p');
//Variable de control de turnos
let turno = true;
let divTurno = document.getElementById('turno');
//Variable para que se inserte bien el contador de tiempo y el indicador de turno
var first = divTurno.firstChild;


//Esto es para indicar el primer turno de la partida
p.textContent = 'Turno de las X';
divTurno.appendChild(p);
divTurno.insertBefore(p, first);

/**

* Agrega una X o un O en la casilla en la que se ha hecho click.

* @param  {numero} El numero de la casilla

* @return  {void}

*/

function agregarFicha(numero) {


    console.log('Has hecho un click en la casilla ' + numero)

    /**
     * Cuando se activa esta funcion por el evento del click
     * es necesario eliminar el click del div
     */
    casillas[numero].removeAttribute('onclick')

    //Compruebo si es el turno de las X o de las O insetando lo que corresponda, y cambiando de turno
    if (turno) {
        casillas[numero].setAttribute('style', 'color:rgb(255, 27, 28)');
        casillas[numero].textContent = 'X';
        turno = false;
        p.textContent = 'Turno de las O';
        divTurno.insertBefore(p, first);


        cuenta = 10;
    } else {
        casillas[numero].setAttribute('style', 'color:rgb(50, 232, 117)');
        casillas[numero].textContent = 'O';
        turno = true;
        p.textContent = 'Turno de las X';
        divTurno.insertBefore(p, first);

        cuenta = 10;
    }
    contadorEmpate++;

    //Compurebo si hay empate o si hay ganador

    
    if (ganador()&&contadorEmpate == 9) {
        divGanar.appendChild(empate);
        divGanar.appendChild(botonReset);

        centro.appendChild(divGanar);
        pararJuego();
    } 


}

//Boton para resetear el tablero
let botonReset = document.createElement('button');
//Mensaje que aparece cuando gana X o O
let ganar = document.createElement('p');
//Creo este div para tener al boton y al mensaje dentro de lo mismo
let divGanar = document.createElement('div');
let centro = document.getElementById('centro');


//Variables para los contadores de victoria
let contadorVictoriaX = 0;
let contadorVictoriaO = 0;

let añadirX = document.createElement('p');
let añadirO = document.createElement('p');
let marcadorX = document.getElementById("marcadorX");
let marcadorO = document.getElementById("marcadorO");


divGanar.setAttribute('id', 'ganar');


/**

* Funcion para comprobar si alguno de los dos bandos ha ganado

* @param  {}

* @return  {boolean}

*/

function ganador() {

    let casilla0;
    let casilla1;
    let casilla2;
    let continuar = true;

    botonReset.setAttribute('onclick', 'reset()');
    botonReset.textContent = 'Resetear Tablero';
    //Utilizo un bucle para recorrer el array con todas las combinaciones ganadoras
    for (let i = 0; i < combinacionesGanadoras.length && continuar; i++) {
        //Me guardo cada una de las tres posiciones cada una en una variable
        casilla0 = combinacionesGanadoras[i][0];
        casilla1 = combinacionesGanadoras[i][1];
        casilla2 = combinacionesGanadoras[i][2];
        //Compruebo si en cada una de esas posiciones hay una X o un O, dependiendo del turno, y de ser asi paro el juego 
        if (!turno) {
            if (casillas[casilla0].textContent === 'X' && casillas[casilla1].textContent === 'X' && casillas[casilla2].textContent === 'X') {
                casillas[casilla0].classList.add('linea');
                casillas[casilla1].classList.add('linea');
                casillas[casilla2].classList.add('linea');

                ganar.textContent = 'Han ganado las X';
                divGanar.appendChild(ganar);
                divGanar.appendChild(botonReset);
                centro.appendChild(divGanar);

                continuar = false;
                contadorVictoriaX++;
                añadirX.textContent = "" + contadorVictoriaX;
                marcadorX.appendChild(añadirX);

                pararJuego();

            }
        } else {
            if (casillas[casilla0].textContent === 'O' && casillas[casilla1].textContent === 'O' && casillas[casilla2].textContent === 'O') {
                
                casillas[casilla0].classList.add('linea');
                casillas[casilla1].classList.add('linea');
                casillas[casilla2].classList.add('linea');
                
                
                ganar.textContent = 'Han ganado las O';
                divGanar.appendChild(ganar);
                divGanar.appendChild(botonReset);
                centro.appendChild(divGanar);
                continuar = false;
                contadorVictoriaO++;
                añadirO.textContent = "" + contadorVictoriaO;
                marcadorO.appendChild(añadirO);

                pararJuego();

            }
        }

    }
    return continuar;

}


/**

* Para  el juego,una vez halla un ganador o un empate
* @param  {}

* @return  {void}

*/

//Booleano para controlar el tiempo
let pararTiempo = false;
function pararJuego() {
    //Quito el atributo onclick a las casillas, para que ya no se puedan modificar
    for (let i = 0; i < casillas.length; i++) {
        casillas[i].removeAttribute('onclick');
    }
    //Paro el tiempo
    pararTiempo = true;

}

/**

* //Funcion que resetea el tablero a su forma original, ademas de resetear el contadorEmpate de empate y el temporizador

* @param  {}

* @return  {void}

*/

function reset() {
    //Variable para poder eliminar boton reset y quien ha ganado
    divGanar.innerHTML = "";
    divGanar.outerHTML = "";
    
    for (let i = 0; i < casillas.length; i++) {
        casillas[i].textContent = "";
        casillas[i].setAttribute('onclick', "agregarFicha (" + i + ");");
        casillas[i].classList.remove('linea');
    }

    contadorEmpate = 0;
    cuenta = 10;

    if (turno) {
        p.textContent = 'Turno de las X';
    } else {
        p.textContent = 'Turno de las O';
    }
    divTurno.appendChild(p);
    divTurno.insertBefore(p, first);

    pararTiempo = false;
    cronometro = setTimeout(temporizador, 1000);
}

let cuenta = 10;
//Variable para imprimir el cronometro en una etiqueta p
let textoTiempo = document.createElement('p');
//Pongo que se ejecute la funcion habiendo pasado 1 milisegundo, para que se ejecute nada mas empezar el juego
let cronometro = setTimeout(temporizador, 1);

/**

* Funcion para controlar el tiempo y que cambie de turno si se acaba, he dejado 10 segundos por defecto,dependiendo del valor de la variable cuenta
* ya que le  voy restando 1 a cuenta cada segundo y cuando llega a 0 se produce el cambio de turno, y se resetea el temporizador

* @param  {}

* @return  {void}

*/

function temporizador() {
    if (!pararTiempo) {
        textoTiempo.textContent = "" + cuenta;
        divTurno.after(textoTiempo);
        cuenta--;
        if (cuenta == 0) {
            cuenta = 10;
            cambioTurno();
        }
        cronometro = setTimeout(temporizador, 1000);
    }
}

/**

* Cambia el turno, solo la uso si el temporizador llega a 0

* @param  {}

* @return  {void}

*/

function cambioTurno() {

    if (turno) {
        p.textContent = 'Turno de las O';
        divTurno.insertBefore(p, first);
        turno = false;
    } else {
        p.textContent = 'Turno de las X';
        divTurno.insertBefore(p, first);
        turno = true;
    }

}