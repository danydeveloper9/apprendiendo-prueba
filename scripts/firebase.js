// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Put you credentials here
  apiKey: "AIzaSyClSPEzgXkDKzcEWcooJoV6N2wjV3K6uGU",
  authDomain: "fir-apprendiendo.firebaseapp.com",
  projectId: "fir-apprendiendo",
  storageBucket: "fir-apprendiendo.appspot.com",
  messagingSenderId: "1095656157483",
  appId: "1:1095656157483:web:65bc333ebaf9210b75956e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
export const saveQuizNovato = (palabraCorrecta, palabraIncompleta, opcionCorrecta, opc1, opc2, opc3, opc4, pista, sugerencia) =>
  addDoc(collection(db, "quizNovato"), { palabraCorrecta, palabraIncompleta, opcionCorrecta, opc1, opc2, opc3, opc4, pista, sugerencia });

export const onGetQuizNovato = (callback) =>
  onSnapshot(collection(db, "quizNovato"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteQuizNovato = (id) => deleteDoc(doc(db, "quizNovato", id));

export const getQuizNovatoID = (id) => getDoc(doc(db, "quizNovato", id));

export const updateQuizNovato = (id, newFields) =>
  updateDoc(doc(db, "quizNovato", id), newFields);

export const getQuizNovato = () => getDocs(collection(db, "quizNovato"));