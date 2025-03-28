document.getElementById("prenotazioneForm").addEventListener("submit", function(event) {
       let valid = true;

       // Controllo nome
       let nome = document.getElementById("nome");
       let nomeError = document.getElementById("nomeError");
       if (nome.value.trim() === "") {
           nome.classList.add("is-invalid");
           nomeError.classList.remove("d-none");
           valid = false;
       } else {
           nome.classList.remove("is-invalid");
           nomeError.classList.add("d-none");
       }

       // Controllo cognome
       let cognome = document.getElementById("cognome");
       let cognomeError = document.getElementById("cognomeError");
       if (cognome.value.trim() === "") {
           cognome.classList.add("is-invalid");
           cognomeError.classList.remove("d-none");
           valid = false;
       } else {
           cognome.classList.remove("is-invalid");
           cognomeError.classList.add("d-none");
       }

       // Controllo numero di telefono
       let numeroTelefono = document.getElementById("numeroTelefono");
       let numeroTelefonoError = document.getElementById("numeroTelefonoError");
       if (numeroTelefono.value.trim() === "") {
           numeroTelefono.classList.add("is-invalid");
           numeroTelefonoError.classList.remove("d-none");
           valid = false;
       } else {
           numeroTelefono.classList.remove("is-invalid");
           numeroTelefonoError.classList.add("d-none");
       }

       // Controllo data prenotazione
       let dataPrenotazione = document.getElementById("dataPrenotazione");
       let dataPrenotazioneError = document.getElementById("dataPrenotazioneError");
       if (dataPrenotazione.value.trim() === "") {
           dataPrenotazione.classList.add("is-invalid");
           dataPrenotazioneError.classList.remove("d-none");
           valid = false;
       } else {
           dataPrenotazione.classList.remove("is-invalid");
           dataPrenotazioneError.classList.add("d-none");
       }

       // Controllo orario prenotazione
       let orarioPrenotazione = document.getElementById("orarioPrenotazione");
       let orarioPrenotazioneError = document.getElementById("orarioPrenotazioneError");
       if (orarioPrenotazione.value.trim() === "") {
           orarioPrenotazione.classList.add("is-invalid");
           orarioPrenotazioneError.classList.remove("d-none");
           valid = false;
       } else {
           orarioPrenotazione.classList.remove("is-invalid");
           orarioPrenotazioneError.classList.add("d-none");
       }

       // Se almeno un campo non è valido, blocca l'invio del form
       if (!valid) {
           event.preventDefault();
       }
   });
