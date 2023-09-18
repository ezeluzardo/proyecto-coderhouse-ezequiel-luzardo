
document.addEventListener("DOMContentLoaded", function () {
  const productos = [
    { id: 1, nombre: "Pasta de maní", precio: 1000, cantidad: 10 },
    { id: 2, nombre: "Cookies con avena y chispas de chocolate", precio: 2000, cantidad: 10 },
    { id: 3, nombre: "Turron de semillas", precio: 2000, cantidad: 10 },
    { id: 4, nombre: "Granola", precio: 2000, cantidad: 10 },
    { id: 5, nombre: "Barras de cereales con pasas", precio: 2000, cantidad: 10 }
  ];

  let carritoArr = [];

  if (localStorage.getItem('carrito')) {
    carritoArr = JSON.parse(localStorage.getItem('carrito'));
  }

  function agregarACarrito(id, cantidad) {
    // Resto 1 al id porque los índices en el array de productos comienzan en 0
    const productoExistente = carritoArr.find(producto => producto.id === id);

    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      const producto = { ...productos[id - 1], cantidad };
      carritoArr.push(producto);
    }
  }

  function eliminarDelCarrito(id) {
    const index = carritoArr.findIndex(producto => producto.id === id);
    if (index !== -1) {
      carritoArr.splice(index, 1);
    }
  }

  function calcularTotalCarrito() {
    return carritoArr.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  }

  function verCarrito() {
    const carritoMenu = document.getElementById("carritoMenu");
    carritoMenu.innerHTML = ""; 

    carritoArr.forEach((producto) => {
      const li = document.createElement("li");
      li.textContent = `${producto.nombre} x ${producto.cantidad} $${producto.precio * producto.cantidad}`;

      // Agregar un botón de eliminar
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.classList.add("btn", "btn-info", "btn-sm");
      botonEliminar.addEventListener("click", () => {
        eliminarDelCarrito(producto.id);
        verCarrito();
        actualizarIconoCarrito();
        actualizarTotalCarrito(); // total del carrito al eliminar un producto
        localStorage.setItem('carrito', JSON.stringify(carritoArr)); // Guardar en Local Storage
      });

      li.appendChild(botonEliminar);
      carritoMenu.appendChild(li);
    });

    //  total del carrito
    const totalCarrito = document.createElement("li");
    totalCarrito.textContent = `Total: $${calcularTotalCarrito()}`;
    carritoMenu.appendChild(totalCarrito);

    //  botón para pagar
    const botonPagar = document.createElement("button");
    botonPagar.textContent = "Pagar";
    botonPagar.classList.add("btn", "btn-success");
    botonPagar.addEventListener("click", () => {
      alert("¡Pago exitoso!");
      carritoArr.length = 0; // Vaciar el carrito después de pagar
      verCarrito();
      actualizarIconoCarrito();
      actualizarTotalCarrito();
      localStorage.setItem('carrito', JSON.stringify(carritoArr)); // Vaciar el Local Storage
    });
    carritoMenu.appendChild(botonPagar);
  }

  function actualizarTotalCarrito() {
    const totalCarrito = document.querySelector("#carritoTotal");
    totalCarrito.textContent = `Total: $${calcularTotalCarrito()}`;
  }

  function actualizarIconoCarrito() {
    const iconoCarrito = document.getElementById("carritoDropdown");
    const cantidadTotal = carritoArr.reduce((total, producto) => total + producto.cantidad, 0);
    iconoCarrito.innerHTML = `<i class="fas fa-shopping-cart"></i> (${cantidadTotal})`;
  }

  const botonesComprar = document.querySelectorAll('.boton');

  botonesComprar.forEach((boton) => {
    boton.addEventListener('click', function () {
      const productId = parseInt(boton.getAttribute('data-product-id'));
      const cantidad = parseInt(prompt(`Ingrese la cantidad que desea comprar del producto ${productos[productId - 1].nombre}:`));
      if (cantidad > 0) {
        agregarACarrito(productId, cantidad);
        verCarrito();
        actualizarIconoCarrito(); // Actualiza el ícono del carrito
        actualizarTotalCarrito();
        localStorage.setItem('carrito', JSON.stringify(carritoArr)); // Guardar en Local Storage
      } else {
        alert("La cantidad a comprar debe ser mayor a 0. Inténtelo nuevamente.");
      }
    });
  });

  const irInicioBtn = document.querySelector('.irinicio');
  irInicioBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo(0, 0);
  });

  // Llamar a verCarrito para cargar el contenido desde el Local Storage al cargar la página
  verCarrito();
  actualizarIconoCarrito();
  actualizarTotalCarrito();
});
