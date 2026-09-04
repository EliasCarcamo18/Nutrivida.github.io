document.addEventListener("DOMContentLoaded", function() {
    renderizarCarrito();
});

function renderizarCarrito() {
    let tabla = document.getElementById("tabla-carrito");
    let totalElemento = document.getElementById("total-reserva");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    if (!tabla) return;
    
    tabla.innerHTML = "";
    let total = 0;
    
    carrito.forEach((item, index) => {
        total += item.precio;
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>$${item.precio.toLocaleString("es-CL")}</td>
            <td><button class="btn btn-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button></td>
        `;
        tabla.appendChild(fila);
    });
    
    if (totalElemento) {
        totalElemento.textContent = `$${total.toLocaleString("es-CL")}`;
    }
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
}

function confirmarReserva() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("No hay servicios seleccionados para agendar.");
        return;
    }
    alert("Reserva confirmada exitosamente. Se ha enviado un recordatorio.");
    localStorage.removeItem("carrito");
    renderizarCarrito();
}