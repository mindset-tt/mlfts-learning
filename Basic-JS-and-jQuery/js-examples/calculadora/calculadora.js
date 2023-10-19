console.log("Ejecutando JS...");

display = document.getElementById("display");
igual = document.getElementById("igual");
reset = document.getElementById("reset");
borrar = document.getElementById("borrar");
coma = document.getElementById("coma");
//me crea un array con todos los digitos
let digitos = document.getElementsByClassName("valor");
//me crea un array con todos los operadores
let operacion = document.getElementsByClassName("operacion");

//--Estados de la calculadora
const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2_INIT: 3,
  OP2: 4
};

//-- Variable de ESTADO
let estado = ESTADO.INIT;

//--hace un bucle que va leyendo cada digito que se pulsa
for(i=0; i<digitos.length; i++){
  digitos[i].onclick=(ev)=>{
   digito(ev.target.value);
   console.log(`ESTADO ${estado}`);
  }
}

//--hace un bucle que va leyendo cada operacion que se pulsa
for(i=0; i<operacion.length; i++){
  operacion[i].onclick=(ev)=>{
    operaciones(ev.target.value);
    console.log(`ESTADO ${estado}`);
  }
}

//-- Poner una coma
coma.onclick = () => {
  if(estado == ESTADO.OP1 || estado == ESTADO.OP2_INIT || estado == ESTADO.INIT){
    display.innerHTML += coma.innerHTML;
    estado = ESTADO.OPERATION;
    console.log(`ESTADO ${estado}`);
  }
}

//-- Evaluar la expresion
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
  sonido.play();
}

//-- Poner a cero la expresion
reset.onclick = () => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
  console.log(`ESTADO ${estado}`);
  sonido.play();
}

//-- Borrar el ultimo valor
borrar.onclick = () => {
  if((display.innerHTML == '0')||(display.innerHTML == '')){
    display.innerHTML = '0';
  }else {
    display.innerHTML = display.innerHTML.slice(0,-1);
  }
  sonido.play();
}

//-- Comprobacion de estado de los digitos
function digito(boton){
  //-- Segun el estado hacemos una cosa u otra
  if(estado == ESTADO.INIT){
    display.innerHTML = boton;
    estado = ESTADO.OP1;
  }else if (estado == ESTADO.OP1){
    display.innerHTML += boton;
  } else if (estado == ESTADO.OPERATION) {
    display.innerHTML += boton;
    estado = ESTADO.OP2_INIT;
  }else if (estado == ESTADO.OP2_INIT) {
    display.innerHTML +=  boton;
    estado = ESTADO.OP2;
  }else if (estado == ESTADO.OP2){
    display.innerHTML += boton;
  }
  sonido.play();
}

//-- Comprobacion de estado de las operaciones
function operaciones(operacion){
  //-- Segun el estado hacemos una cosa u otra
  if (estado != ESTADO.OPERATION) {
    display.innerHTML += operacion;
    estado = ESTADO.OPERATION;
  }
  sonido.play();
}
