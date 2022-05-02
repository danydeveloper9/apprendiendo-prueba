import {
    getQuizNovato,

} from "./firebase.js";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
  	actions: 'd-grid d-md-flex align-items-center justify-content-around w-100 mt-4 p-0',
    confirmButton: 'btn btn-info order-2 mt-3 mt-md-0',
    cancelButton: 'btn btn-danger order-1',
    input: 'form-select'
  },
  buttonsStyling: false
})

let quiz=[];
let noQuiz = 0;

// Seleccion de dificultad
window.onload = function() {
	let nivel;
	let ejercicios=[];


 	swalWithBootstrapButtons.fire({
	  input: 'select',
	  inputOptions: {
	    'novato': 'Novato',
	    'intermedio': 'Intermedio',
	    'avanzado': 'Avanzado'
	  },
	  inputPlaceholder: 'Selecciona una opción',
	  inputValidator: (value) => {
		return new Promise(async (resolve) => {
	      if (value) {
	        resolve()
	        nivel = document.createTextNode(value.toUpperCase());
			// if(value === "novato"){
				const querySnapshot = await getQuizNovato();
				querySnapshot.forEach(doc => {
					ejercicios.push(doc.data());
				})
				quiz = ejercicios.slice();
				quiz = quiz.sort(function() {return Math.random() - 0.5});
				quizLevelNovato(quiz);
			// }
			
	      } else {
	        resolve('Para continuar primero selecciona una opción.')
	      }
	    })
	  },
	  width: "40rem",
	  title: 'Selecciona la Dificultad',
	  confirmButtonText: `
	  Iniciar Quiz Mode!
	  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM312.3 273.6l-112 104C195.8 381.8 189.9 384 184 384c-3.25 0-6.5-.6562-9.594-2C165.7 378.2 160 369.5 160 360v-208c0-9.531 5.656-18.19 14.41-22c8.75-3.75 18.94-2.062 25.94 4.406l112 104C317.2 242.1 320 249.3 320 256S317.2 269 312.3 273.6z"/></svg>
	  `,
	  showCancelButton: true,
	  cancelButtonText: `
	  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="#FEFFFE" d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM288 360c0 9.531-5.656 18.19-14.41 22C270.5 383.3 267.3 384 264 384c-5.938 0-11.81-2.219-16.34-6.406l-112-104C130.8 269 128 262.7 128 256s2.781-13.03 7.656-17.59l112-104c7.031-6.469 17.22-8.156 25.94-4.406C282.3 133.8 288 142.5 288 152V360z"/></svg>
	  Regresar al Menú
	  `,
	  allowOutsideClick: false
	}).then((result) => {
		if(result.isConfirmed){
			const containerQuizMode = document.querySelector("#bodyQuizmode");
			containerQuizMode.classList.remove("d-none");
			document.getElementById("nivel").appendChild(nivel);

		} else {
			window.location.href = "../index.html";
		}
	})
};


// Sustituyendo opciones en el ejercicio
// let opcs = document.querySelectorAll('input[type="radio"]');
// opcs.forEach(opc => {
//   const ejercicioPalabra = document.querySelector("#ejercicioPalabra").textContent;
//   opc.addEventListener('click', () => {	
//   	document.querySelector("#ejercicioPalabra").textContent = ejercicioPalabra.replace("_", opc.value);
//   });
// });


document.querySelector("#comprobarRespuesta").addEventListener("click", comprobarRespuesta, false);


function comprobarRespuesta(){
	let opcs = document.querySelectorAll('input[type="radio"]:checked');
	opcs.forEach(opc => {
	  console.log(opc.value)
	  if(opc.value === quiz[noQuiz].opcionCorrecta){
		respuestaCorrecta();
		  console.log("Respuesta Correcta")
	  }else{
		respuestaIncorrecta();
		  console.log("Respuesta Incorrecta")
	  }
	});
	console.log(quiz)
}

function respuestaCorrecta () {
	swalWithBootstrapButtons.fire({
	  title: '¡Respuesta Correcta!',
	  text: 'Muy bien, continua asi.',
	  icon: 'success',
	  confirmButtonText: `
	  Siguiente Ejercicio
	  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM312.3 273.6l-112 104C195.8 381.8 189.9 384 184 384c-3.25 0-6.5-.6562-9.594-2C165.7 378.2 160 369.5 160 360v-208c0-9.531 5.656-18.19 14.41-22c8.75-3.75 18.94-2.062 25.94 4.406l112 104C317.2 242.1 320 249.3 320 256S317.2 269 312.3 273.6z"/></svg>
	  `,
	  showCancelButton: true,
	  cancelButtonText: `
	  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM288 360c0 9.531-5.656 18.19-14.41 22C270.5 383.3 267.3 384 264 384c-5.938 0-11.81-2.219-16.34-6.406l-112-104C130.8 269 128 262.7 128 256s2.781-13.03 7.656-17.59l112-104c7.031-6.469 17.22-8.156 25.94-4.406C282.3 133.8 288 142.5 288 152V360z"/></svg>
	  Regresar al Menu
	  `,
	  allowOutsideClick: false
	}).then((result) => {
		if(result.isConfirmed){
			noQuiz++;
			if(noQuiz == quiz.length){
				subirNivel();
			}
			document.querySelector("#pista").textContent = quiz[noQuiz].pista;
			document.querySelector("#ejercicioPalabra").textContent = quiz[noQuiz].palabraIncompleta;
			document.querySelector('#flexRadio1').checked  = false;
			document.querySelector('#flexRadio1').value = quiz[noQuiz].opc1;
			document.querySelector('label[for="flexRadio1"]').textContent = quiz[noQuiz].opc1;
			document.querySelector('#flexRadio2').checked  = false;
			document.querySelector('#flexRadio2').value = quiz[noQuiz].opc2;
			document.querySelector('label[for="flexRadio2"]').textContent = quiz[noQuiz].opc2;
			document.querySelector('#flexRadio3').checked  = false;
			document.querySelector('#flexRadio3').value = quiz[noQuiz].opc3;
			document.querySelector('label[for="flexRadio3"]').textContent = quiz[noQuiz].opc3;
			document.querySelector('#flexRadio4').checked  = false;
			document.querySelector('#flexRadio4').value = quiz[noQuiz].opc4;
			document.querySelector('label[for="flexRadio4"]').textContent = quiz[noQuiz].opc4;
		} else {
			window.location.href = "../index.html";
		}
	})
}

function respuestaIncorrecta () {
	swalWithBootstrapButtons.fire({
	  title: '¡Respuesta Incorrecta!',
	  text: `${quiz[noQuiz].sugerencia}`,
	  icon: 'error',
	  confirmButtonText: `
	  Siguiente Ejercicio
	  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM312.3 273.6l-112 104C195.8 381.8 189.9 384 184 384c-3.25 0-6.5-.6562-9.594-2C165.7 378.2 160 369.5 160 360v-208c0-9.531 5.656-18.19 14.41-22c8.75-3.75 18.94-2.062 25.94 4.406l112 104C317.2 242.1 320 249.3 320 256S317.2 269 312.3 273.6z"/></svg>
	  `,
	  showCancelButton: true,
	  cancelButtonText: `
	  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM288 360c0 9.531-5.656 18.19-14.41 22C270.5 383.3 267.3 384 264 384c-5.938 0-11.81-2.219-16.34-6.406l-112-104C130.8 269 128 262.7 128 256s2.781-13.03 7.656-17.59l112-104c7.031-6.469 17.22-8.156 25.94-4.406C282.3 133.8 288 142.5 288 152V360z"/></svg>
	  Regresar al Menu
	  `,
	  allowOutsideClick: false
	}).then((result) => {
		if(result.isConfirmed){
			noQuiz++;
			if(noQuiz == quiz.length){
				subirNivel();
			}
			document.querySelector("#pista").textContent = quiz[noQuiz].pista;
			document.querySelector("#ejercicioPalabra").textContent = quiz[noQuiz].palabraIncompleta;
			document.querySelector('#flexRadio1').checked  = false;
			document.querySelector('#flexRadio1').value = quiz[noQuiz].opc1;
			document.querySelector('label[for="flexRadio1"]').textContent = quiz[noQuiz].opc1;
			document.querySelector('#flexRadio2').checked  = false;
			document.querySelector('#flexRadio2').value = quiz[noQuiz].opc2;
			document.querySelector('label[for="flexRadio2"]').textContent = quiz[noQuiz].opc2;
			document.querySelector('#flexRadio3').checked  = false;
			document.querySelector('#flexRadio3').value = quiz[noQuiz].opc3;
			document.querySelector('label[for="flexRadio3"]').textContent = quiz[noQuiz].opc3;
			document.querySelector('#flexRadio4').checked  = false;
			document.querySelector('#flexRadio4').value = quiz[noQuiz].opc4;
			document.querySelector('label[for="flexRadio4"]').textContent = quiz[noQuiz].opc4;
		} else {
			window.location.href = "../index.html";
		}
	})
}

function quizLevelNovato(quiz){
	console.log(quiz)
	document.querySelector("#pista").textContent = quiz[noQuiz].pista;
	document.querySelector("#ejercicioPalabra").textContent = quiz[noQuiz].palabraIncompleta;
	document.querySelector('#flexRadio1').value = quiz[noQuiz].opc1;
	document.querySelector('label[for="flexRadio1"]').textContent = quiz[noQuiz].opc1;
	document.querySelector('#flexRadio2').value = quiz[noQuiz].opc2;
	document.querySelector('label[for="flexRadio2"]').textContent = quiz[noQuiz].opc2;
	document.querySelector('#flexRadio3').value = quiz[noQuiz].opc3;
	document.querySelector('label[for="flexRadio3"]').textContent = quiz[noQuiz].opc3;
	document.querySelector('#flexRadio4').value = quiz[noQuiz].opc4;
	document.querySelector('label[for="flexRadio4"]').textContent = quiz[noQuiz].opc4;
}



function subirNivel () {
	let nivel;

	swalWithBootstrapButtons.fire({
	 input: 'select',
	 inputOptions: {
	   'novato': 'Novato',
	   'intermedio': 'Intermedio',
	   'avanzado': 'Avanzado'
	 },
	 inputPlaceholder: 'Selecciona una opción',
	 inputValidator: (value) => {
	   return new Promise((resolve) => {
		 if (value) {
		   resolve()
		   nivel = document.createTextNode(value.toUpperCase());
		 } else {
		   resolve('Para continuar primero selecciona una opción.')
		 }
	   })
	 },
	 width: "40rem",
	 title: 'Selecciona la Dificultad',
	 text: '¡Felicidades! Has completado el nivel, ahora puedes seleccionar otro diferente.',
	 confirmButtonText: `
	 Cambiar la Dificultad
	 <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM312.3 273.6l-112 104C195.8 381.8 189.9 384 184 384c-3.25 0-6.5-.6562-9.594-2C165.7 378.2 160 369.5 160 360v-208c0-9.531 5.656-18.19 14.41-22c8.75-3.75 18.94-2.062 25.94 4.406l112 104C317.2 242.1 320 249.3 320 256S317.2 269 312.3 273.6z"/></svg>
	 `,
	 showCancelButton: true,
	 cancelButtonText: `
	 <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="#FEFFFE" d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM288 360c0 9.531-5.656 18.19-14.41 22C270.5 383.3 267.3 384 264 384c-5.938 0-11.81-2.219-16.34-6.406l-112-104C130.8 269 128 262.7 128 256s2.781-13.03 7.656-17.59l112-104c7.031-6.469 17.22-8.156 25.94-4.406C282.3 133.8 288 142.5 288 152V360z"/></svg>
	 Regresar al Menú!
	 `,
	 allowOutsideClick: false
   }).then((result) => {
	   if(result.isConfirmed){
			//Reordenar el arreglo
			noQuiz = 0;
			quiz = quiz.sort(function() {return Math.random() - 0.5});
			quizLevelNovato(quiz);
	   } else {
			window.location.href = "../index.html";
	   }
   })
}

// Cambio de dificultad
const cambiarNivel = () => {
	let nivel;

 	swalWithBootstrapButtons.fire({
	  input: 'select',
	  inputOptions: {
	    'novato': 'Novato',
	    'intermedio': 'Intermedio',
	    'avanzado': 'Avanzado'
	  },
	  inputPlaceholder: 'Selecciona una opción',
	  inputValidator: (value) => {
		return new Promise((resolve) => {
	      if (value) {
	        resolve()
	        nivel = document.createTextNode(value.toUpperCase());
	      } else {
	        resolve('Para continuar primero selecciona una opción.')
	      }
	    })
	  },
	  width: "40rem",
	  title: 'Selecciona la Dificultad',
	  confirmButtonText: `
	  Cambiar la Dificultad
	  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM312.3 273.6l-112 104C195.8 381.8 189.9 384 184 384c-3.25 0-6.5-.6562-9.594-2C165.7 378.2 160 369.5 160 360v-208c0-9.531 5.656-18.19 14.41-22c8.75-3.75 18.94-2.062 25.94 4.406l112 104C317.2 242.1 320 249.3 320 256S317.2 269 312.3 273.6z"/></svg>
	  `,
	  showCancelButton: true,
	  cancelButtonText: `
	  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="#FEFFFE" d="M384 32H64C28.65 32 0 60.65 0 96v320c0 35.34 28.65 64 64 64h320c35.35 0 64-28.66 64-64V96C448 60.65 419.3 32 384 32zM288 360c0 9.531-5.656 18.19-14.41 22C270.5 383.3 267.3 384 264 384c-5.938 0-11.81-2.219-16.34-6.406l-112-104C130.8 269 128 262.7 128 256s2.781-13.03 7.656-17.59l112-104c7.031-6.469 17.22-8.156 25.94-4.406C282.3 133.8 288 142.5 288 152V360z"/></svg>
	  Regresar al Quiz Mode!
	  `,
	  allowOutsideClick: false
	}).then((result) => {
		if(result.isConfirmed){
			const containerQuizMode = document.querySelector("#bodyQuizmode");
			containerQuizMode.classList.remove("d-none");
			console.log(document.getElementById("nivel").textContent);
			if(document.getElementById("nivel").textContent){
				document.getElementById("nivel").textContent = "";
			}
			document.getElementById("nivel").appendChild(nivel);
		}
	})
}