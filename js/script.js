//! Productos del E-commerce "Office Calm":
const productos = [
    {
        id: "padMouse",
        nombre: "Pad Mouse",
        precio: "5000", // Precio como string sin puntos ni comas
        descripcion: "Full Confort es un Pad Mouse que te facilita el movimiento de la muñeca y te brinda mucha comodidad y precisión al utilizar el mouse."
    },
    {
        id: "portaCelular",
        nombre: "Porta Celular",
        precio: "7000", // Precio como string sin puntos ni comas
        descripcion: "Modern es nuestro innovador porta celular donde obtendrás fácilmente su accesibilidad mientras realizas diferentes actividades."
    },
];

// Función para convertir precios a números dentro del array de productos
function convertirPrecios() {
    productos.forEach(producto => {
        producto.precio = parseFloat(producto.precio);
    });
}

// Función para obtener y validar entradas del usuario
function obtenerEntrada(mensaje, opcionesValidas = []) {
    let entrada;
    do {
        entrada = prompt(mensaje).trim().toLowerCase();
        if (entrada === "") {
            alert("Por favor ingrese una respuesta.");
        } else if (opcionesValidas.length && !opcionesValidas.includes(entrada)) {
            alert(`Por favor ingrese una opción válida: ${opcionesValidas.join(' o ')}.`);
        }
    } while (entrada === "" || (opcionesValidas.length && !opcionesValidas.includes(entrada)));
    return entrada;
}

// Convertir los precios a números
convertirPrecios();

//! Variable para agregar el producto al carrito de compras, o para borrar también o mostrar en pantalla
const carritoDeCompras = [];

//! Crear un objeto de mapeo para los nombres de los productos
const buscaNombres = {};
productos.forEach(producto => {
    buscaNombres[producto.nombre.toLowerCase()] = producto.nombre;
});

//! Saludo y bienvenida
alert("¡Bienvenido, bienvenida a Office Calm!");

// Obtener el nombre del usuario
const nombreUsuario = obtenerEntrada("¿Cuál es tu nombre?");

// Preguntar si el usuario quiere recorrer la página o conocer los productos
const opcionUsuario = obtenerEntrada(
    `Hola ${nombreUsuario}, ¿Qué te gustaría hacer? Escribe 'recorrer' para recorrer la página o 'conocer productos' para conocer nuestros productos.`,
    ["recorrer", "conocer productos"]
);

if (opcionUsuario === "conocer productos") {
    //! Inicializamos una cadena vacía para almacenar la lista de productos
    const listaProductos = productos.map(producto =>
        `Nombre: ${producto.nombre}\nPrecio: $${producto.precio} pesos\nDescripción: ${producto.descripcion}\n`
    ).join("\n");

    //! Mostramos el listado de productos en el alert
    alert("¡Nos alegra tu interés!\nNuestros productos son:\n\n" + listaProductos);

    // Preguntar si el usuario desea conocer el precio de algún producto
    const conocerPrecio = obtenerEntrada("¿Desea conocer el precio de algún producto? (si/no)", ["si", "no"]);

    if (conocerPrecio === "si") {
        let nombreProducto;
        let productoEncontrado;

        // Solicitar el nombre del producto hasta que se ingrese un nombre válido
        do {
            nombreProducto = prompt("Por favor, indique el nombre del producto:").trim().toLowerCase();
            const nombreOriginal = buscaNombres[nombreProducto];
            productoEncontrado = productos.find(producto => producto.nombre === nombreOriginal);

            if (!productoEncontrado) {
                alert("Producto no encontrado. Por favor ingrese un nombre de producto válido.");
            }
        } while (!productoEncontrado);

        // Mostrar el precio del producto si fue encontrado
        if (productoEncontrado) {
            // Obtener la fecha y hora actuales
            const fechaActual = new Date();
            const fecha = fechaActual.toLocaleDateString('es-AR'); // Formato de fecha
            const hora = fechaActual.toLocaleTimeString('es-AR'); // Formato de hora
            alert(`El precio del producto ${productoEncontrado.nombre} es de $${productoEncontrado.precio} pesos. El precio es cotizado el día ${fecha}, a las ${hora} hs.`);

            // Preguntar si desea agregar el producto al carrito
            const agregarProducto = obtenerEntrada("¿Desea agregar el producto al carrito? (si/no)", ["si", "no"]);

            if (agregarProducto === "si") {
                carritoDeCompras.push(productoEncontrado);
                alert("Producto agregado al carrito.");
            } else {
                alert("El producto no fue agregado al carrito. ¡Que tengas un buen día!");
            }
        }
    } else {
        alert("Lamentamos que no estés interesado. ¡Que tengas un buen día!");
    }
} else {
    alert("Perfecto, puedes recorrer nuestro sitio, ¡bienvenido a nuestra tienda, bienvenido al confort que tu oficina necesita!");
}

//! Calcular el precio total de todos los productos
const precios = productos.map(producto => producto.precio);
const precioTotal = precios.reduce((total, precio) => total + precio, 0);

//! Mostrar el precio total en la consola
console.log("El precio total de todos los productos es: $" + precioTotal + " pesos");
