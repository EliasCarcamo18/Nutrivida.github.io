const datosChile = {
    "Araucania": ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"],
    "Biobio": ["Concepción", "Talcahuano", "Los Ángeles"],
    "Metropolitana": ["Santiago", "Providencia", "Las Condes", "Maipú"]
};

document.addEventListener("DOMContentLoaded", function() {
    let selectRegion = document.getElementById("region");
    let selectComuna = document.getElementById("comuna");
    
    if (selectRegion && selectComuna) {
        // Cargar regiones
        for (let region in datosChile) {
            let option = document.createElement("option");
            option.value = region;
            option.textContent = region;
            selectRegion.appendChild(option);
        }
        
        // Evento cambio de region
        selectRegion.addEventListener("change", function() {
            selectComuna.innerHTML = '<option value="">Seleccione Comuna</option>';
            let regionSeleccionada = this.value;
            
            if (regionSeleccionada && datosChile[regionSeleccionada]) {
                datosChile[regionSeleccionada].forEach(function(comuna) {
                    let option = document.createElement("option");
                    option.value = comuna;
                    option.textContent = comuna;
                    selectComuna.appendChild(option);
                });
            }
        });
    }
});

