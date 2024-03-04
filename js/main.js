// Pre Entrega 1:
// variables, contantes, condicional, ciclos, funciones

// Invetario de ropa

alert("Bienvenido a 'El Inventario'");

var menu = "s";
var prendasEnInventario = 0;
var espacioEnInventario = 3;
var contadorPrendas = 0;

function registroPrenda (){
    prenda = prompt( "Ingrese TIPO de prenda:" );
    prendaColor = prompt( "Ingrese COLOR de " + prenda + ":" );
    prendaTalla = prompt( "Ingrese TALLA de " + prenda + ":" );
    prendaPrecio = prompt( "Ingrese PRECIO de " + prenda + ":" );
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
}


while ( menu == 's' || menu == 'S' ) {
    let inventario = prompt( "[ 1 - ver ] - Ver inventario \n[ 2 - reg ] - Registrar inventario \n[ 3 - esc ] - Salir" );
    switch ( inventario ) {
        case 'ver':
        case 'VER':
        case '1':
            if ( prendasEnInventario == undefined ) {
                menu = prompt( "Nada ha sido registrado aún, reiniciar menú? [s/n]: " );
            }
            else {
                alert( "Por ahora favor de ver registros en consola :D" )
            }
            break;
        case 'reg':
        case 'REG':
        case '2':
            if ( prendasEnInventario == espacioEnInventario ) {
                alert( "Prendas registradas: " + prendasEnInventario + "\nInventario lleno" );
            }
            else {
                 prendasAregistrar = parseInt( prompt( "Espacio disponible inventario: " + (espacioEnInventario - prendasEnInventario) + "\nIngrese numero de prendas a registrar:" ) );
                 while ( prendasAregistrar != 'esc' && prendasAregistrar != 'ESC' ) {
                    if ( isNaN (prendasAregistrar) ) {
                        alert( "Formato invalido!\n' " +  prendasAregistrar + " '" );
                    }
                    else {
                        break;
                    }
                    prendasAregistrar = prompt( "Ingrese NUEVAMENTE numero de prendas a registrar:" );
                }
                 parseInt( prendasEnInventario = prendasEnInventario + prendasAregistrar );
                 if ( prendasEnInventario > espacioEnInventario ){
                    prendasEnInventario = prendasEnInventario - prendasAregistrar;
                    alert( "Prendas a registar (" + prendasAregistrar + ") supera espacio en invetario (" + (espacioEnInventario - prendasEnInventario) + ")" );
                 }
                 else {
                    for ( let registro = 1; registro <= prendasAregistrar; registro += 1 ) { 
                        registroPrenda();
                        contadorPrendas += 1;
                        console.log( "# Prenda N°" + contadorPrendas );
                        console.log( "Prenda: " + prenda + "\nColor: " + prendaColor + "\nTalla: " + prendaTalla + "\nPrecio: $ " + prendaPrecio );
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
            menu = prompt( "Entrada invalida, reiniciar menú? [s/n]: " );
    }
}
alert( "Inventario fuera!" );
