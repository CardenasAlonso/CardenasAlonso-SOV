const div = document.querySelector(".ods11"),
texto = "Juntos, creeamos ciudades que inspiren, donde cada persona tenga un lugar  y la sostenibilidad sea el legado que dejamos para las generaciones futuras.";

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
    'titlee', 'sec1', 'ods11', 'proyectos-exitosos', 
    'relacion', 'ayudar?', 'tabla'
  ];
  
  // Observar cada uno de los elementos
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      observer.observe(section);
    }
  });
  