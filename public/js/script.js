function toggleMenu() {
    document.querySelector(".menu").classList.toggle("active");
  }

const div = document.querySelector(".ods"),
texto = "Los 17 Objetivos de Desarrollo Sostenible nos inspiran a crear un mundo más justo y sostenible. Desde erradicar la pobreza hasta proteger el planeta, ¡cada acción cuenta!";

function efectoTextTyping (elemento,texto,i = 0){
    elemento.textContent += texto[i];

if (i == texto.length -1) return;

    setTimeout(() => efectoTextTyping(div,texto,i + 1) ,20);
   
}
efectoTextTyping(div, texto)

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
  '', 'sec1', 'sec2', 'sec3', 
  'calendar', 'linea-t', 'boton' ,'carrusel' 
];

// Observar cada uno de los elementos
sections.forEach(id => {
  const section = document.getElementById(id);
  if (section) {
    observer.observe(section);
  }
});



async function checkCelebration() {
  try {
    const response = await fetch('/check-celebration');
    const data = await response.json();

    if (data.showMessage) {
      const messageDiv = document.getElementById('message');
      messageDiv.innerText = data.message;
      messageDiv.style.display = 'block';

      setTimeout(() => {
        messageDiv.style.display = 'none';
      }, 18000);
    }
  } catch (error) {
    console.error('Error al verificar celebraciones:', error);
  }
}

// Verificar celebraciones al cargar la página
checkCelebration();




//calendario
let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates = document.getElementById('dates');
let month = document.getElementById('month');
let year = document.getElementById('year');

let prevMonthDOM = document.getElementById('prev-month');
let nextMonthDOM = document.getElementById('next-month');

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener('click', () => lastMonth());
nextMonthDOM.addEventListener('click', () => nextMonth());

let holidays = [
  { day: 17, month: 9, name: "Día del ODS 1: Fin de la pobreza" },
  { day: 16, month: 9, name: "Día del ODS 2: Hambre cero" },
  { day: 7, month: 3, name: "Día del ODS 3: Salud y bienestar" },
  { day: 24, month: 0, name: "Día del ODS 4: Educación de calidad" },
  { day: 8, month: 2, name: "Día del ODS 5: Igualdad de género" },
  { day: 22, month: 2, name: "Día del ODS 6: Agua limpia y saneamiento" },
  { day: 22, month: 5, name: "Día del ODS 7: Energía asequible y no contaminante" },
  { day: 7, month: 9, name: "Día del ODS 8: Trabajo decente y crecimiento económico" },
  { day: 9, month: 10, name: "Día del ODS 9: Industria, innovación e infraestructura" },
  { day: 20, month: 1, name: "Día del ODS 10: Reducción de las desigualdades" },
  { day: 31, month: 9, name: "Día del ODS 11: Ciudades y comunidades sostenibles" },
  { day: 5, month: 5, name: "Día del ODS 12: Producción y consumo responsables" },
  { day: 24, month: 9, name: "Día del ODS 13: Acción por el clima" },
  { day: 8, month: 5, name: "Día del ODS 14: Vida submarina" },
  { day: 22, month: 4, name: "Día del ODS 15: Vida de ecosistemas terrestres" },
  { day: 21, month: 8, name: "Día del ODS 16: Paz, justicia e instituciones sólidas" }
];


const writeMonth = (month) => {
  dates.innerHTML = ""; // Limpiar contenido

  for (let i = startDay(); i > 0; i--) {
      dates.innerHTML += ` <div class="calendar_date calendar_item calendar_last-days">
          ${getTotalDays(monthNumber - 1) - (i - 1)}
      </div>`;
  }

  for (let i = 1; i <= getTotalDays(month); i++) {

      let isHoliday = holidays.find(holiday => holiday.day === i && holiday.month === month);

      if (i === currentDay) {
          dates.innerHTML += ` <div class="calendar_date calendar_item calendar_today">${i}</div>`;
      } else if (isHoliday) {
          dates.innerHTML += ` <div class="calendar_date calendar_item calendar__holiday" title="${isHoliday.name}">${i}</div>`;
      } else {
          dates.innerHTML += ` <div class="calendar_date calendar_item">${i}</div>`;
      }
  }
}


const getTotalDays = month => {
  if (month === -1) month = 11;

  if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
      return 31;

  } else if (month == 3 || month == 5 || month == 8 || month == 10) {
      return 30;

  } else {

      return isLeap() ? 29 : 28;
  }
}

const isLeap = () => {
  return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
}

const startDay = () => {
  let start = new Date(currentYear, monthNumber, 1);
  return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
}

const lastMonth = () => {
  if (monthNumber !== 0) {
      monthNumber--;
  } else {
      monthNumber = 11;
      currentYear--;
  }

  setNewDate();
}

const nextMonth = () => {
  if (monthNumber !== 11) {
      monthNumber++;
  } else {
      monthNumber = 0;
      currentYear++;
  }

  setNewDate();
}

const setNewDate = () => {
  currentDate.setFullYear(currentYear, monthNumber, currentDay);
  month.textContent = monthNames[monthNumber];
  year.textContent = currentYear.toString();
  dates.textContent = '';
  writeMonth(monthNumber);
}

writeMonth(monthNumber);




let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slider = document.querySelector('.slider');

function changeSlide() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Evento para el botón "anterior"
prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
    changeSlide();
});

// Evento para el botón "siguiente"
nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
    changeSlide();
});
