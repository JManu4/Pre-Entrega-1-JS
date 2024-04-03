// Pre Entrega 2:
// 1 variables, contantes, condicional, ciclos, funciones
// 2 obejtos, arrays, HOF
// DOM, Eventos, Storage & JSON
//
// Invetario de ropa
// Usar para registrar entras y salidas del inventario de prendas 
//
/// old code

// var menu = "s";
// var prendasEnInventario = 0;
// var espacioEnInventario = 3;
// var contadorPrendas = 0;
// var idPrenda = 0;


// /// inicio classes:
// class RopaRegistro {
//     constructor(x){
//         this.id = x.id
//         this.prenda = x.name.toUpperCase();
//         this.color = x.color.toUpperCase();
//         this.talla = x.size.toUpperCase();
//         this.precio = x.price
//     }
//     sumarIva(){
//         this.precio = this.precio*1.16
//     }
// } 
// /// fin classes:
// function registroPrenda (identificador, registro){
//     prenda = prompt( registro + "\nIngrese TIPO de prenda:" );
//     prendaColor = prompt( registro + "\nIngrese COLOR de " + prenda + ":" );
//     prendaTalla = prompt( registro + "\nIngrese TALLA de " + prenda + ":" );
//     prendaPrecio = prompt( registro + "\nIngrese PRECIO de " + prenda + ":" );
//     while ( prendaPrecio != 'esc' && prendaPrecio != 'ESC' ) {
//         parseFloat( prendaPrecio );
//         if ( isNaN( prendaPrecio ) ) {
//             alert( "Formato de \"Precio\" incorrecto \n ' " +  prendaPrecio + " '" );
//         }
//         else {
//             break;
//         }
//         prendaPrecio = prompt( "Ingrese NUEVAMENTE PRECIO de " + prenda + " o \"esc\":" );
//     }
//     if ( prendaPrecio == 'esc' || prendaPrecio == 'ESC' ) {
//         parseFloat( prendaPrecio = 0.0 );
//     }
//     inventario.push( new RopaRegistro( { id:identificador, name:prenda, color:prendaColor, size:prendaTalla, price:prendaPrecio  } ) );
// }
// function validarNumber (unNumero,texto) {
//     while ( unNumero != 'esc' && unNumero != 'ESC' ) {
//         parseInt( unNumero );
//         if ( isNaN( unNumero ) ) {
//             alert( "Formato incorrecto\n ' " +  unNumero + " '" );
//             unNumero = prompt( "Intenta nuevamente o escribe \"esc\"\n" + texto );
//         }
//         else {
//             break;
//         }
//     }
//     return unNumero;
// }



/// fron old code

// inicio variables, constantes:


// inicio nuevas variables
let newInventario = [];
var btnClicked = false;

// inicio nuevas variables


// inicio funciones
function limpiarTablaInventario(){
    while (todoElInventario.firstChild) {
        todoElInventario.removeChild(todoElInventario.firstChild);
    }
}

function dibujarTablaInventario () {
    todoElInventario = document.querySelector(".todoElInventario");
    limpiarTablaInventario();
    
    const inventarioTitulos = document.createElement("tr");
    inventarioTitulos.classList.add("inventarioTitulos");

    if (newInventario.length > 0 ){
        for (let j = 0; j < Object.keys(newInventario[0]).length; j+=1 ) {
            let th = document.createElement("th");
            th.classList.add(`table${Object.keys(newInventario[0])[j]}`)
            th.textContent = `${Object.keys(newInventario[0])[j].toUpperCase()}`
            inventarioTitulos.appendChild(th);
        }
        todoElInventario.appendChild(inventarioTitulos);
        newInventario.forEach( (item) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.tipoPrenda}</td>
                <td>${item.talla}</td>
                <td>${item.color}</td>
                <td>${item.precio}</td>
                <td>${item.id}</td>
            `;
            todoElInventario.appendChild(tr);
            }
        )
    }
    else {
        busquedaSinResultados();
    }


}


function classesOpcionSelected (a,b,c){
    a.classList.add("paraArribaClass");
    a.classList.remove("inv_opcion");
    a.classList.remove("btnVisible");
    a.classList.remove("paraAbajoClass");

    iconoVolverInicio = document.createElement("div");
    iconoVolverInicio.classList.add("iconoVolverInicio");
    iconoVolverInicio.innerHTML = `<i class="bi bi-arrow-bar-down">`;
    a.appendChild(iconoVolverInicio);


    b.classList.add("btnInvisible");    
    b.classList.add("inv_opcion");
    b.classList.remove("btnVisible");
    b.classList.remove("paraAbajoClass");

    c.classList.add("btnInvisible");    
    c.classList.add("inv_opcion");
    c.classList.remove("btnVisible");
    c.classList.remove("paraAbajoClass");

    if (a == invOpcionTodo) {
        dibujarTablaInventario();
    }
    if (a == invOpcionRegistrar) {
        formRegistro.classList.remove("formRegistroInvisible");
        formRegistro.classList.add("formRegistroVisible");
        formRegistro.reset();
    }
    if (a == invOpcionBuscar) {
        formBuscar.classList.remove("formBuscarInvisible");
        formBuscar.classList.add("formBuscarVisible");
        formBuscar.reset();
    }
}
function classesOpcionDesSelected (x,y,z) {
    x.classList.add("paraAbajoClass");
    x.classList.remove("paraArribaClass");
    x.removeChild(iconoVolverInicio);

    y.classList.add("btnVisible");
    y.classList.remove("btnInvisible"); 
    z.classList.add("btnVisible");
    z.classList.remove("btnInvisible"); 
    setTimeout ( () => {
        x.classList.add("inv_opcion");
        x.classList.remove("paraAbajoClass");
        y.classList.remove("btnVisible");
        z.classList.remove("btnVisible");
    },501);

    formRegistro.classList.add("formRegistroInvisible");
    formRegistro.classList.remove("formRegistroVisible");
    formBuscar.classList.add("formBuscarInvisible");
    formBuscar.classList.remove("formBuscarVisible");
    
    if (x == invOpcionTodo) {
        limpiarTablaInventario();
    }
    if (x == invOpcionBuscar) {
        limpiarBusqueda();
    }
}
function invOpcionTodoSelected ( selected ) {
    if ( selected == "invOpcionTodo" ){
        var selected = invOpcionTodo;
        var notSelected1 = invOpcionBuscar;
        var notSelected2 = invOpcionRegistrar;
        
    }
    if ( selected == "invOpcionBuscar" ){
        var selected = invOpcionBuscar;
        var notSelected1 = invOpcionTodo;
        var notSelected2 = invOpcionRegistrar;
    }
    if ( selected == "invOpcionRegistrar" ){
        var selected = invOpcionRegistrar;
        var notSelected1 = invOpcionBuscar;
        var notSelected2 = invOpcionTodo;
    }
    if (btnClicked == false) {
        classesOpcionSelected (selected,notSelected1,notSelected2);
        btnClicked = true;
    }
    else {
        classesOpcionDesSelected (selected,notSelected1,notSelected2);
        
        btnClicked = false;
    }
    return btnClicked;
}
function guardarPrenda(evt){
    evt.preventDefault();        
    formRegistroPreda = Array.from( document.querySelectorAll("#formRegistroInvisible select, #formRegistroInvisible input") ).reduce((acumulador, detalleDePrenda) => ({ ...acumulador, [detalleDePrenda.id] : detalleDePrenda.value}) , {});
    
    formRegistroPreda.id = Date.now().toString(16).slice(5);

    newInventario.push(formRegistroPreda);
    console.log(newInventario);
    formRegistro.reset();
    sincronizarStorage();
}
function sincronizarStorage (){
    localStorage.setItem('newInventario', JSON.stringify(newInventario));
    mensajeGuardado();
}
function mensajeGuardado (){
    const txtGuardado = document.createElement("p");
    txtGuardado.innerHTML = `¡Prenda guardada! <br> <i class="bi bi-send-check"></i>`;
    txtGuardado.classList.add("mensajeGuardado");

    const divMensajeError = document.querySelector(".divMensajeError");
    divMensajeError.appendChild(txtGuardado);
    setTimeout( () => { txtGuardado.remove() }, 1500 );
}




function limpiarBusqueda(){
    while (resultadosBusqueda.firstChild) {
        resultadosBusqueda.removeChild(resultadosBusqueda.firstChild);
    }
}
function mostrarPrendas (xxx) {
    limpiarBusqueda();
    xxx.forEach( item => {
        const encontrado = document.createElement("div");
        encontrado.classList.add("encontrado");

        if (item.tipoPrenda == "Vestido"){
            imgPrenda = "vestido1.jpg"
        }
        if (item.tipoPrenda == "Blusa"){
            imgPrenda = "blusa1.jpeg"
        }
        if (item.tipoPrenda == "Short"){
            imgPrenda = "short.jpeg"
        }
        if (item.tipoPrenda == "Falda"){
            imgPrenda = "falda1.jpeg"
        }
        if (item.tipoPrenda == "Otro"){
            imgPrenda = "otro2.jpeg"
        }
        encontrado.innerHTML += `
            <div class="encontradoImagenDiv">
                <img class="encontradoImagen" src="./images/${imgPrenda}" alt="">
            </div>
                <div class="encontradoText">
                <h3>${item.tipoPrenda}</h3>
                <p>Color: ${item.color}</p>
                <p>Talla: ${item.talla}</p>
                <p>MXN $ ${item.precio}</p>
                <p>En inventario: #</p>
            </div>`;
        resultadosBusqueda.appendChild(encontrado);
        return encontrado;
    } );
}
function busquedaSinResultados(){
    const sinResultados = document.createElement("p");
    sinResultados.innerHTML = `¡Sin Resultados! <br> <i class="bi bi-x-square"></i>`;
    sinResultados.classList.add("sinResultados");

    const divMensajeError = document.querySelector(".divMensajeError");
    divMensajeError.appendChild(sinResultados);
    setTimeout( () => { sinResultados.remove() }, 1500 );
}
function filtrarXTipoDePrenda (item) {  
    if (datosAbuscar.buscarTipoPrendaId) {
        return item.tipoPrenda === datosAbuscar.buscarTipoPrendaId;
    }
    return item;
}
function filtrarXTalla (item) {  
    if (datosAbuscar.buscarTallaId) {
        return item.talla === datosAbuscar.buscarTallaId;
    }
    return item;
}
function filtrarXColor (item) {  
    if (datosAbuscar.buscarColorId) {
        return item.color === datosAbuscar.buscarColorId;
    }
    return item;
}
function buscarPrenda(evtt){
    evtt.preventDefault();
    limpiarBusqueda();

    datosAbuscar = Array.from( document.querySelectorAll("#formBuscarInvisible select, #formBuscarInvisible input") ).reduce((acumulador, detalleDePrenda) => ({ ...acumulador, [detalleDePrenda.id] : detalleDePrenda.value}) , {}); 
    const resultado = newInventario.filter( filtrarXTipoDePrenda ).filter( filtrarXTalla ).filter( filtrarXColor ) ;
    if (resultado.length > 0 ){
        mostrarPrendas(resultado);
    }
    else {
        busquedaSinResultados();
    }
}


// fin funciones

// inicio código     
const invOpcionTodo = document.querySelector(".inv_opcion_todo");
const invOpcionBuscar = document.querySelector(".inv_opcion_buscar");
const invOpcionRegistrar = document.querySelector(".inv_opcion_registrar");
invOpcionTodo.addEventListener("click", ()=> {invOpcionTodoSelected("invOpcionTodo")});
invOpcionBuscar.addEventListener("click", ()=> {invOpcionTodoSelected("invOpcionBuscar")});
invOpcionRegistrar.addEventListener("click", ()=> {invOpcionTodoSelected("invOpcionRegistrar")});
    
const formRegistro = document.querySelector("#formRegistroInvisible");
formRegistro.addEventListener("submit", guardarPrenda);

const formBuscar = document.querySelector("#formBuscarInvisible");
formBuscar.addEventListener("submit", buscarPrenda);
const resultadosBusqueda = document.querySelector(".resultadosBusqueda");
const buscarLimpiarBtn = document.querySelector(".buscarLimpiarBtn");
buscarLimpiarBtn.addEventListener("click",limpiarBusqueda);



document.addEventListener('DOMContentLoaded', ()=> {
    newInventario = JSON.parse(localStorage.getItem('newInventario')) || [];
    console.table(newInventario);
} )







    // let indice = prompt( "[ 1 - ver ] -> Ver inventario \n[ 2 - reg ] -> Registrar \n[ 3 - esc ] -> Salir\n" );
    // switch ( indice ) {
    //     case 'ver':
    //     case 'VER':
    //     case '1':
    //         if ( prendasEnInventario == 0 ) {
    //             alert( "Inventario vacio" )
    //         }
    //         else {
    //             const textoVerInventario = "Selecciona una opción:\n[ #1 ] -> Mostrar todo\n[ #2 ] -> Buscar por ID\n[ #3 ] -> Buscar por prenda\n[ #4 ] -> Buscar por talla\n[ #5 ] -> Suma precios en inventario";
    //             let opcionVerInventario = prompt( textoVerInventario );
    //             opcionVerInventario = validarNumber(opcionVerInventario,textoVerInventario);
    //             switch ( opcionVerInventario ) {
    //                 case '1':
    //                     console.log("-----------------------------------");
    //                     const resultTodos = inventario.forEach ( item => console.log(item) );
    //                     break;
    //                 case '2':
    //                     const textoBuscarId = "Ingrese ID";
    //                     let buscarId = prompt (textoBuscarId);
    //                     buscarId = validarNumber(buscarId,textoBuscarId);                    
    //                     const resultId = inventario.find ( item => item.id == buscarId );
    //                     if ( typeof resultId == "undefined" ) {
    //                         alert("No existe ID: " + buscarId);
    //                         break;
    //                     }
    //                     console.log("-----------------------------------");
    //                     console.log(resultId);
    //                     break;
    //                 case '3':
    //                     let buscarNombre = prompt ("Ingrese Prenda o parte del nombre: ").toUpperCase();
    //                     const resultNombre = inventario.filter( item => item.prenda.includes(buscarNombre));
    //                     if ( resultNombre.length == 0 ) {
    //                         alert("No existe prenda: " + buscarNombre);
    //                         break;
    //                     }
    //                     console.log("-----------------------------------");
    //                     console.log(resultNombre);
    //                     break;
    //                 case '4':
    //                     let buscarTalla = prompt ("Ingrese talla: ").toUpperCase();
    //                     const resultTalla = inventario.find( item => item.talla == buscarTalla );
    //                     if ( typeof resultTalla == "undefined" ) {
    //                         alert("No existe talla: " + buscarTalla);
    //                         break;
    //                     }
    //                     console.log("-----------------------------------");
    //                     console.log(resultTalla);
    //                     break;
    //                 case '5':
    //                     const resultTotalPrecios = inventario.reduce( (total, itemPrecio) => parseFloat(total) + parseFloat(itemPrecio.precio), 0 );
    //                     console.log("-----------------------------------");
    //                     console.log("Precio total de Inventario: $" + resultTotalPrecios);
    //                     break;
    //                 case 'esc':
    //                 case 'ESC':
    //                     break;
    //                 default:
    //                     alert("Opción invalida");
    //             }
    //         }
    //         break;
    //     case 'reg':
    //     case 'REG':
    //     case '2':
    //         if ( espacioEnInventario == 0 ) {
    //             alert( "Prendas registradas: " + prendasEnInventario + "\nInventario lleno" );
    //         }
    //         else {
    //             prendasAregistrar = parseInt( prompt( "Espacio disponible inventario: " + espacioEnInventario + "\nIngrese numero de prendas a registrar:" ) );
    //             while ( prendasAregistrar != 'esc' && prendasAregistrar != 'ESC' ) {
    //                 if ( isNaN (prendasAregistrar) ) {
    //                     alert( "Formato invalido!\n' " +  prendasAregistrar + " '" );
    //                 }
    //                 else {
    //                     break;
    //                 }
    //                 prendasAregistrar = parseInt(prompt( "Ingrese NUEVAMENTE numero de prendas a registrar:" ));
    //             }
    //             prendasEnInventario += prendasAregistrar;
    //             if ( prendasAregistrar > espacioEnInventario ){
    //                 prendasEnInventario -= prendasAregistrar;
    //                 alert( "Prendas a registar (" + prendasAregistrar + ") supera espacio en invetario (" + espacioEnInventario + ")" );
    //             }
    //             else {             
    //                 for ( var registro = 1; registro <= prendasAregistrar; registro++ ) { 
    //                     idPrenda ++;
    //                     registroPrenda(idPrenda, registro);
    //                     espacioEnInventario--;
    //                 }
    //             }
    //         }
    //         break;
    //     case 'esc':
    //     case 'ESC':
    //     case '3':
    //         menu = 'n'
    //         break;
    //     default:
    //         menu = prompt( "Entrada invalida, reiniciar menú? [s/n/esc]: " );
    // }


