const div = document.querySelector(".ods"),
texto = "Nos encontramos en Antigua Panamericana Sur Km 144, San Vicente de Cañete  un lugar accesible y cómodo para que puedas visitarnos. Si deseas saber más sobre nuestros proyectos o cómo colaborar con la ods 11, no dudes en venir. También puedes contactarnos a través de nuestros canales digitales. ¡Te esperamos!";

function efectoTextTyping (elemento,texto,i = 0){
    elemento.textContent += texto[i];

if (i == texto.length -1) return;

    setTimeout(() => efectoTextTyping(div,texto,i + 1) ,20);
   
}
efectoTextTyping(div, texto)

function toggleMenu() {
    document.querySelector(".menu").classList.toggle("active");
  }

/*funcion estatica javascript*/
function scrollToTop() {
    window.scrollTo({
        top: 0,   
        behavior: 'smooth'   
    });
  }




  document.getElementById('reservation-form').onsubmit = async e => {
    e.preventDefault();
    const res = await fetch('/consult', {
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
    })
    .then(r => r.json()) 
    .catch(() => ({ error: 'Error' })); 
    document.getElementById('response').innerText = res.error || res.message;
    e.target.reset();
  };







  

        // Seleccionar todos los elementos de preguntas frecuentes
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question'); // Pregunta
    const answer = item.querySelector('.faq-answer'); // Respuesta
    const arrow = item.querySelector('.arrow'); // Flecha

    // Agregar evento click a la pregunta
    question.addEventListener('click', () => {
        // Alternar visibilidad de la respuesta actual
        const isVisible = answer.style.display === 'block';

        // Ocultar todas las respuestas y resetear flechas
        faqItems.forEach(i => {
            i.querySelector('.faq-answer').style.display = 'none';
            i.querySelector('.arrow').style.transform = 'rotate(0deg)';
        });

        // Mostrar la respuesta actual si no estaba visible
        if (!isVisible) {
            answer.style.display = 'block'; // Mostrar la respuesta
            arrow.style.transform = 'rotate(180deg)'; // Rotar flecha
        }
    });
});





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
    'formy', 'reservation-form', 'dev', 'dev1', 'dev2', 'dev3','faq'
  ];
  
  // Observar cada uno de los elementos
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      observer.observe(section);
    }
  });
  



  


  document.addEventListener("DOMContentLoaded", () => {
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const telefonoField = document.getElementById("telefono");
    const messageField = document.getElementById("message");
  

    nameField.addEventListener("input", () => {
      const regex = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/;
      if (!regex.test(nameField.value)) {
        nameField.setCustomValidity("El nombre solo puede contener letras.");
      } else {
        nameField.setCustomValidity("");
      }
    });
  

    telefonoField.addEventListener("input", () => {
      const regex = /^[0-9]{9}$/; // Acepta solo 9 dígitos
      if (!regex.test(telefonoField.value)) {
        telefonoField.setCustomValidity("El teléfono debe tener exactamente 9 dígitos.");
      } else {
        telefonoField.setCustomValidity("");
      }
    });
  
  });
  