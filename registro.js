import { auth, db, ref, set } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, buscando botón de registro...");
  const registerButton = document.querySelector(".register-button");
  console.log("Botón encontrado:", registerButton);
  
  if (registerButton) {
    registerButton.addEventListener("click", (e) => {
      console.log("Botón clickeado");
      e.preventDefault(); // evita que la página se recargue

      //  Obtener los valores de los inputs
    const nombre = document.getElementById("first-name").value;
    const apellido = document.getElementById("last-name").value;
    const fechaNacimiento = document.getElementById("dob").value;
    const usuario = document.getElementById("username").value;
    const email = document.getElementById("email-register").value;
    const contrasena = document.getElementById("password-register").value;
    const confirmarContrasena = document.getElementById("confirm-password").value;

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden."); 
      return;
    } 

    // Registrar usuario con Firebase
    createUserWithEmailAndPassword(auth, email, contrasena)
      .then((userCredential) => {
        const user = userCredential.user;
        

        // Guardar los datos extra en la base de datos
        return set(ref(db, 'usuarios/' + user.uid), {
          nombre,
          apellido,
          fechaNacimiento,
          usuario,
          email
          
        });
      })
      .then(() => {
        alert("¡Registro exitoso!");
        window.location.href = "index.html"; // redirige a la página de inicio
      })
      .catch((error) => {
        console.error(error);
        alert("Error al registrar: " + error.message);
        // Si hay error, también redirige a inicio
        window.location.href = "index.html";
      });

    
  });
  } else {
    console.error("No se encontró el botón de registro");
  }
});