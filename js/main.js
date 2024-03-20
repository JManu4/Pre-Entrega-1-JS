// Pre Entrega 2:
// 1 variables, contantes, condicional, ciclos, funciones
// 2 obejtos, arrays, HOF
//
// Invetario de ropa
// Usar para registrar entras y salidas del inventario de prendas 
//

alert("Bienvenido a 'El Inventario'");

// inicio variables, constantes:
var menu = "s";
var prendasEnInventario = 0;
var espacioEnInventario = 3;
var contadorPrendas = 0;
var idPrenda = 0;
const inventario = [];
// fin variables, constantes:

/// inicio classes:
class RopaRegistro {
    constructor(x){
        this.id = x.id
        this.prenda = x.name.toUpperCase();
        this.color = x.color.toUpperCase();
        this.talla = x.size.toUpperCase();
        this.precio = x.price
    }
    sumarIva(){
        this.precio = this.precio*1.16
    }
} 
/// fin classes:


// inicio funciones
function registroPrenda (identificador, registro){
    prenda = prompt( registro + "\nIngrese TIPO de prenda:" );
    prendaColor = prompt( registro + "\nIngrese COLOR de " + prenda + ":" );
    prendaTalla = prompt( registro + "\nIngrese TALLA de " + prenda + ":" );
    prendaPrecio = prompt( registro + "\nIngrese PRECIO de " + prenda + ":" );
    while ( prendaPrecio != 'esc' && prendaPrecio != 'ESC' ) {
        parseFloat( prendaPrecio );
        if ( isNaN( prendaPrecio ) ) {
            alert( "Formato de \"Precio\" incorrecto \n ' " +  prendaPrecio + " '" );
        }
        else {
            break;
        }
        prendaPrecio = prompt( "Ingrese NUEVAMENTE PRECIO de " + prenda + " o \"esc\":" );
    }
    if ( prendaPrecio == 'esc' || prendaPrecio == 'ESC' ) {
        parseFloat( prendaPrecio = 0.0 );
    }
    inventario.push( new RopaRegistro( { id:identificador, name:prenda, color:prendaColor, size:prendaTalla, price:prendaPrecio  } ) );
}

function validarNumber (unNumero,texto) {
    while ( unNumero != 'esc' && unNumero != 'ESC' ) {
        parseInt( unNumero );
        if ( isNaN( unNumero ) ) {
            alert( "Formato incorrecto\n ' " +  unNumero + " '" );
            unNumero = prompt( "Intenta nuevamente o escribe \"esc\"\n" + texto );
        }
        else {
            break;
        }
    }
    return unNumero;
}
// fin funciones


// inicio código 
while ( menu == 's' || menu == 'S' ) {
    let indice = prompt( "[ 1 - ver ] -> Ver inventario \n[ 2 - reg ] -> Registrar \n[ 3 - esc ] -> Salir\n" );
    switch ( indice ) {
        case 'ver':
        case 'VER':
        case '1':
            if ( prendasEnInventario == 0 ) {
                alert( "Inventario vacio" )
            }
            else {
                const textoVerInventario = "Selecciona una opción:\n[ #1 ] -> Mostrar todo\n[ #2 ] -> Buscar por ID\n[ #3 ] -> Buscar por prenda\n[ #4 ] -> Buscar por talla\n[ #5 ] -> Suma precios en inventario";
                let opcionVerInventario = prompt( textoVerInventario );
                opcionVerInventario = validarNumber(opcionVerInventario,textoVerInventario);
                switch ( opcionVerInventario ) {
                    case '1':
                        console.log("-----------------------------------");
                        const resultTodos = inventario.forEach ( item => console.log(item) );
                        break;
                    case '2':
                        const textoBuscarId = "Ingrese ID";
                        let buscarId = prompt (textoBuscarId);
                        buscarId = validarNumber(buscarId,textoBuscarId);
                        
                        const resultId = inventario.find ( item => item.id == buscarId );
                        if ( typeof resultId == "undefined" ) {
                            alert("No existe ID: " + buscarId);
                            break;
                        }
                        console.log("-----------------------------------");
                        console.log(resultId);
                        break;
                    case '3':
                        let buscarNombre = prompt ("Ingrese Prenda o parte del nombre: ").toUpperCase();
                        const resultNombre = inventario.filter( item => item.prenda.includes(buscarNombre));
                        if ( resultNombre.length == 0 ) {
                            alert("No existe prenda: " + buscarNombre);
                            break;
                        }
                        console.log("-----------------------------------");
                        console.log(resultNombre);
                        break;
                    case '4':
                        let buscarTalla = prompt ("Ingrese talla: ").toUpperCase();
                        const resultTalla = inventario.find( item => item.talla == buscarTalla );
                        if ( typeof resultTalla == "undefined" ) {
                            alert("No existe talla: " + buscarTalla);
                            break;
                        }
                        console.log("-----------------------------------");
                        console.log(resultTalla);
                        break;
                    case '5':
                        const resultTotalPrecios = inventario.reduce( (total, itemPrecio) => parseFloat(total) + parseFloat(itemPrecio.precio), 0 );
                        console.log("-----------------------------------");
                        console.log("Precio total de Inventario: $" + resultTotalPrecios);
                        break;
                    case 'esc':
                    case 'ESC':
                        break;
                    default:
                        alert("Opción invalida");
                }
            }
            break;
        case 'reg':
        case 'REG':
        case '2':
            if ( espacioEnInventario == 0 ) {
                alert( "Prendas registradas: " + prendasEnInventario + "\nInventario lleno" );
            }
            else {
                prendasAregistrar = parseInt( prompt( "Espacio disponible inventario: " + espacioEnInventario + "\nIngrese numero de prendas a registrar:" ) );
                while ( prendasAregistrar != 'esc' && prendasAregistrar != 'ESC' ) {
                    if ( isNaN (prendasAregistrar) ) {
                        alert( "Formato invalido!\n' " +  prendasAregistrar + " '" );
                    }
                    else {
                        break;
                    }
                    prendasAregistrar = parseInt(prompt( "Ingrese NUEVAMENTE numero de prendas a registrar:" ));
                }
                prendasEnInventario += prendasAregistrar;
                if ( prendasAregistrar > espacioEnInventario ){
                    prendasEnInventario -= prendasAregistrar;
                    alert( "Prendas a registar (" + prendasAregistrar + ") supera espacio en invetario (" + espacioEnInventario + ")" );
                }
                else {
                    
                    for ( var registro = 1; registro <= prendasAregistrar; registro++ ) { 
                        idPrenda ++;
                        registroPrenda(idPrenda, registro);
                        espacioEnInventario--;
                    }
                }
            }
            break;
        case 'esc':
        case 'ESC':
        case '3':
            menu = 'n'
            break;
        default:
            menu = prompt( "Entrada invalida, reiniciar menú? [s/n/esc]: " );
    }
}
alert( "Inventario fuera!" );
