// PE 1
// variables
// contantes 
// condicional
// ciclos 
// funciones


//Invetario de ropa




let prenda = prompt("Ingrese TIPO de prenda:");
let prendaColor = prompt("Ingrese COLOR de " + prenda + ":");
let prendaTalla = prompt("Ingrese TALLA de " + prenda + ":");
let prendaPrecio = prompt("Ingrese PRECIO de " + prenda + ":");
while (prendaPrecio != 'esc' && prendaPrecio != 'ESC') {
    parseFloat(prendaPrecio);
    if (isNaN(prendaPrecio)) {
        alert("Formato de \"Precio\" incorrecto \n ' " +  prendaPrecio + " '");
    }
    else {
        break;
    }
    prendaPrecio = prompt("Ingrese  OTRA VEZ PRECIO de " + prenda + " o \"esc\":");
}
if (prendaPrecio == 'esc' || prendaPrecio == 'ESC') {
    parseFloat(prendaPrecio = 0.0);
}






console.log("#### Prenda 1 ####");
console.log("Prenda: " + prenda);
console.log("Color: " + prendaColor);
console.log("Talla: " + prendaTalla);
console.log("Precio: $ " + prendaPrecio);


