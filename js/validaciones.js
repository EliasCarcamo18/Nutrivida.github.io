// Validacion de RUT Chileno
function validarRut(rut) {
    rut = rut.replace(/\./g, '').replace('-', '');
    if (rut.length < 8) return false;
    
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    
    let suma = 0;
    let multiplo = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo.charAt(i)) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    
    let dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 11) dvEsperado = '0';
    if (dvEsperado === 10) dvEsperado = 'K';
    
    return dv.toString() === dvEsperado.toString();
}

// Validaciones de formularios
document.addEventListener("DOMContentLoaded", function() {
    let formRegistro = document.getElementById("form-registro");
    
    if (formRegistro) {
        formRegistro.addEventListener("submit", function(e) {
            e.preventDefault();
            let valido = true;
            
            // Validar Nombre
            let nombre = document.getElementById("nombre");
            let errorNombre = document.getElementById("error-nombre");
            if (nombre.value.trim() === "") {
                errorNombre.textContent = "El nombre es obligatorio.";
                valido = false;
            } else {
                errorNombre.textContent = "";
            }
            
            // Validar RUT
            let rut = document.getElementById("rut");
            let errorRut = document.getElementById("error-rut");
            if (!validarRut(rut.value)) {
                errorRut.textContent = "Ingrese un RUT valido (ej: 12345678-9).";
                valido = false;
            } else {
                errorRut.textContent = "";
            }
            
            // Validar Email
            let email = document.getElementById("email");
            let errorEmail = document.getElementById("error-email");
            let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email.value)) {
                errorEmail.textContent = "Ingrese un correo electronico valido.";
                valido = false;
            } else {
                errorEmail.textContent = "";
            }
            
            if (valido) {
                alert("Registro completado con exito.");
                formRegistro.reset();
            }
        });
    }
});