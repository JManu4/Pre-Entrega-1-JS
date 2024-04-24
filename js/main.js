////////////////////////////////////////////////////////////////////////////////////
// Comisión 53935
// JavaScript
////////////////////////////////////////////////////////////////////////////////////

let newInventario = [];
var btnClicked = false;
var tablaInventario
var dataFromJson

function limpiarTablaInventario(){
    while ( tablaInventario.firstChild ){ tablaInventario.removeChild(tablaInventario.firstChild) }
}
function dibujarTablaInventario(){
    tablaInventario = document.querySelector(".tablaInventario");
    limpiarTablaInventario();
    const inventarioTitulos = document.createElement("tr");
    inventarioTitulos.classList.add("inventarioTitulos");
    if ( newInventario.length > 0 ){
        let numeroDePrendaTh = document.createElement('th');
        numeroDePrendaTh.textContent = "N° Prendas";
        inventarioTitulos.appendChild(numeroDePrendaTh);        
        for ( let j = 0; j < Object.keys(newInventario[0]).length; j+=1 ){
            let th = document.createElement("th");
            th.classList.add(`table${Object.keys(newInventario[0])[j]}`)
            th.textContent = `${Object.keys(newInventario[0])[j].toUpperCase()}`
            inventarioTitulos.appendChild(th);
        }
        let thBorrar = document.createElement('th');
        thBorrar.textContent = "Borrar";
        inventarioTitulos.appendChild(thBorrar);
        tablaInventario.appendChild(inventarioTitulos);
        let numeroDePrenda = 1
        newInventario.forEach( (item) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${numeroDePrenda}</td>
                <td>${item.tipoPrenda}</td>
                <td>${item.talla}</td>
                <td>${item.color}</td>
                <td>${item.precio}</td>
                <td>${item.id}</td>
                <td id="${item.id}"><a class="btnBorrar"><i class="bi bi-trash"></i></a></td>`;
            tablaInventario.appendChild(tr);
            numeroDePrenda+=1;
            });
    tablaInventario.addEventListener('click',borrarPrenda);
    }
    else { busquedaSinResultados("Inventario vacio") };
    sincronizarStorage();
}
function borrarPrenda (evt) {
    evt.preventDefault;
    Swal.fire({
        title: "Confirma eliminación",
        text: "Este cambio es irreversible",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Si, borrar!"
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            title: "Borrada",
            text: "Prenda borrada de inventario.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
        });
        newInventario = newInventario.filter( item => item.id != evt.target.parentElement.parentElement.id )
        dibujarTablaInventario();
        }
    });
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
    a == invOpcionBuscar && formBuscar.classList.remove("formBuscarInvisible"); formBuscar.classList.add("formBuscarVisible");formBuscar.reset();
    a == invOpcionRegistrar && formRegistro.classList.remove("formRegistroInvisible"); formRegistro.classList.add("formRegistroVisible"); formRegistro.reset();

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
    formRegistro.reset();
    mensajeGuardado();
    sincronizarStorage();
}
function sincronizarStorage (){
    localStorage.setItem('newInventario', JSON.stringify(newInventario));
}
function mensajeGuardado (){
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Prenda guardada",
      showConfirmButton: false,
      timer: 1500
    });
}
function limpiarBusqueda(){
    while (resultadosBusqueda.firstChild) {
        resultadosBusqueda.removeChild(resultadosBusqueda.firstChild);
    }
}
function mostrarPrendas (inventarioFiltrado) {
    limpiarBusqueda();
    const enInventarioVestidos = inventarioFiltrado.reduce( (contador, prenda) => prenda.tipoPrenda === "Vestido" ? contador+=1 : contador, 0 );
    const enInventarioBlusas = inventarioFiltrado.reduce( (contador, prenda) => prenda.tipoPrenda === "Blusa" ? contador+=1 : contador, 0 );
    const enInventarioShorts = inventarioFiltrado.reduce( (contador, prenda) => prenda.tipoPrenda === "Short" ? contador+=1 : contador, 0 );
    const enInventarioFaldas = inventarioFiltrado.reduce( (contador, prenda) => prenda.tipoPrenda === "Falda" ? contador+=1 : contador, 0 );
    const enInventarioOtros = inventarioFiltrado.reduce( (contador, prenda) => prenda.tipoPrenda === "Otro" ? contador+=1 : contador, 0 );
    
    inventarioFiltrado.forEach( async (item) => {
        let enInventarioCantidad;
        item.tipoPrenda == "Vestido" ? enInventarioCantidad = enInventarioVestidos
        : item.tipoPrenda == "Blusa" ? enInventarioCantidad = enInventarioBlusas
        : item.tipoPrenda == "Short" ? enInventarioCantidad = enInventarioShorts
        : item.tipoPrenda == "Falda" ? enInventarioCantidad = enInventarioFaldas
        : enInventarioCantidad = enInventarioOtros

        await fetch("./detallesPiezasEnInvetario.json")
            .then( respuesta => respuesta.json() )
            .then( jsonData => {
                item.tipoPrenda == "Otro" ? (idFrominventarioFiltrado = "otro") : (idFrominventarioFiltrado = item.tipoPrenda.slice(0,3).toLowerCase() + item.color.slice(0,3).toLowerCase());
                dataFromJson = jsonData.filter(item => item.prendaIdName == idFrominventarioFiltrado );
                return dataFromJson;
                }
            )
            .catch(
                err => {
                    Swal.fire({
                        icon: "error",
                        title: "Error al obtener datos",
                        text: err,
                      });
                }
            )
        const tallaIndex = dataFromJson[0].talla.findIndex( x => x == item.talla)
        const encontradoCardDiv = document.createElement("div");
        encontradoCardDiv.classList.add("encontrado");
        encontradoCardDiv.innerHTML += `
            <div class="encontradoImagenDiv">
                <img class="encontradoImagen" src="${dataFromJson[0].img}.jpeg" alt="">
            </div>
            <div class="encontradoText">
                <h3>${dataFromJson[0].nombre}</h3>
                <p>Color: ${dataFromJson[0].color}</p>
                <p>Talla: ${dataFromJson[0].talla[tallaIndex]}</p>
                <p>MXN $ ${item.precio}</p>
                <p>Tipo de tela: ${dataFromJson[0].tela}</p>
                <p>Lavado: ${dataFromJson[0].lavado}</p>
                <p>En inventario (por tipo de prenda): # ${enInventarioCantidad}</p>
            </div>`;
        resultadosBusqueda.appendChild(encontradoCardDiv);
        return encontradoCardDiv;
    } );
}
function busquedaSinResultados(msjError){
    Swal.fire({
        icon: "error",
        title: "Busqueda sin resultados",
        text: msjError,
      });
}
function buscarPrenda(evtt){
    evtt.preventDefault();
    limpiarBusqueda();
    datosAbuscar = Array.from( document.querySelectorAll("#formBuscarInvisible select, #formBuscarInvisible input") ).reduce((acumulador, detalleDePrenda) => ({ ...acumulador, [detalleDePrenda.id] : detalleDePrenda.value}) , {});
    const inventarioFiltrado = newInventario.filter( filtrarXTipoDePrenda ).filter( filtrarXTalla ).filter( filtrarXColor ) ;
    inventarioFiltrado.length > 0 ? mostrarPrendas(inventarioFiltrado) : busquedaSinResultados("Intente ajustar filtros o revisar todo el inventario.");
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