import {
    onGetQuizNovato,
    saveQuizNovato,
    deleteQuizNovato,
    getQuizNovatoID,
    updateQuizNovato,
  } from "./firebase.js";
  
  const novatoForm = document.getElementById("novato-form");
  const quizNovatoContainer = document.getElementById("quizNovato-container");
  
  let editStatus = false;
  let id = "";
  
  window.addEventListener("DOMContentLoaded", async (e) => {
    // const querySnapshot = await getQuizNovatos();
    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  
    onGetQuizNovato((querySnapshot) => {
      quizNovatoContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const quizNovato = doc.data();
  
        quizNovatoContainer.innerHTML += `
        <div class="card card-body mb-2 border-primary">
      <h3 class="h5">${quizNovato.palabraCorrecta}</h3>
      <p>${quizNovato.palabraIncompleta}</p>
      <p>Opcion Correcta: ${quizNovato.opcionCorrecta}</p>
      <div>
        <button class="btn btn-primary btn-delete" data-id="${doc.id}">
          🗑 Delete
        </button>
        <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
          🖉 Edit
        </button>
      </div>
    </div>`;
      });
  
      const btnsDelete = quizNovatoContainer.querySelectorAll(".btn-delete");
      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await deleteQuizNovato(dataset.id);
          } catch (error) {
            console.log(error);
          }
        })
      );
  
      const btnsEdit = quizNovatoContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getQuizNovatoID(e.target.dataset.id);
            const quizNovato = doc.data();
            novatoForm["novato-palabraCorrecta"].value = quizNovato.palabraCorrecta;
            novatoForm["novato-palabraIncompleta"].value = quizNovato.palabraIncompleta;
            novatoForm["novato-opcCorrecta"].value = quizNovato.opcionCorrecta;
            novatoForm["novato-opc1"].value = quizNovato.opc1;
            novatoForm["novato-opc2"].value = quizNovato.opc2;
            novatoForm["novato-opc3"].value = quizNovato.opc3;
            novatoForm["novato-opc4"].value = quizNovato.opc4;
            novatoForm["novato-pista"].value = quizNovato.pista;
            novatoForm["novato-sugerencia"].value = quizNovato.sugerencia;

            editStatus = true;
            id = doc.id;
            novatoForm["btn-novato-form"].innerText = "Actualizar";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  });
  
  novatoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const palabraCorrecta = novatoForm["novato-palabraCorrecta"];
    const palabraIncompleta = novatoForm["novato-palabraIncompleta"];
    const opcionCorrecta = novatoForm["novato-opcCorrecta"];
    const opc1 = novatoForm["novato-opc1"];
    const opc2 = novatoForm["novato-opc2"];
    const opc3 = novatoForm["novato-opc3"];
    const opc4 = novatoForm["novato-opc4"];
    const pista = novatoForm["novato-pista"];
    const sugerencia = novatoForm["novato-sugerencia"];

    console.log(palabraCorrecta.value, palabraIncompleta.value, opcionCorrecta.value, opc1.value, opc2.value, opc3.value, opc4.value, pista.value, sugerencia.value);
  
    try {
      if (!editStatus) {
        await saveQuizNovato(palabraCorrecta.value, palabraIncompleta.value, opcionCorrecta.value, opc1.value, opc2.value, opc3.value, opc4.value, pista.value, sugerencia.value);
      } else {
        await updateQuizNovato(id, {
          palabraCorrecta: palabraCorrecta.value, 
          palabraIncompleta: palabraIncompleta.value, 
          opcionCorrecta: opcionCorrecta.value, 
          opc1: opc1.value, 
          opc2: opc2.value, 
          opc3: opc3.value, 
          opc4: opc4.value, 
          pista: pista.value, 
          sugerencia: sugerencia.value,
        });
  
        editStatus = false;
        id = "";
        novatoForm["btn-novato-form"].innerText = "Guardar";
      }
  
      novatoForm.reset();
      palabraCorrecta.focus();
    } catch (error) {
      console.log(error);
    }
  });