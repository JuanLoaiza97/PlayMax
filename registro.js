import { auth, db, ref, set } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnRegistro").addEventListener("click", (e) => {
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
        window.location.href = "login.html"; // redirige si ya tienes login
      })
      .catch((error) => {
        console.error(error);
        alert("Error al registrar: " + error.message);
      });
  });
});
