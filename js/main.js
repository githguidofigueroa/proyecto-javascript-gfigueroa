window.onload = function () {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://worldtimeapi.org/api/ip`)
            .then(response => response.json())
            .then(data => {
                let datetime = new Date(data.datetime);
                let timeDiv = document.getElementById('time-display');
                if (!timeDiv) {
                    timeDiv = document.createElement('div');
                    timeDiv.id = 'time-display';
                    document.querySelector('header').insertAdjacentElement('afterend', timeDiv);
                }

                function updateClock() {
                    datetime.setSeconds(datetime.getSeconds() + 1);
                    const hours = datetime.getHours();
                    const minutes = datetime.getMinutes().toString().padStart(2, '0');
                    const ampm = hours >= 12 ? 'pm' : 'am';
                    const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;
                    timeDiv.innerHTML = `
                        ${formattedTime}
                        <i class="far fa-clock" style="margin-left: 8px;"></i>
                    `;
                }
                updateClock();
                setInterval(updateClock, 1000);
            })
    });

    function getGMTOffset(lat, lon) {
        const offset = Math.round(lon / 15);
        return offset >= 0 ? `+${offset}` : `${offset}`;
    }
};

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarProductos(productos) {
    const contenedorProductos = document.querySelector('#contenedor-productos');

    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');

        productoElement.innerHTML = `
            <img src="${producto.img}" alt="${producto.titulo}">
            <h2>${producto.titulo}</h2>
            <p>${producto.info}</p>
            <p>Precio: $${producto.precio}</p>
        `;

        contenedorProductos.appendChild(productoElement);
    });
}

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const listaProductos = document.querySelector("#lista-productos");
const carritoTotal = document.querySelector("#carrito-total");
const carritoProductos = document.querySelector('#carrito-productos')
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const realizarCompra = document.querySelector("realizar-compra");

const productos = fetch('./js/api/productos.json').then(res => res.json()).then(productos =>
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
        div.append(button);
        listaProductos.append(div);
        button.addEventListener("click", () => {
            agregarAlCarrito(producto);
        })
        div.append(button);
        listaProductos.append(div);
    }));

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
            Swal.fire({
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
        if (carrito.length > 0) {
            Swal.fire({
                title: "Compra realizada con éxito, <br>¡muchas gracias por visitar nuestra tienda!",
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        } else {
            Swal.fire({
                title: "No ha seleccionado ningun producto.",
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    });

    const form = document.querySelector('#formulario-contacto')

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        Swal.fire({
            title: "Formulario enviado con éxito",
            icon: 'success',
        });

        const nombre = document.getElementById("nombre-usuario").value;
        const correo = document.getElementById("correo-usuario").value;
        const telefono = document.getElementById("telefono-usuario").value;
        const mensaje = document.getElementById("mensaje-usuario").value;

        form.reset();
    })
});