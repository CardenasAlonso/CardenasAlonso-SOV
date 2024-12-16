function toggleMenu() {
    document.querySelector(".menu").classList.toggle("active");
  }

const div = document.querySelector(".ods"),
texto = "Presentamos una solución innovadora que transforma la manera en que interactuamos con nuestro entorno, promoviendo un estilo de vida más sostenible y consciente.";

function efectoTextTyping (elemento,texto,i = 0){
    elemento.textContent += texto[i];

if (i == texto.length -1) return;

    setTimeout(() => efectoTextTyping(div,texto,i + 1) ,20);
   
}
efectoTextTyping(div, texto)

function scrollToTop() {
    window.scrollTo({
        top: 0,   
        behavior: 'smooth'   
    });
  }


  // Función que se ejecuta cuando el elemento es visible o sale de la vista
function onIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Cuando la sección entra en la vista, iniciar la animación
        entry.target.style.transition = "opacity 1s, transform 1s"; // Activar la transición
        entry.target.style.opacity = "1"; // Hacer visible el contenido
        entry.target.style.transform = "translateX(0)"; // Desplazar de izquierda a derecha
      } else {
        // Cuando la sección sale de la vista, reiniciar el desplazamiento
        entry.target.style.transition = "opacity 1s, transform 1s"; // Activar la transición
        entry.target.style.opacity = "0"; // Volver a hacerlo invisible
        entry.target.style.transform = "translateX(-100px)"; // Volver a la posición inicial (izquierda)
      }
    });
  }
  
  // Crear un observador de intersección
  const observer = new IntersectionObserver(onIntersection, {
    threshold: 0.2 // El 50% del elemento debe estar visible
  });
  
  // Seleccionar las secciones que deseas observar (en este caso 11 elementos con IDs específicos)
  const sections = [
    'sec1', 'producs', 'mer0', 'form', 'title_form', 'mer1', 'mer2' 
  ];  
  
  // Observar cada uno de los elementos
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      observer.observe(section);
    }
  });



//ENVIO DE FORMULARIO//
  
  // Asignamos un evento 'onsubmit' al formulario con id 'reservation-form'
  // Esto significa que la función que se asigna se ejecutará cuando el formulario sea enviado
  document.getElementById('form').onsubmit = async e => {

    // Prevenimos el comportamiento por defecto del formulario (evitar que se recargue la página)
    // 'e' es el objeto del evento, y preventDefault() evita que se ejecute la acción predeterminada del formulario
    // Esto previene que el formulario se envíe de la manera tradicional (que recargaría la página)
    e.preventDefault();

    // Enviamos los datos del formulario de manera asíncrona (sin recargar la página)
    // 'fetch' se utiliza para hacer solicitudes HTTP, y 'await' hace que el código espere la respuesta sin bloquear
    const res = await fetch('/comprar_producto', {
      method: 'POST', // Definimos el método de la solicitud HTTP como 'POST' (usamos POST porque estamos enviando datos al servidor)
      
      // Definimos los encabezados (headers) para la solicitud
      headers: { 
        'Content-Type': 'application/json' // Indicamos que el contenido que estamos enviando está en formato JSON
      },

      // Convertimos los datos del formulario en un objeto JSON
      // 'new FormData(e.target)' crea un objeto FormData que contiene los datos del formulario
      // 'Object.fromEntries()' convierte el FormData en un objeto de JavaScript
      // 'JSON.stringify()' convierte el objeto en una cadena JSON para poder enviarlo al servidor
      body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
    })
    .then(r => r.json()) // Cuando la respuesta es recibida, la convertimos de JSON a un objeto de JavaScript
    .catch(() => ({ error: 'Error' })); // Si ocurre un error en el proceso, devolvemos un objeto con un mensaje de error

    // Mostramos el mensaje de respuesta (error o éxito) en el elemento con id 'response'
    // Si el servidor ha devuelto un mensaje de error o éxito, lo mostramos en el elemento con el id 'response'
    document.getElementById('response').innerText = res.error || res.message;

    // Limpiamos el formulario (reseteamos los campos)
    // 'e.target' hace referencia al formulario que se envió. La función 'reset()' limpia todos los campos del formulario
    e.target.reset();
  };



  //VALIDACIONES DE SELECCION//

  document.getElementById('metodo_pago').addEventListener('change', function() {
    var metodoPago = this.value;
    var informacion = document.getElementById('informacion_pago');

    if (metodoPago === 'Yape') {
        informacion.innerHTML = 'Número de Yape: 903011604. Estaremos verificando Su pago en unos Momentos Despues de Haber enviado el Formulario';
    } else if (metodoPago === 'Efectivo') {
        informacion.innerHTML = 'Visite nuestra Dirección: Antigua Panamericana Sur Km 144, San Vicente de Cañete 15701';
    } else {
        informacion.innerHTML = '';
    }
});












//VALIDACIONES//

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const nombreCliente = document.getElementById("nombre_cliente");
  const correoCliente = document.getElementById("correo_cliente");
  const direccionCliente = document.getElementById("direccion_cliente");
  const metodoPago = document.getElementById("metodo_pago");
  const idProducto = document.getElementById("id");

  // Validar que el nombre solo contenga letras
  nombreCliente.addEventListener("input", () => {
    const regex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/;
    if (!regex.test(nombreCliente.value)) {
      nombreCliente.setCustomValidity("El nombre solo puede contener letras.");
    } else {
      nombreCliente.setCustomValidity("");
    }
  });

  // Hacer que "Dirección de Envío" sea requerido solo si el método de pago es "Yape"
  metodoPago.addEventListener("change", () => {
    if (metodoPago.value === "Yape") {
      direccionCliente.required = true;
    } else {
      direccionCliente.required = false;
      direccionCliente.setCustomValidity("");
    }
  });

  // Validar que el ID solo acepte 1, 2 o 3
  idProducto.addEventListener("input", () => {
    const valoresPermitidos = ["1", "2", "3"];
    if (!valoresPermitidos.includes(idProducto.value)) {
      idProducto.setCustomValidity("El ID solo puede ser 1, 2 o 3.");
    } else {
      idProducto.setCustomValidity("");
    }
  });

  // Manejar el envío del formulario
  form.addEventListener("submit", (event) => {
    // Prevenir el envío si hay errores en los campos
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      alert("Por favor, corrige los errores en el formulario.");
    }
  });
});
