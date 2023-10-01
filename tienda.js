document.addEventListener("DOMContentLoaded", function () {
  const productos = [
    { id: 1, nombre: "Cookies con avena y chispas de chocolate", precio: 85, cantidad: 1000 },
    { id: 2, nombre: "Crema de maní", precio: 180, cantidad: 1000 },
    { id: 3, nombre: "Turron de semillas", precio: 35, cantidad: 1000 },
    { id: 4, nombre: "Granola", precio: 180, cantidad: 1000 },
    { id: 5, nombre: "Barras de cereales con pasas", precio: 60, cantidad: 1000 }
  ];

  let carritoArr = [];

  if (localStorage.getItem('carrito')) {
    carritoArr = JSON.parse(localStorage.getItem('carrito'));
  }

  function agregarACarrito(id, cantidad) {
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
    const carritoMenu = document.getElementById("carritoMenu");  // Selecciona el elemento con el id carritoMenu
    carritoMenu.innerHTML = "";
  
    carritoArr.forEach((producto) => {
      const li = document.createElement("li");
      li.textContent = `${producto.nombre} x ${producto.cantidad} $${producto.precio * producto.cantidad}`;
  
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.classList.add("btn", "btn-info", "btn-sm", "eliminar-btn");
      botonEliminar.addEventListener("click", () => {
        eliminarDelCarrito(producto.id);
        verCarrito();
        actualizarIconoCarrito();
        actualizarTotalCarrito();
        localStorage.setItem('carrito', JSON.stringify(carritoArr));
      
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: 'Producto eliminado del carrito'
        })
      });

  
      li.appendChild(botonEliminar);
      carritoMenu.appendChild(li);
    });
  
    const botonPagar = document.createElement("button");
    botonPagar.textContent = "Pagar";
    botonPagar.classList.add("btn", "btn-success", "pagar-btn");
    botonPagar.addEventListener("click", () => {
  
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Pago exitoso'
      })
      carritoArr.length = 0;
      verCarrito();
      actualizarIconoCarrito();
      actualizarTotalCarrito();
      localStorage.setItem('carrito', JSON.stringify(carritoArr));
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

  function mostrarMensaje(mensaje, tipo) {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Producto agregado al carrito'
    })
  }

  const botonesComprar = document.querySelectorAll('.boton');

  botonesComprar.forEach((boton) => {
    boton.addEventListener('click', function () {
      const productId = parseInt(boton.getAttribute('data-product-id'));
      const cantidadInput = document.getElementById(`cantidadProducto${productId}`);
      const cantidad = parseInt(cantidadInput.value);
      if (cantidad > 0) {
        agregarACarrito(productId, cantidad);
        verCarrito();
        actualizarIconoCarrito();
        actualizarTotalCarrito();
        localStorage.setItem('carrito', JSON.stringify(carritoArr));
        const mensajeExito = document.getElementById(`mensajeExito${productId}`);
        mensajeExito.textContent = `Se agregaron ${cantidad} ${productos[productId - 1].nombre}(s) al carrito.`;
        mensajeExito.style.display = 'block';
        mostrarMensaje(`Se agregaron ${cantidad} ${productos[productId - 1].nombre}(s) al carrito.`, 'success');
        setTimeout(() => {
          mensajeExito.style.display = 'none';
        }, 4000);
      } else {
        mostrarMensaje("La cantidad a comprar debe ser mayor a 0. Inténtelo nuevamente.", 'error');
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