// Contador firmas
var cu = new counterUp({
  start: 0,
  duration: 1000,
  intvalues: true,
  interval: 10,
});
// Iniciador contador
function startCounter(entry) {
  if (entry.target == contadorContainer) {
    cu.start();
  }
}


// Variables DOM
const preFade = document.querySelectorAll('.pre-fade')
const contadorContainer = document.querySelector('.s4-contador-container');
const intro = document.querySelector('.intro');
const header = document.querySelector('#header');
const logo = document.querySelector('#logo');
const btnOpenMenu = document.querySelector('.btn-open-menu');
const btnCloseMenu = document.querySelector('.btn-close-menu');
const menuOverlay = document.querySelector('.menu-overlay');
const menuLinks = document.querySelectorAll('.menu-link');

const introLinea = document.querySelector('#intro-linea');
const introContent = document.querySelector('#intro-content');
const lineas = document.querySelectorAll('.section-linea');
const titulos = document.querySelectorAll('.section-title');

const path = document.querySelector('#s5-path');
var pathLength;


//Animaciones Lottie
var animLineaIntro = lottie.loadAnimation({
  container: introLinea,
  renderer: 'svg',
  loop: true,
  autoplay: false,
  path: 'js/json/linea_intro.json'
})


// Options Intersection Observer
const optionsFade = {
  root: null,
  threshold: 0.2,
  rootMargin: '0px'
}
const optionsHeader = {
  rootMargin: '-50px'
};


// Header
// Cuando la seccion intro isIntersecting, oculta el fondo del header
// Si no, muestra el fondo del header
const observerHeader = new IntersectionObserver((entries, observerHeader) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      logo.style.display = 'none';
      header.classList.remove('header-scrolled');
    } else {
      logo.style.display = 'block';
      header.classList.add('header-scrolled')
    }
  })
}, optionsHeader);
observerHeader.observe(intro);


// Fade elements
// Añade efecto fade a los elementos, con un timeout
const observerFade = new IntersectionObserver((entries, observerFade) => {
  entries.forEach(function (entry, i) {
    if (!entry.isIntersecting) {
      return;
    } else {
      setTimeout(() => {
        entry.target.classList.add('fade');
        entry.target.classList.remove('pre-fade');
        observerFade.unobserve(entry.target);
        startCounter(entry); // Disparamos el contador
      }, 200 * i);
    }
  });
}, optionsFade);
preFade.forEach(elem => {
  observerFade.observe(elem);
});


// Menu
menuLinks.forEach(item => {
  item.addEventListener('click', function () {
    menuOverlay.classList.remove('desplegar-menu');
    btnOpenMenu.classList.remove('d-none');
    btnCloseMenu.classList.remove('d-block');
    btnCloseMenu.classList.add('d-none');
  })
});
btnOpenMenu.addEventListener('click', function (e) {
  e.preventDefault();
  menuOverlay.classList.add('desplegar-menu');
  btnOpenMenu.classList.add('d-none');
  btnCloseMenu.classList.add('d-block');
});
btnCloseMenu.addEventListener('click', function (e) {
  e.preventDefault();
  menuOverlay.classList.remove('desplegar-menu');
  btnOpenMenu.classList.remove('d-none');
  btnCloseMenu.classList.remove('d-block');
});


// Animacion linea intro
introContent.addEventListener('mouseover', function () {
  animLineaIntro.setSpeed(1.5)
  animLineaIntro.setDirection(-1);
  animLineaIntro.play();
})
introContent.addEventListener('mouseleave', function () {
  animLineaIntro.pause();
})
// Animacion linea section
for (var i = 0; i < titulos.length; i++) {
  var pathLinea = `js/json/linea_s${i}.json`;
  (function (indice, pathLinea) {
    var animLineaS1 = lottie.loadAnimation({
      container: lineas[indice],
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: pathLinea
    });
    titulos[i].addEventListener('mouseover', function () {
      animLineaS1.setSpeed(1.5)
      animLineaS1.setDirection(-1);
      animLineaS1.play();
    });
    titulos[i].addEventListener('mouseleave', function () {
      animLineaS1.pause();
    });
  }(i, pathLinea));
};


// Animacion linea s5
// Longitud del path
pathLength = path.getTotalLength();
// Ocultamos el path dando offset a los guiones
// Hacemos guiones tan largos como la longitd del path
path.style.strokeDasharray = pathLength + ' ' + pathLength;

// Damos offset a los guiones para que aparezcan ocultos
path.style.strokeDashoffset = pathLength;

//Cuando hacemos scroll
window.addEventListener('scroll', function () {
  // Obtenemos el % de scroll del total de la pagina
  var scrollPercent =
    (document.documentElement.scrollTop + document.body.scrollTop) /
    (document.documentElement.scrollHeight - document.documentElement.clientHeight);

  // Longitud de offset para los guiones
  var drawLength = pathLength * scrollPercent / 0.19;
  // Pintamos en reverse
  path.style.strokeDashoffset = pathLength - drawLength;
})
