let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = [
    {
        id: "escritorio-minimalista",
        titulo: "Escritorio Minimalista",
        img: "./img/escritorio-minimalista.jpg",
        precio: 100000,
        info: "Escritorios con un diseño sencillo y moderno, ideales para crear un ambiente ordenado."
    },

    {
        id: "silla-ergonomica",
        titulo: "Silla Ergonómica",
        img: "./img/silla-ergonomica.jpg",
        precio: 60000,
        info: "Sillas que combinan confort y diseño elegante, perfectas para una oficina moderna."
    },

    {
        id: "mueble-organizador",
        titulo: "Mueble Organizador",
        img: "./img/mueble-organizador.jpg",
        precio: 10000,
        info: "Optimiza tu espacio con este mueble organizador de diseño minimalista, ideal para mantener la oficina ordenada y fomentar un ambiente de calma."
    },

    {
        id: "lampara-de-escritorio",
        titulo: "Lámpara de Escritorio",
        img: "./img/lampara-escritorio.jpg",
        precio: 15000,
        info: "Lámparas con un diseño moderno que proporcionan una buena iluminación y añaden un toque estilizado al espacio."
    },

    {
        id: "archivadores-elegantes",
        titulo: "Archivador Elegante",
        img: "./img/archivador-elegante.jpg",
        precio: 5000,
        info: "Archivadores con un diseño moderno y ordenado para mantener los documentos bien organizados y accesibles."
    },

    {
        id: "soporte-para-laptop",
        titulo: "Soporte para Laptop",
        img: "./img/soporte-laptop.jpg",
        precio: 20000,
        info: "Soportes ajustables para laptops que permiten una mejor ergonomía y ayudan a mantener el área de trabajo ordenada y despejada."
    }
]


const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const listaProductos = document.querySelector("#lista-productos");
const carritoTotal = document.querySelector("#carrito-total");
const carritoProductos = document.querySelector('#carrito-productos')
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const realizarCompra = document.querySelector("realizar-compra");

productos.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
    <img class="producto-img" src="${producto.img}" alt="">
    <h3 class="producto-titulo" >${producto.titulo} </h3>
    <p class="producto-precio">$${producto.precio.toLocaleString('es-AR')} </p>
    <p class="producto-info">${producto.info} </p>
    `;

    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.innerText = "Agregar al Carrito";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })

    div.append(button);
    listaProductos.append(div);
});

const agregarAlCarrito = (producto) => {
    let productoEnCarrito = carrito.find((item) => item.id === producto.id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    Swal.fire({
        title: producto.titulo + " <br>¡agregado con éxito!",
        icon: 'success',
        confirmButtonText: 'Continuar'
    })

    actualizarCarrito()
}

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
        vaciarCarrito.classList.add("d-none");
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        vaciarCarrito.classList.remove("d-none");
    }

    carritoProductos.innerHTML = "";
    carrito.forEach((producto) => {
        console.log(producto)
        let div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
        <div class="d-flex">
            <h3 class="me-5">${producto.titulo}</h3>
            <button class="carrito-producto-btn">❌</button>
        </div>
        <div>
            <p>Precio: $${producto.precio.toLocaleString('es-AR')}</p>
            <p>Cantidad: ${producto.cantidad}</p>
        </div>
        `;

        const button = div.querySelector(".carrito-producto-btn");

        button.addEventListener("click", () => {
            borrarDelCarrito(producto);
        })

        carritoProductos.append(div);
    })
    actualizarTotal();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function borrarDelCarrito(producto) {
    const indice = carrito.findIndex((item) => item.id === producto.id)
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = "$" + total.toLocaleString('es-AR');
}

vaciarCarrito.addEventListener("click", () => {
    Swal.fire({
        title: "¿Seguro de vaciar el carrito?",
        text: "Se borrarán todos los productos agregados.",
        icon: "question",
        showDenyButton: true,
        denyButtonText: "No",
        confirmButtonText: "Sí"

    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0;
            actualizarCarrito();
        Swal.fire ({
            icon: "success",
            title: "Carrito Vacío",
            showConfirmButton: false,
            timer: 1500,
        });
        }
    })
})

document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito()

    const realizarCompra = document.querySelector("#realizar-compra");
    
    realizarCompra.addEventListener("click", () => {
        if(carrito.length > 0){
            Swal.fire({
                title:"Compra realizada con éxito, <br>¡muchas gracias por visitar nuestra tienda!",
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } else {
            Swal.fire({
                title:"No ha seleccionado ningun producto.",
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });

    const form = document.querySelector('#formulario-contacto')
    
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
        Swal.fire({
            title:"Formulario enviado con éxito",
            icon: 'success',
        });

        const nombre = document.getElementById("nombre-usuario").value;
        const correo = document.getElementById("correo-usuario").value;
        const telefono = document.getElementById("telefono-usuario").value;
        const mensaje = document.getElementById("mensaje-usuario").value;

        console.log(`Nombre: ${nombre}, Correo: ${correo}, Teléfono: ${telefono}, Mensaje: ${mensaje}`);

        form.reset();
    })

});
