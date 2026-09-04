const servicios = [
    { id: 1, nombre: "Consulta Nutricion Deportiva", precio: 35000, desc: "Evaluacion para deportistas y alto rendimiento." },
    { id: 2, nombre: "Control Metabolico", precio: 30000, desc: "Tratamiento para diabetes, hipertension y colesterol." },
    { id: 3, nombre: "Plan Vegetariano / Vegano", precio: 28000, desc: "Pauta nutricional basada en plantas." }
];

document.addEventListener("DOMContentLoaded", function() {
    let contenedor = document.getElementById("lista-servicios");
    
    if (contenedor) {
        servicios.forEach(s => {
            let div = document.createElement("div");
            div.className = "tarjeta";
            div.innerHTML = `
                <h3>${s.nombre}</h3>
                <p>${s.desc}</p>
                <p><strong>Valor: $${s.precio.toLocaleString("es-CL")}</strong></p>
                <button class="btn" onclick="agregarAlCarrito(${s.id})">Reservar Hora</button>
            `;
            contenedor.appendChild(div);
        });
    }
});

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let servicio = servicios.find(s => s.id === id);
    carrito.push(servicio);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Servicio agregado a la reserva de agendamiento.");
}

