// VARIABLES
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');


// EVENTS
eventsListeners();
function eventsListeners() {
    formulario.addEventListener('submit', validarCampos);
};



// CLASES
class Clima {
    constructor( ciudad, pais ) {
        this.ciudad = ciudad;
        this.pais = pais;
    };

    consultarApi( ciudad, pais ) {
        const apiKey = '96477dbf5d069835a246e636ecfdbae8';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;  

        spinner();
        fetch( url )
            .then( respuesta => {
                return respuesta.json();
            })
            .then( datos => {

                limpiarHtml();

                if ( datos.cod === "404" ) {
                    interfaz.mostrarError('No se encontro la ciudad');
                    return;
                } else {
                    return interfaz.imprimirHtml( datos );
                };
            })
            .catch( error => interfaz.mostrarError(error));
    };
};

class UI {

    mostrarError( mensaje ) {

        const alerta = document.querySelector('.alerta');

        if ( !alerta ) {
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-2', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta');
            divMensaje.innerHTML = `
                <strong class="font-bold"> Error </strong>
                <span class="block"> ${mensaje} </span>
            `;

            document.querySelector('.container').appendChild(divMensaje)
            
            resetarFormulario()

            setTimeout(() => {
                divMensaje.remove();
            }, 3000);
        };
    };

    imprimirHtml( datos ) {
        // limpiarHtml();

        const { name, main: { temp, temp_min, temp_max} } = datos;

        const actual = kelvinACentigrados( temp );
        const minima = kelvinACentigrados( temp_min );
        const maxima = kelvinACentigrados( temp_max );

        const tempActual = document.createElement('h2');
        tempActual.classList.add('font-bold', 'text-3xl');
        tempActual.innerHTML = ` ${name} ${actual} &#8451`;

        const tempMinima = document.createElement('p');
        tempMinima.classList.add('text-xl');
        tempMinima.innerHTML = `Min: ${minima} &#8451`;

        const tempMaxima = document.createElement('o');
        tempMaxima.classList.add('text-xl');
        tempMaxima.innerHTML = `Max: ${maxima} &#8451`;

        const resultadoDiv = document.createElement('div');
        resultadoDiv.classList.add('text-center', 'text-white');

        resultadoDiv.appendChild( tempActual );
        resultadoDiv.appendChild( tempMinima );
        resultadoDiv.appendChild( tempMaxima );

        resultado.appendChild( resultadoDiv );

        resetarFormulario();
    };
};


// INSTANCEAS
const clima = new Clima();
const interfaz = new UI();



// FUNCIONES
function validarCampos(e) {
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if ( [ ciudad, pais ].includes('') ) {
        interfaz.mostrarError('Todos los campos son obligatorios', 'error');
        return;
    };

    clima.consultarApi( ciudad, pais );
};

function kelvinACentigrados( grados ) {
    return parseInt( grados - 273.15 );
};

function limpiarHtml() {
    while ( resultado.firstChild ) {
        resultado.removeChild( resultado.firstChild );
    };
};

function resetarFormulario() {
    formulario.reset();
};

function spinner() {
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild( divSpinner );
};