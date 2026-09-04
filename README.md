# Nutrivida.github.io

# NutriVida - Sistema Web de Agendamiento y Gestion Clinica

## Descripcion del Proyecto
NutriVida es una clinica de nutricion y dietetica fundada en 2016 en la ciudad de Temuco, Region de La Araucania. La clinica esta compuesta por 4 nutricionistas que atienden un promedio de 60 pacientes por semana, enfocado en areas como control metabolico, nutricion deportiva, alimentacion vegetariana o vegana y perdida de peso.

Este proyecto consiste en el desarrollo del prototipo frontend para la clinica, adaptando un modelo de plataforma web interactiva para permitir el agendamiento de consultas nutricionales, registro de pacientes, seleccion de servicios y gestion administrativa.

## Problematica Actual
* Proceso de agendamiento totalmente manual mediante agenda de papel y atencion telefonica.
* Alta tasa de inasistencia (20%) debido a la falta de recordatorios automaticos.
* Fichas clinicas impresas en papel, dificultando el seguimiento entre sesiones y la transferencia de pacientes entre profesionales.
* Inexistencia de estadisticas digitales sobre atenciones e indicadores de rendimiento.

## Solucion Propuesta
* Plataforma web que permite a los pacientes consultar los servicios nutricionales y agendar horas en linea.
* Modulo de registro con validaciones de datos en JavaScript (RUT chileno, correo electronico, selector dinamico de region y comuna).
* Sistema de carrito adaptado a la seleccion de servicios de salud y confirmacion de reserva.
* Panel de administracion para gestionar servicios y usuarios registrados.
* Diseno semantico, accesible y adaptable a dispositivos moviles.

## Estructura del Proyecto

```text
Nutrivida.github.io/
├── admin/
│   ├── admin-home.html
│   ├── admin-producto-nuevo.html
│   ├── admin-productos.html
│   ├── admin-usuario-nuevo.html
│   └── admin-usuarios.html
├── css/
│   └── styles.css
├── js/
│   ├── carrito.js
│   ├── productos.js
│   ├── regiones.js
│   └── validaciones.js
├── index.html
├── productos.html
├── productos-detalle.html
├── carrito.html
├── contacto.html
├── login.html
├── registro.html
├── nosotros.html
├── blogs.html
├── blog-detalle.html
└── README.md