////////////////////////////////////////////////////////////////////////////////////
//
// Pre Entrega 3:
// 1.- variables, contantes, condicional, ciclos, funciones
// 2.- obejtos, arrays, HOF
// 3.- DOM, Eventos, Storage & JSON + HTML & CSS + Operadores avanzados
//
// Invetario de ropa
// Usar para registrar entras y salidas del inventario de prendas 
//
////////////////////////////////////////////////////////////////////////////////////

// inicio nuevas variables
let newInventario = [];
var btnClicked = false;

// inicio funciones
function limpiarTablaInventario(){
    while ( todoElInventario.firstChild ){
        todoElInventario.removeChild(todoElInventario.firstChild);
    }
}
function dibujarTablaInventario(){
    todoElInventario = document.querySelector(".todoElInventario");
    limpiarTablaInventario();
    const inventarioTitulos = document.createElement("tr");
    inventarioTitulos.classList.add("inventarioTitulos");
    if ( newInventario.length > 0 ){
        for ( let j = 0; j < Object.keys(newInventario[0]).length; j+=1 ){
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
                <td>${item.id}</td>`;
            todoElInventario.appendChild(tr);
            });
    }
    else { busquedaSinResultados() };
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

    a == invOpcionTodo && dibujarTablaInventario();
    a == invOpcionRegistrar && formRegistro.classList.remove("formRegistroInvisible"); formRegistro.classList.add("formRegistroVisible"); formRegistro.reset();
    a == invOpcionBuscar && formBuscar.classList.remove("formBuscarInvisible"); formBuscar.classList.add("formBuscarVisible");formBuscar.reset();

    b.classList.add("btnInvisible");    
    b.classList.add("inv_opcion");
    b.classList.remove("btnVisible");
    b.classList.remove("paraAbajoClass");
    c.classList.add("btnInvisible");    
    c.classList.add("inv_opcion");
    c.classList.remove("btnVisible");
    c.classList.remove("paraAbajoClass");
}

function classesOpcionDesSelected (x,y,z) {
    x.classList.add("paraAbajoClass");
    x.classList.remove("paraArribaClass");
    x.removeChild(iconoVolverInicio);
    x == invOpcionTodo && limpiarTablaInventario();
    x == invOpcionBuscar && limpiarBusqueda();

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
    btnClicked == false ? 
    (classesOpcionSelected (selected,notSelected1,notSelected2),btnClicked = true) : (classesOpcionDesSelected (selected,notSelected1,notSelected2),btnClicked = false);
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
        item.tipoPrenda == "Vestido" ? imgPrenda = "vestido1.jpg" : item.tipoPrenda == "Blusa" ? imgPrenda = "blusa1.jpeg" : item.tipoPrenda == "Short" ? imgPrenda = "short.jpeg" : item.tipoPrenda == "Falda"? imgPrenda = "falda1.jpeg" : imgPrenda = "otro2.jpeg"
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
//// En estas funciones de filtro no supe como optimizar el 'if'
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
    resultado.length > 0 ? mostrarPrendas(resultado) : busquedaSinResultados();
}
// fin funciones

// inicio DOM
const invOpcionTodo = document.querySelector(".inv_opcion_todo");
const invOpcionBuscar = document.querySelector(".inv_opcion_buscar");
const invOpcionRegistrar = document.querySelector(".inv_opcion_registrar");
invOpcionTodo.addEventListener("click", ()=> {invOpcionTodoSelected("invOpcionTodo")});
invOpcionBuscar.addEventListener("click", ()=> {invOpcionTodoSelected("invOpcionBuscar")});
invOpcionRegistrar.addEventListener("click", ()=> {invOpcionTodoSelected("invOpcionRegistrar")});
    
const formBuscar = document.querySelector("#formBuscarInvisible");
formBuscar.addEventListener("submit", buscarPrenda);
const resultadosBusqueda = document.querySelector(".resultadosBusqueda");
const buscarLimpiarBtn = document.querySelector(".buscarLimpiarBtn");
buscarLimpiarBtn.addEventListener("click",limpiarBusqueda);

const formRegistro = document.querySelector("#formRegistroInvisible");
formRegistro.addEventListener("submit", guardarPrenda);

document.addEventListener('DOMContentLoaded', ()=> {
    newInventario = JSON.parse(localStorage.getItem('newInventario')) || [];
    console.table(newInventario);
} )