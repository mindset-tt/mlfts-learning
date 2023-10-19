console.log("Ejecutando JS...");

//-- Obtener elemento de video y configurarlo
const video1 = document.getElementById("video01");
const video2 = document.getElementById("video02");
const video3 = document.getElementById("video03");
const display = document.getElementById("display");
const imagen = document.getElementById("imagen");

//-- Tamaño de la pantalla de video
video1.width = 300;
video1.height = 150;
video2.width = 300;
video2.height = 150;
video3.width = 300;
video3.height = 150;
display.width = 640;
display.height = 300;
imagen.width = 300;
imagen.height = 150;

//-- Fuentes de video
video1.src = "https://github.com/anapgh/Fuentes/raw/master/Construcci%C3%B3n/Blue.mp4";
video2.src = "https://github.com/anapgh/Fuentes/raw/master/Construcci%C3%B3n/explosion.mp4";
video3.src = "https://github.com/anapgh/Fuentes/raw/master/Construcci%C3%B3n/final.mp4";
display.poster = "https://github.com/anapgh/Fuentes/raw/master/Construcci%C3%B3n/logo.gif";
imagen.src = "https://github.com/anapgh/Fuentes/raw/master/Construcci%C3%B3n/Rex.jpg"

//-- Obtener el boton de ver
const play1 = document.getElementById("boton1");
const play2 = document.getElementById("boton2");
const play3 = document.getElementById("boton3");
const loop = document.getElementById("loop");
const noloop = document.getElementById("noloop");
const estatica = document.getElementById("boton4");

//-- Variables del bucle
var sloop = false;
const init = 10;
const finish = init + 2;

//-- Obtener boton automatico y manual
const automatico = document.getElementById("automatico");
const manual = document.getElementById("manual");
var auto = false;
var video = [video1, video2, video3];

//-- Funciones de retrollamada al display
play1.onclick = () => {
  console.log("Click Video 1!");
  display.poster = false;
  display.src = video1.src;
  display.currentTime = video1.currentTime; // Sincronizamos los videos
  video1.style.border = '5px solid orange';
  video2.style.border = '0px';
  video3.style.border = '0px';
  imagen.style.border = '0px';
};

video1.onmouseover = () => {
    video1.muted = false;
}

video1.onmouseout = () => {
  video1.muted = true;
}

play2.onclick = () => {
  console.log("Click Video 2!");
  display.poster = false;
  display.src = video2.src;
  display.currentTime = video2.currentTime; // Sincronizamos los videos
  video1.style.border = '0px';
  video2.style.border = '5px solid orange';
  video3.style.border = '0px';
  imagen.style.border = '0px';
};

video2.onmouseover = () => {
    video2.muted = false;
}

video2.onmouseout = () => {
  video2.muted = true;
}

play3.onclick = () => {
  console.log("Click Video 3!");
  display.poster = false;
  display.src = video3.src;
  display.currentTime = video3.currentTime; // Sincronizamos los videos
  video1.style.border = '0px';
  video2.style.border = '0px';
  video3.style.border = '5px solid orange';
  imagen.style.border = '0px';
};

video3.onmouseover = () => {
  video3.muted = false;
}

video3.onmouseout = () => {
  video3.muted = true;
}

estatica.onclick = () => {
  console.log("Click Imagen estatica");
  display.src = null;
  display.poster = imagen.src;
  video1.style.border = '0px';
  video2.style.border = '0px';
  video3.style.border = '0px';
  imagen.style.border = '5px solid orange';
};

loop.onclick = () => {
  console.log('Modo bucle');
  loop.style.border = '5px solid blue';
  noloop.style.border = '5px solid black';
  display.currentTime = init;
  sloop = true;
}

setInterval(()=>{
  if(sloop){
    if (display.currentTime > finish){
        display.currentTime = init;
    }
  }
},20); //-- timer

noloop.onclick = () => {
  console.log('Modo NO bucle');
  sloop = false;
  noloop.style.border = '5px solid blue';
  loop.style.border = '5px solid black';
  // Volvemos a sincronizar con las miniaturas
  if (video1.style.border == '5px solid orange'){
    display.currentTime = video1.currentTime;
  }
  if (video2.style.border == '5px solid orange'){
    display.currentTime = video2.currentTime;
  }
  if (video3.style.border == '5px solid orange'){
    display.currentTime = video3.currentTime;
  }
}
