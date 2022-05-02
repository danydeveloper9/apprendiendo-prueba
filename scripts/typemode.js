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
    console.log("Bienvenido al TypeMode")

 	swalWithBootstrapButtons.fire({
	  input: 'select',
	  inputOptions: {
	    'novato': 'Novato',
	    'intermedio': 'Intermedio',
	  },
	  inputPlaceholder: 'Selecciona una opción',
	  inputValidator: (value) => {
		return new Promise(async (resolve) => {
	      if (value) {
	        resolve()
	        nivel = document.createTextNode(value.toUpperCase());
			if(value == "novato"){
				document.querySelector("#containerIframe").innerHTML += `<iframe id="myiFrame" src="typemodeBasic.html" frameborder="0"></iframe>`;
			} else if(value == "intermedio"){
                document.querySelector("#containerIframe").innerHTML += `<iframe id="myiFrame" src="typemodeMiddle.html" frameborder="0"></iframe>`;
            } else{
                console.log("error")
            }
			
	      } else {
	        resolve('Para continuar primero selecciona una opción.')
	      }
	    })
	  },
	  width: "40rem",
	  title: 'Selecciona la Dificultad',
	  confirmButtonText: `
	  Iniciar Type Mode!
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

document.querySelector("#comprobarRespuesta").addEventListener("click", comprobarRespuesta, false);
