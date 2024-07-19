// Variables diferentes según sea el caso

let total = 0;
let cantidadProductos = 0;
const lapiz = 5;
const lapicera = 10;
const goma = 15;
const regla = 20;
const fibron = 25;


// Función para inicializar la cotización

function iniciarCotizacion() {


    // Bucle para cotizar los productos hasta que el usuario lo requiera

    let continuar = ("si")

    while (continuar !== "no") {
        let elegirProducto = prompt("Por favor ingresá el número del producto que querés cotizar: \n 1. Lapiz \n 2. Lapicera \n 3. Goma  \n 4. Regla \n 5. Fibron");

        if (elegirProducto === "1") {
            alert("Genial, ingresaste el producto Lapiz. Su costo es: $" + lapiz);
            total = total + lapiz;
            cantidadProductos = cantidadProductos + 1;

        } else if (elegirProducto === "2") {
            alert("Genial, ingresaste el producto Lapicera. Su costo es: $" + lapicera);
            total = total + lapicera;
            cantidadProductos = cantidadProductos + 1;

        } else if (elegirProducto === "3") {
            alert("Genial, ingresaste el producto Goma de Borrar. Su costo es: $" + goma);
            total = total + goma;
            cantidadProductos = cantidadProductos + 1;

        } else if (elegirProducto === "4") {
            alert("Genial, ingresaste el producto Regla. Su costo es: $" + regla);
            total = total + regla;
            cantidadProductos = cantidadProductos + 1;

        } else if (elegirProducto === "5") {
            alert("Genial, ingresaste el producto Fibron. Su costo es: $" + fibron);
            total = total + fibron;
            cantidadProductos = cantidadProductos + 1;

        } else {
            alert("El número ingresado es incorrecto.");
        }

        continuar = seguirComprando()
    }


    // Función para seguir cotizando

    function seguirComprando() {
        let respuesta = prompt("¿Deseas seguir cotizando otro producto? Escribí 'si' o 'no' según sea el caso.");
        return respuesta.toLowerCase();
    }


    // Mostrar el total y la cantidad de productos cotizados

    alert("La cotización es de un total de $" + total + " pesos con una cantidad de " + cantidadProductos + " productos.");


    // Finalización de la compra

    let realizarCompra = prompt("¿Desea realizar finalmente la compra? Responda 'si' o 'no' según lo que prefiera.")

    if (realizarCompra.toLowerCase() == "si") {
        alert("¡Muchas gracias por tu compra! Esperamos hayas encontrado lo que buscabas.")
    }

    else { alert("Nos da pena tener que despedirte. Trataremos de mejorar en nuestros precios para que puedas volver.") }
}

iniciarCotizacion()